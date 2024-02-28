import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { showToast } from "../../../services/toast-service";
import { ToastMessageTypes } from "../../../helpers/constants";
import AnonymousLayout from "../../../components/layouts/anonymous-layout";
import AppTheme from "../../../helpers/theme";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SCButton from "../../../components/button/button";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import SCBottomNavigationBar, { BottomNavigationButtons } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import GoogleMapSearch from "../map-search";

export default function RideDetails({ navigation }) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
}

  return (
    
    <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
      <View style={styles.mainContainer}>

      </View>
      <View style={styles.trackScreen}>
        <GoogleMapSearch navigation={navigation}></GoogleMapSearch>
      </View>
      <View style={{ height: 80 }}>
        <SCBottomNavigationBar
          navigation={navigation}
          selectedTab={BottomNavigationButtons.Home}
          onTapCallback={onBottomNavigationTapped}
        />
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d4d9d4',
    margin: 10
  },
  trackScreen: {
    flex: 1,
    margin: 50,
    marginTop: 300,
  },
  space: {
    height:50
  }
});
