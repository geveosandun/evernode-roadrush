import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import AuthorizedLayout from '../../../layouts/authorized-layout';
import AppTheme from '../../../helpers/theme';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCarSide,
  faLocationCrosshairs,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import {BottomNavigationButtons} from '../../../components/bottom-navigation-bar/bottom-navigation-bar';
import {getDistance, getPreciseDistance} from 'geolib';
import AppSettings from '../../../helpers/app-settings';
import ApiService from '../../../services/api-service';
import HotPocketClientService from '../../../services/hp-client-service';
import AppSecureStorageService from '../../../services/secure-storage-service';
import XRPLService from '../../../services/xrpl-service';
import {showToast} from '../../../services/toast-service';
import {ToastMessageTypes} from '../../../helpers/constants';

export default function RideBookingPassenger({
  navigation,
  route,
}): React.JSX.Element {
  const apiService = ApiService.getInstance();
  const {origin, destination, originAddress, destinationAddress} = route.params;
  var distanceinKm = getPreciseDistance(origin, destination) / 1000;
  var priceForTheRideInEvrs = AppSettings.pricePerKm * distanceinKm;

  async function BookRide() {
    const xrplService = new XRPLService();
    const trustline: any = await xrplService.getTrustlineBalance();
    if (parseFloat(trustline.balance) < priceForTheRideInEvrs) {
      showToast(
        "You don't have enough EVRs. Please topup your account",
        ToastMessageTypes.error,
      );
    } else {
      let loggedInUserDetails = await AppSecureStorageService.getItem('user');
      let userDetailsJson = JSON.parse(loggedInUserDetails);
      let passengerUserId = userDetailsJson.UserID;
      let passengerName = userDetailsJson.UserName;
      apiService
        .bookRide(
          passengerUserId,
          JSON.stringify(origin),
          JSON.stringify(destination),
          passengerName,
          originAddress,
          destinationAddress,
          distanceinKm,
          priceForTheRideInEvrs,
        )
        .then((response: any) => {
          console.log('Res** ', response);
          navigation.navigate('activeridedetailspassenger', {
            origin: origin,
            destination: destination,
            originAddress: originAddress,
            destinationAddress: destinationAddress,
            distanceinKm: distanceinKm,
            priceForTheRideInEvrs: priceForTheRideInEvrs,
            requestId: response,
          });
        });
    }
  }

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={false}
      title="Book Your Ride Now"
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Trips}>
      <View style={styles.mainContainer}>
        <View style={styles.locationDetails}>
          <View style={styles.locationIconContainer}>
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              color={AppTheme.specification.colors.secondary}
              size={20}
            />
            <View style={styles.dashedLine}></View>
            <FontAwesomeIcon
              icon={faLocationDot}
              color={AppTheme.specification.colors.secondary}
              size={20}
            />
          </View>
          <View style={styles.locationDetailsContainer}>
            <Text style={{marginBottom: 20}}>{originAddress}</Text>
            <View style={styles.horizontalDashedLine}></View>
            <Text>{destinationAddress}</Text>
          </View>
        </View>

        <View style={styles.rideDetails}>
          <View style={styles.carIconContainer}>
            <FontAwesomeIcon icon={faCarSide} size={120} />
          </View>
          <View style={styles.rideFeeContainer}>
            <Text>{distanceinKm} km</Text>
            <Text
              style={{
                marginLeft: 50,
                color: AppTheme.specification.colors.red,
              }}>
              {priceForTheRideInEvrs} Evrs
            </Text>
          </View>
          <View style={styles.driverDetailsContainer}>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={async () => {
                await BookRide();
              }}>
              <Text style={{color: AppTheme.specification.colors.white}}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 5,
  },
  bottomNav: {
    height: 80,
  },
  heading: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 5,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  locationDetails: {
    margin: 2,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    backgroundColor: AppTheme.specification.colors.white,
    flexDirection: 'row',
  },
  locationIconContainer: {
    marginRight: 1,
  },
  horizontalDashedLine: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  locationDetailsContainer: {
    flex: 1,
  },
  rideDetails: {
    margin: 5,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    backgroundColor: AppTheme.specification.colors.white,
    marginTop: 30,
    alignItems: 'center',
  },
  carIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rideFeeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  driverDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashedLine: {
    borderRightWidth: 1,
    borderStyle: 'dashed',
    height: 30,
    left: -10,
    marginVertical: 4,
  },
  profileImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
    marginRight: 20,
  },
  bookBtn: {
    padding: 10,
    backgroundColor: AppTheme.specification.colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
