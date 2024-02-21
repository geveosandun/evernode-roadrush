import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SCButton from "../../../components/button/button";
import AnonymousLayout from "../../../components/layouts/anonymous-layout";
import AppTheme from "../../../helpers/theme";

export default function LandingScreen({ navigation }) {
  return (
    <>
      <AnonymousLayout>
        <Image
          style={styles.geveoLogo}
          source={require("../../../assets/images/geveo.png")}
        />
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/images/splash.png")}
        />
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.infoText}>
          This is a step challenge you play with your friends and colleagues. To
          get started, join a challenge by providing the invitation code.
        </Text>

        <View style={styles.button}>
          <SCButton
            text="Join Challenge"
            showRightArrow={true}
            onTap={() => navigation.navigate("JoinStepChallengeScreen")}
          />
        </View>
      </AnonymousLayout>
    </>
  );
}

const styles = StyleSheet.create({
  geveoLogo: {
    marginTop: "20%",
    alignSelf: "center",
    width: 1814 * 0.1, // exact pixels scaling
    height: 387 * 0.1,
  },
  tinyLogo: {
    marginTop: "10%",
    alignSelf: "center",
    width: 650 * 0.35,
    height: 536 * 0.35,
  },
  welcomeText: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    padding: 40,
    lineHeight: 25,
    color: AppTheme.colors.darkGrey,
  },
  button: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
});
