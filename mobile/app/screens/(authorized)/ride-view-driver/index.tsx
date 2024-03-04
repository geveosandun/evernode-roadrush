import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { showToast } from "../../../services/toast-service";
import { GOOGLE_MAPS_API_KEY, ToastMessageTypes } from "../../../helpers/constants";
import AnonymousLayout from "../../../components/layouts/anonymous-layout";
import AppTheme from "../../../helpers/theme";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SCButton from "../../../components/button/button";
import SCBottomNavigationBar, { BottomNavigationButtons } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function RideViewScreen({ navigation }) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [destination, setDestination] = useState({
    latitude: 6.836611,
    longitude: 81.003073,
  });

  const [origin, setOrigin] = useState({
    latitude: 6.841405,
    longitude: 81.004405,
  });
  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  return (
    <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
  <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 6.838545,
          longitude: 81.007132,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
      }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey= {GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="blue"
          mode={'TRANSIT'}
        />
       <Marker
          coordinate={origin}
          title="Starting Point"
        />
        <Marker
          coordinate={destination}
          title="Destination Point"
        />
      </MapView>
    </View>
      <View style={styles.detailsContainer}>
        <Text style= {{marginTop:20}}>Passanger       : John Doe </Text>
        <Text>Away                : 2Km  </Text>
        <Text>Drop Down      : Kottawa Town </Text>
        <Text>Ride Distance  : 15Km </Text>
        <Text>Amount            : 6.7 Evrs </Text>
        <View style={{flexDirection:"row", alignItems: 'flex-end', marginTop:50,}}>
        {/* <SCButton showLeftArrow={false} showRightArrow={false} text="Start Trip" /> */}
        <SCButton showLeftArrow={false} showRightArrow={false} text="End Trip" />
        </View>
      </View>
      <View style={styles.bottomBar}>
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
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    flex: 1,
  },
  detailsContainer:{
    flex: 0.5,
    marginLeft:10
  },
  bottomBar: {
    height: 80,
},
});
