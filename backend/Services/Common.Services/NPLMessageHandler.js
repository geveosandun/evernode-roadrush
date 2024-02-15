import { EventTypes } from "../../Constants/EventTypes";
import {AdditionalTimeouts} from "../../Constants/Constants";

const { SharedService } = require("./SharedService");

export class NPLMessagingHandler {

    /**
     * context: - ctx of the contract
     * eventListener: - The common event listener
     * sendingMsg: - The message in the format { key:  , value:<number> }
     * DecisionFunc: - The decision function that accepts an array of message objects.
     *
     * Returns the decided message object.
     *
     */

    async sendDecisionMessage(context, eventListener, sendingMsg, DecisionFunc) {
        if (context.readonly) {
            throw 'NPL messaging works only in non-readonly context.'
        } else {
            if (!sendingMsg.key || !sendingMsg.value) {
                throw 'key and value pair must  be present.'
            } else {
                const unlSize = context.unl.count();
                const hpconfig = await context.getConfig();
                // Wait only for half of roundtime.
                const timeoutMs = Math.ceil(hpconfig.consensus.roundtime / 1);

                let completed = false;
                const decidedMessage = await new Promise(async (resolve, reject) => {
                    await context.unl.send(
                        JSON.stringify({
                            type: EventTypes.ONE_FROM_ALL,
                            key: sendingMsg.key,
                            value: sendingMsg.value,
                            ...sendingMsg
                        })
                    )
                    let distributeMessages = [];

                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        completed = true;
                        // If we've received less than what we expect, throw an error.
                        if (distributeMessages.length < unlSize) {
                            reject("Didn't receive messages from all nodes");
                        }
                        else {
                            resolve(DecisionFunc(distributeMessages));
                        }
                    }, timeoutMs + AdditionalTimeouts.NPL_NODE_SELECTION_TIMEOUT);

                    eventListener.on(EventTypes.ONE_FROM_ALL, (node, msg) => {
                        if (!completed) {
                            const obj = JSON.parse(msg.toString());
                            distributeMessages.push(obj);
                            if (distributeMessages.length === unlSize) {
                                clearTimeout(timer);
                                completed = true;
                                resolve(DecisionFunc(distributeMessages));
                            }
                        }
                    })
                });
                return decidedMessage;
            }
        }
    }

    /**
     * This method sends messages to all nodes and the key in the sending message  must be similar to one of the unl public keys.
     * context: - ctx of the contract
     * *eventListener: - The common event listener
     * sendingMsg: - The message in the format { key:  , value:<number> }
     *
     * Returns the message object.
     * */
    async sendMessage(context, eventListener, sendingMsg) {
        if (context.readonly) {
            throw 'NPL messaging works only in non-readonly context.'
        } else {
            if (!sendingMsg.key || !sendingMsg.value) {
                throw 'key and value pair must  be present.'
            } else {
                const hpconfig = await context.getConfig();
                // Wait only for half of roundtime.
                const timeoutMs = Math.ceil(hpconfig.consensus.roundtime / 1);
                let completed = false;

                let distributeMessages = [];

                const receivedMessage = await new Promise(async (resolve, reject) => {
                    if (context.publicKey == sendingMsg.key) {
                        await SharedService.context.unl.send(
                            JSON.stringify({
                                type: EventTypes.ALL_NODE,
                                key: sendingMsg.key,
                                value: sendingMsg.value,
                                ...sendingMsg
                            })
                        );
                    }

                    let timer = setTimeout(() => {
                        clearTimeout(timer);
                        completed = true;
                        // If we've received less than what we expect, throw an error.
                        if (distributeMessages.length == 1)
                            resolve(distributeMessages[0]);
                        else
                            reject("Didn't receive any messages from any nodes");
                    }, timeoutMs);

                    eventListener.on(EventTypes.ALL_NODE, (node, msg) => {
                        const obj = JSON.parse(msg.toString());
                        distributeMessages.push(obj);
                        completed = true;
                        clearTimeout(timer);
                        resolve(obj);
                    });
                });

                return receivedMessage;
            }
        }
    }


    /**
     * Returns the publicKey of the selected Node
     * @param context
     * @returns {*}
     */
    selectNode(context) {
        const index  = context.lclSeqNo % context.unl.count();
        const nodeArray = Object.values(context.unl.nodes); // [ {publicKey: string, activeOn: integer}, {}]
        const sortedNodeList = SharedService.objectArraySort(nodeArray, 'publicKey');
        return sortedNodeList[index].publicKey;
    }


}







