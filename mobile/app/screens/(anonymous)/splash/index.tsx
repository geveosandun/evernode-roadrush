import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, BackHandler } from "react-native";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import AuthService from "../../../services/auth-service";

export default function SplashScreen({ navigation }) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  useEffect(() => {
    AuthService.checkAuthentication().then((loggedIn) => {
      if (loggedIn) {
        navigation.navigate("HomeScreen");
      } else {
        navigation.navigate("SignInScreen");
      }
    });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true; 
      }
      return false;
    });

    return () => {
      if (backHandler.remove) {
        backHandler.remove();
      }
    };
  }, [navigation]);

  return (
    <>
      <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
        <Image
          style={styles.tinyLogo}
          source={require("../../../assets/images/splash.png")}
        />
        <Image
          style={styles.geveoLogo}
          source={require("../../../assets/images/geveo.png")}
        />
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.versionText}>Version 0.0.1</Text>
        </View>
      </AuthorizedLayout>
    </>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    marginTop: "55%",
    alignSelf: "center",
    width: 650 * 0.35,
    height: 536 * 0.35,
  },
  geveoLogo: {
    marginTop: "55%",
    alignSelf: "center",
    width: 1814 * 0.07, // exact pixels scaling
    height: 387 * 0.07,
  },
  versionText: {
    marginTop: "2%",
    alignSelf: "center",
  },
});
