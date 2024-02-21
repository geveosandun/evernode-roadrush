import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { showToast } from "./services/toast-service";
import SCButton from "./components/button/button";
import { ToastMessageTypes } from "./helpers/constants";
import AnonymousLayout from "./components/layouts/anonymous-layout";
import HotPocketClientService from "./services/hp-client-service";
import WaitIndicator from "./components/activity-indicator/activity-indicator";

export default function WelcomeScreen({ navigation }) {
  const [showWaitIndicator, setShowWaitIndicator] = useState(false);

  async function sample_hpcall() {
    setShowWaitIndicator(true);
    const hpc = await HotPocketClientService.getInstance();

    HotPocketClientService.setOnDisconnect(() => {
      console.log("CUSTOM: Disconnected");
    });

    HotPocketClientService.setOnConnectionChange((server, action) => {
      console.log(server + " " + action);
    });

    HotPocketClientService.setOnContractOutput((r) => {
      r.outputs.forEach((o) => {
        const outputLog =
          o.length <= 512 ? o : `[Big output (${o.length / 1024} KB)]`;
        console.log(`CUSTOM: Output (ledger:${r.ledgerSeqNo})>> ${outputLog}`);
      });
    });

    HotPocketClientService.setOnUnlChange((unl) => {
      console.log("CUSTOM: New unl received:");
      console.log(unl); // unl is an array of public keys.
    });

    HotPocketClientService.setOnLedgerEvent((ev) => {
      console.log(ev);
    });

    HotPocketClientService.setOnHealthEvent((ev) => {
      console.log(ev);
    });

    HotPocketClientService.setOnConnectionChange((server, action) => {
      console.log(server + " " + action);
    });

    // Establish HotPocket connection.
    if (!(await hpc.connect())) {
      console.log("CUSTOM: Connection failed.");
      setShowWaitIndicator(false);
      return;
    }
    console.log("CUSTOM: HotPocket Connected.");

    const stat = await hpc.getStatus();
    console.log("stat ", stat);

    setShowWaitIndicator(false);
  }

  return (
    <>
      <RootSiblingParent>
        <AnonymousLayout showWaitIndicator={showWaitIndicator}>
          <View style={styles.container}>
            <Text style={styles.title}>Cat X Dog</Text>
            <Text style={styles.subtitle}>Welcome</Text>

            <SCButton
              text="To Cats tab"
              onTap={() => navigation.navigate("CatListScreen")}
            />
            <SCButton
              text="To Dogs tab"
              onTap={() => navigation.navigate("DogListScreen")}
            />

            <SCButton
              text="Go to Home page"
              onTap={() => navigation.navigate("HomeScreen")}
            />

            <SCButton
              text="Go to Landing page"
              onTap={() => navigation.navigate("LandingScreen")}
            />

            <SCButton
              text="Go to SignIn page"
              onTap={() => navigation.navigate("SignInScreen")}
            />

            <SCButton
              text="Show Toast"
              onTap={() => {
                showToast("Sample toast message!", ToastMessageTypes.error);
              }}
            />

            <SCButton
              text="EVERNODE Call"
              onTap={async () => {
                await sample_hpcall();
                showToast("Evernode called!", ToastMessageTypes.success);
              }}
            />
          </View>
        </AnonymousLayout>
      </RootSiblingParent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
