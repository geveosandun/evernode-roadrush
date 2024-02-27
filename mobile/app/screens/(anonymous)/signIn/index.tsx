import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { showToast } from "../../../services/toast-service";
import { ToastMessageTypes } from "../../../helpers/constants";
import AnonymousLayout from "../../../components/layouts/anonymous-layout";
import AppTheme from "../../../helpers/theme";
import AuthService from "../../../services/auth-service";
import React, { useEffect, useState } from "react";
import SCButton from "../../../components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignInScreen({ navigation }) {
  const _authService = AuthService.getInstance();

  const [showWaitIndicator, setShowWaitIndicator] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: React.SetStateAction<string>) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitLogin = () => {
    const loginData = {
      Username: userName,
      Password: password
    }

    setShowWaitIndicator(true);
    _authService.submitLoginRequest(loginData)
      .then((response: any) => {
        if (response === 'Login Success') {
          showToast("Logged in Successfully!", ToastMessageTypes.success);
          navigation.replace("SelectTypeScreen");
        }
      })
      .catch((error) => {
        showToast(error.displayErrorMessage, ToastMessageTypes.error);
      })
      .finally(() => {
        setShowWaitIndicator(false);
      });
  }

  return (
    <>
      <AnonymousLayout showWaitIndicator={showWaitIndicator}>
        <View style={styles.mainContainer}>
          <Image
            style={styles.geveoLogo}
            source={require("../../../assets/images/geveo.png")}
          />
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/splash.png")}
          />
          <View style={styles.loginForm}>
            <View style={{borderBottomWidth: 0.5, borderBottomColor: AppTheme.colors.primary, marginBottom: 10}}>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                secureTextEntry={!showPassword}
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={password}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 10, top: 10, padding:5 }}>
                {showPassword ? 
                  <FontAwesomeIcon icon={faEyeSlash} style={{opacity: 0.8}} color='gray' /> : 
                  <FontAwesomeIcon icon={faEye} style={{opacity: 0.8}} color='gray' />
                }
              </TouchableOpacity>
            </View>
            <View style={styles.loginBtn}>
              <SCButton showLeftArrow={false} showRightArrow={false} text="Login" onTap={submitLogin} />
            </View>
          </View>
        </View>
      </AnonymousLayout>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  loginForm: {
    marginTop: 50,
    alignSelf: "center",
    width: "85%"
  },
  tinyLogo: {
    marginTop: "15%",
    alignSelf: "center",
    width: 650 * 0.35,
    height: 536 * 0.35,
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: AppTheme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  geveoLogo: {
    marginTop: "20%",
    alignSelf: "center",
    width: 1814 * 0.07, // exact pixels scaling
    height: 387 * 0.07,
  },
  loginBtn: {
    marginTop: 10,
  }
});
