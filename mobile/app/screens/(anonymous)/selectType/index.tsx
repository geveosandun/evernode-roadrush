import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { showToast } from "../../../services/toast-service";
import { ToastMessageTypes } from "../../../helpers/constants";
import AnonymousLayout from "../../../components/layouts/anonymous-layout";
import AppTheme from "../../../helpers/theme";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SCButton from "../../../components/button/button";

export default function SelectTypeScreen({ navigation }) {
  const [showWaitIndicator, setShowWaitIndicator] = useState(false);

  return (
    
    <>
      <View style={styles.mainContainer}>
      <SCButton showLeftArrow={false} showRightArrow={false} text="Login as Passanger" onTap={() => navigation.navigate("HomePassenger")} />
      <View style={styles.space} />

      <SCButton showLeftArrow={false} showRightArrow={false} text="Login as Driver" onTap={() => navigation.navigate("HomeDriver")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 50,
    marginTop: 300,
  },
  space: {
    height:50
  }
});
