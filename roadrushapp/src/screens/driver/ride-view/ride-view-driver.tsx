import {StyleSheet, View, Text} from 'react-native';
import {useState} from 'react';
import RRButton from '../../../components/button/button';
import LiveMap from '../../passenger/live-map/live-map';
import AuthorizedLayoutWithoutScroll from '../../../layouts/authorized-layout-without-scroll';
import ApiService from '../../../services/api-service';
import { showToast } from '../../../services/toast-service';
import { ToastMessageTypes } from '../../../helpers/constants';
import AppSecureStorageService from '../../../services/secure-storage-service';

export default function RideViewDriver({navigation, route}): React.JSX.Element {
  const _apiService = ApiService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const passengerData = route.params;
  console.log('passenger item', route.params);
  const [destination, setDestination] = useState({
    latitude: 6.836611,
    longitude: 81.003073,
  });

  const [origin, setOrigin] = useState({
    latitude: 6.841405,
    longitude: 81.004405,
  });

  const endTrip = async () => {
    try {
      setShowLoadingIndicator(true);
      const res = await _apiService.endTrip(passengerData.item.RideRequestID);
      console.log('returned', res);
      let activeUser = JSON.parse(await AppSecureStorageService.getItem('user'));
      const intervalId = setInterval(() => {
        console.log('This runs every 5 seconds', passengerData.item.RideRequestID);
        _apiService.gerCurrentRideDetails(passengerData.item.RideRequestID).then((res: any) => {
          if (res.status === 'COMPLETED') {
            showToast('Successfully received payment', ToastMessageTypes.success);
            setShowLoadingIndicator(false);
            navigation.navigate('driverhome', {activeUser});
            clearInterval(intervalId);
          }
        });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthorizedLayoutWithoutScroll
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      title="Current Ride">
      <View style={styles.container}>
        <LiveMap
          navigation={navigation}
          origin={origin}
          destination={destination}></LiveMap>
      </View>
      <View style={styles.detailsContainer}>
          <Text style={{marginTop: 20}}>
            Passanger : {passengerData.item.CreatedBy}{' '}
          </Text>
        <Text>Pick Up : {passengerData.item.PickUpAddress} </Text>
        <Text>Drop Down : {passengerData.item.DestinationAddress} </Text>
        <Text>Ride Distance : {passengerData.item.Distance} km</Text>
        <Text>Amount : {passengerData.item.Price} Evrs</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 75,
        }}>
        <RRButton
          showLeftArrow={false}
          showRightArrow={false}
          text="End Trip"
          onTap={endTrip}
        />
      </View>
    </AuthorizedLayoutWithoutScroll>
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
  detailsContainer: {
    flex: 0.5,
    marginLeft: 10,
  },
});
