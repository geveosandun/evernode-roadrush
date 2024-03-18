import {StyleSheet, View, Text} from 'react-native';
import {useState} from 'react';
import RRButton from '../../../components/button/button';
import LiveMap from '../../passenger/live-map/live-map';
import AuthorizedLayoutWithoutScroll from '../../../layouts/authorized-layout-without-scroll';
import ApiService from '../../../services/api-service';

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
      const res = await _apiService.endTrip(passengerData.item.RideRequestID);
      console.log('returned', res);
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
        {passengerData.item.CreatedBy != null && (
          <Text style={{marginTop: 20}}>
            Passanger : {passengerData.item.CreatedBy}{' '}
          </Text>
        )}
        <Text>Pick Up : {passengerData.item.PickUpAddress} </Text>
        <Text>Drop Down : {passengerData.item.DestinationAddress} </Text>
        <Text>Ride Distance : {passengerData.item.Distance} km</Text>
        <Text>Amount : {passengerData.item.Price} Evrs</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 20,
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
