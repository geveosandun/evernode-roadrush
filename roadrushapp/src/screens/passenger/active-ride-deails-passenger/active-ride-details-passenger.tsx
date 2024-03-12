import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppTheme from '../../../helpers/theme';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AuthorizedLayout from '../../../layouts/authorized-layout';
import SCBottomNavigationBar, {
  BottomNavigationButtons,
} from '../../../components/bottom-navigation-bar/bottom-navigation-bar';
import LiveMap from '../live-map/live-map';
import {
  faUserCircle,
  faChevronLeft,
  faLocationCrosshairs,
  faLocationDot,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import RRButton from '../../../components/button/button';
import AuthorizedLayoutWithoutScroll from '../../../layouts/authorized-layout-without-scroll';

export default function ActiveRideDetailsPassenger({
  navigation,
  route
}): React.JSX.Element {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const {origin, destination, originAddress, destinationAddress, distanceinKm, priceForTheRideInEvrs} = route.params;

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  return (
    <AuthorizedLayoutWithoutScroll
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      title="Your Ride Details"
      selectedBottomNavigationTab={BottomNavigationButtons.Trips}>
      <View style={styles.mainContainer}>
        <View style={styles.refreshIcon}>
        <FontAwesomeIcon
              icon={faRefresh}
              color={AppTheme.specification.colors.secondary}
              size={20}
            />
        </View>
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
        <View style={styles.rideFeeContainer}>
          {/* <Text style={{marginRight: 20, marginLeft: 15}}>
            Audi e-tron Sportback
          </Text> */}
          <Text style={{marginRight: 57, marginLeft: 20}}>{distanceinKm} km</Text>
          <Text style={{color: AppTheme.specification.colors.red, marginLeft:170}}>
           {priceForTheRideInEvrs} Evrs
          </Text>
        </View>
          {/* <RRButton
            bgColor={AppTheme.specification.colors.red}
            textColor={AppTheme.specification.colors.white}
            text="Processing"
            onTap={() => {}}
          /> */}
      </View>
      <View style={styles.trackScreen}>
        <LiveMap navigation={navigation} origin={origin} destination={destination} ></LiveMap>
      </View>
      {/* <View style={styles.driverDetails}>
        <FontAwesomeIcon icon={faUserCircle} size={40} />
        <Text style={{marginLeft: 30}}> Cameron white is arriving..</Text>
      </View> */}
    </AuthorizedLayoutWithoutScroll>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ebebeb',
  },
  trackScreen: {
    flex: 1,
    marginTop: 2,
    borderTopColor:AppTheme.specification.colors.mediumGrey,
    borderTopWidth:1
  },
  driverDetails: {
    alignItems: 'center',
    flex: 0.1,
    flexDirection: 'row',
    marginLeft:10,
    marginRight:10
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
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    backgroundColor: AppTheme.specification.colors.white,
    flexDirection: 'row',
  },
  locationIconContainer: {
    marginRight: 10,
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
    margin: 10,
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
    marginBottom: 5,
    marginTop: 3,
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
    borderColor: AppTheme.specification.colors.white,
    borderWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: AppTheme.specification.colors.mediumGrey,
  },
  button: {
    position: 'absolute',
    backgroundColor: AppTheme.specification.colors.primary,
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
  refreshIcon:{
    marginTop:5,
    marginRight: 5,
   alignItems:'flex-end'
  }
});
