import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppTheme from "../../../helpers/theme";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import SCBottomNavigationBar, {BottomNavigationButtons,} from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import GoogleMapTrack from "../map-track";
import { faUserCircle,faCar, faCarSide, faChevronLeft, faL, faLocationCrosshairs, faLocationDot, faRefresh } from "@fortawesome/free-solid-svg-icons";

export default function RideDetails({ navigation }) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  return (
    <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
      <View style={styles.heading}>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color={AppTheme.colors.primary}
            size={20}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}> Your Ride Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.locationDetails}>
          <View style={styles.locationIconContainer}>
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              color={AppTheme.colors.secondary}
              size={20}
            />
            <View style={styles.dashedLine}></View>
            <FontAwesomeIcon
              icon={faLocationDot}
              color={AppTheme.colors.secondary}
              size={20}
            />
          </View>
          <View style={styles.locationDetailsContainer}>
            <Text style={{ marginBottom: 20 }}>Location</Text>
            <View style={styles.horizontalDashedLine}></View>
            <Text>Destination</Text>
          </View>
        </View>
        <View style={styles.rideFeeContainer}>
          <Text style={{ marginRight:20, marginLeft:15}}>Audi e-tron Sportback</Text>
          <Text style={{ marginRight:57, marginLeft:40}}>8.5km</Text>
          <Text style={{ color: AppTheme.colors.red }}>
            0.56 Evrs
          </Text>
        </View>
        <View>
        <Pressable style={styles.buttonPay}  >
        <Text style={styles.buttonText}>Pay</Text>
      </Pressable>
      </View>
      </View>
      <View style={{marginLeft:10, marginBottom:1,}}>
        <Text style={{fontSize:20}} >Track</Text>
      <View style={{alignItems:'flex-end', marginRight:10, marginBottom:5}}>
      <FontAwesomeIcon 
      icon={faRefresh} 
      size={20}
      />
      </View>
      </View>
      <View style={styles.trackScreen}>
        <GoogleMapTrack navigation={navigation}></GoogleMapTrack>
      </View>
      <View style={styles.driverDetails}>
      <FontAwesomeIcon 
      icon={faUserCircle} 
      size={40}
      />
      <Text style={{marginLeft: 30,}}> Cameron white is arriving..</Text>
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
    flex: 0.5,
    backgroundColor: "#ebebeb",
  },
  trackScreen: {
    flex: 1,
    marginTop: 2,
  },
  driverDetails: {
    alignItems: 'center',
    flex: 0.1,
    flexDirection: "row",
    margin:7
  },
  heading: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 5,
    alignItems: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  locationDetails: {
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    //  borderColor: AppTheme.colors.primary,
    padding: 15,
    elevation: 3,
    backgroundColor: AppTheme.colors.white,
    flexDirection: "row",
  },
  locationIconContainer: {
    marginRight: 10,
  },
  horizontalDashedLine: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderStyle: "dashed",
  },
  locationDetailsContainer: {
    flex: 1,
  },
  rideDetails: {
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    // borderColor: AppTheme.colors.primary,
    padding: 15,
    elevation: 3,
    backgroundColor: AppTheme.colors.white,
    marginTop: 30,
    alignItems: "center",
  },
  carIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  rideFeeContainer: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 3,
  },
  driverDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dashedLine: {
    borderRightWidth: 1,
    borderStyle: "dashed",
    height: 30,
    left: -10,
    marginVertical: 4,
  },
  profileImage: {
    borderRadius: 100,
    borderColor: AppTheme.colors.white,
    borderWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: AppTheme.colors.mediumGrey,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
  buttonPay: {
    position: 'absolute',
    backgroundColor: '#c90c0c',
    padding: 8,
    borderRadius: 8,
    right: 10,

    
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
