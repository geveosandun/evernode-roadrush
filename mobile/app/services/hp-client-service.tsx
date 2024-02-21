import { Buffer } from "buffer";
import {
  generateKeys,
  createClient,
  protocols,
  events,
} from "react-native-hotpocket-js-client";
import AppSettings from "../helpers/app-settings";

export default class HotPocketClientService {
  static HotPocketClient = null;
  static promiseMap = new Map();

  constructor() {}

  static async getInstance() {
    // HotPocketClientService.HotPocketClient = null;
    if (HotPocketClientService.HotPocketClient) {
      HotPocketClientService.applyDefaultEvents();
      await HotPocketClientService.HotPocketClient.connect();
    } else {
      const keys = await generateKeys();

      const pkhex = Buffer.from(keys.publicKey).toString("hex");
      console.log("My public key is: " + pkhex);

      // Simple connection to single server without any validations.
      HotPocketClientService.HotPocketClient = await createClient(
        [AppSettings.websocketUrl],
        keys,
        {
          protocol: protocols.bson,
        }
      );
      HotPocketClientService.applyDefaultEvents();
    }
    return HotPocketClientService.HotPocketClient;
  }

  static setOnLedgerEvent(onLedgerEvent) {
    HotPocketClientService.HotPocketClient.clear(events.onLedgerEvent);
    if (onLedgerEvent) {
      HotPocketClientService.HotPocketClient.on(
        events.onLedgerEvent,
        onLedgerEvent
      );
    }
  }

  static setOnContractOutput(onContractOutput) {
    HotPocketClientService.HotPocketClient.clear(events.contractOutput);
    if (onContractOutput) {
      HotPocketClientService.HotPocketClient.on(
        events.contractOutput,
        onContractOutput
      );
    }
  }

  static setOnConnectionChange(onConnectionChange) {
    HotPocketClientService.HotPocketClient.clear(events.onConnectionChange);
    if (onConnectionChange) {
      HotPocketClientService.HotPocketClient.on(
        events.onConnectionChange,
        onConnectionChange
      );
    }
  }

  static setOnUnlChange(onUnlChange) {
    HotPocketClientService.HotPocketClient.clear(events.onUnlChange);
    if (onUnlChange) {
      HotPocketClientService.HotPocketClient.on(
        events.onUnlChange,
        onUnlChange
      );
    }
  }

  static setOnHealthEvent(onHealthEvent) {
    HotPocketClientService.HotPocketClient.clear(events.onHealthEvent);
    if (onHealthEvent) {
      HotPocketClientService.HotPocketClient.on(
        events.onHealthEvent,
        onHealthEvent
      );
    }
  }

  static setOnDisconnect(onDisconnect) {
    HotPocketClientService.HotPocketClient.clear(events.onDisconnect);
    if (onDisconnect) {
      HotPocketClientService.HotPocketClient.on(
        events.onDisconnect,
        onDisconnect
      );
    }
  }

  static async applyDefaultEvents() {
    HotPocketClientService.HotPocketClient.clear(events.onLedgerEvent);
    HotPocketClientService.HotPocketClient.clear(events.contractOutput);
    HotPocketClientService.HotPocketClient.clear(events.onConnectionChange);
    HotPocketClientService.HotPocketClient.clear(events.onUnlChange);
    HotPocketClientService.HotPocketClient.clear(events.onHealthEvent);
    HotPocketClientService.HotPocketClient.clear(events.onDisconnect);

    HotPocketClientService.HotPocketClient.on(events.disconnect, () => {
      console.log("Disconnected");
    });

    // This will get fired as servers connects/disconnects.
    HotPocketClientService.HotPocketClient.on(
      events.connectionChange,
      (server, action) => {
        console.log(server + " " + action);
      }
    );

    // This will get fired when contract sends outputs.
    HotPocketClientService.HotPocketClient.on(
      events.contractOutput,
      (r: any) => {
        r.outputs.forEach((o: any) => {
          console.log(`Output (ledger:${r.ledgerSeqNo})>> ${o}`);
          const parsedOutput = JSON.parse(o);
          const pId = parsedOutput.promiseId;
          if (parsedOutput.error) {
            this.promiseMap.get(pId)?.rejecter(parsedOutput.error);
          } else {
            this.promiseMap.get(pId)?.resolver(parsedOutput.success);
          }
          this.promiseMap.delete(pId);
        });
      }
    );

    // This will get fired when the unl public key list changes.
    HotPocketClientService.HotPocketClient.on(events.unlChange, (unl) => {
      console.log("New unl received:");
      console.log(unl); // unl is an array of public keys.
    });

    // This will get fired when any ledger event occurs (ledger created, sync status change).
    HotPocketClientService.HotPocketClient.on(events.ledgerEvent, (ev) => {
      console.log(ev);
    });

    // This will get fired when any health event occurs (proposal stats, connectivity changes...).
    HotPocketClientService.HotPocketClient.on(events.healthEvent, (ev) => {
      console.log(ev);
    });

    // Establish HotPocket connection.
    if (!(await HotPocketClientService.HotPocketClient.connect())) {
      console.log("Connection failed.");
      return;
    }
    console.log("HotPocket Connected.");

    const stat = await HotPocketClientService.HotPocketClient.getStatus();
    // console.log("stat ", stat);
    // const inpString1 = JSON.stringify({cc:"message"});
    // const response =
    //   await HotPocketClientService.HotPocketClient.submitContractReadRequest(
    //     inpString1
    //   );
    // console.log("read req ", response);
    // const inpString = JSON.stringify({cc:"message"});
    // const input =
    //   await HotPocketClientService.HotPocketClient.submitContractInput(
    //     inpString
    //   );
    // console.log("input ", input);
    // const submissionResult = await input.submissionStatus;
    // console.log("submissionResult ", submissionResult);
  }

  static async submitInputToContract(message: any) {
    let resolver, rejecter;
    const promiseId = HotPocketClientService._getUniqueId();
    await HotPocketClientService.applyDefaultEvents();
    const inpString = JSON.stringify({ promiseId: promiseId, ...message });

    HotPocketClientService.HotPocketClient.submitContractInput(inpString).then(input => {
      input?.submissionStatus.then(s => {
          if (s.status !== "accepted")
              throw Error(`Ledger_Rejection: ${s.reason}`);
        });
      });

      return new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
        this.promiseMap.set(promiseId, {
          resolver: resolver,
          rejecter: rejecter,
        });
      });
  }

  /* 
   * //this method didnt work when throwing custom errors, keeping this incase for any ref
    submitInputToContract(inp) {
        let resolver, rejecter;
        const promiseId = this.#getUniqueId();
        const inpString = JSON.stringify({ id: promiseId, ...inp })

        this.client.submitContractInput(inpString).then(input => {
            // console.log(input.hash);
            input?.submissionStatus.then(s => {
                if (s.status !== "accepted")
                    throw Error(`Ledger_Rejection: ${s.reason}`);
            });
        });

        return new Promise((resolve, reject) => {
            resolver = resolve;
            rejecter = reject;
            this.promiseMap.set(promiseId, { resolver: resolver, rejecter: rejecter });
        });
    } */



  static async submitContractReadRequest(message: any) {
    try {
      // await HotPocketClientService.applyDefaultEvents();
      const inpString = JSON.stringify(message);

      const output =
        await HotPocketClientService.HotPocketClient.submitContractReadRequest(
          inpString
        );
        
      const outputObj = JSON.parse(output.toString());
        if (outputObj && outputObj.hasOwnProperty("error")) {
          throw outputObj.error;
        } else {
          return outputObj != null ? outputObj.success: null;
        }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static _getUniqueId() {
    const typedArray = new Uint8Array(10);
    const randomValues = window.crypto.getRandomValues(typedArray);
    return randomValues.join("");
  }
}
