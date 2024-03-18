import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import HotPocketClientService from '../../services/hp-client-service';

export default function Trips({navigation, route}) {
  const apiService = ApiService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const data = route.params;
  const [rideHistory, setRideHIstory] = useState([]);
  const ongoingTrip = data.ongoingTrips[0];
  const user = data.user;
  const loggedInAs = data.loggedInAs;

  useEffect(() => {
    // HotPocketClientService.getInstance().then(ins => {
    //   console.log(ins);
    // });

    apiService.getRideHistory(data.userId).then((response: any) => {
      console.log('Res RideHistory: ', response);
      setRideHIstory(response);
    });
  }, []);

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Trips}
      title="Ride History">
      <View style={styles.topContainer}>
        <Text style={{fontSize: 20, marginRight: 10}}>
          Ongoing ride from {ongoingTrip.PickUpAddress} to{' '}
          {ongoingTrip.DestinationAddress}{' '}
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (loggedInAs == 'passenger') {
              navigation.navigate('activeridedetailspassenger', {
                origin: JSON.parse(ongoingTrip.PickupLocation),
                destination: JSON.parse(ongoingTrip.Destination),
                originAddress: ongoingTrip.PickUpAddress,
                destinationAddress: ongoingTrip.DestinationAddress,
                distanceinKm: ongoingTrip.Distance,
                priceForTheRideInEvrs: ongoingTrip.Price,
                rideRequestID: ongoingTrip.RideRequestID,
              });
            } else if (loggedInAs == 'driver') {
              navigation.navigate('rideviewdriver', {
                PickUpAddress: ongoingTrip.PickUpAddress,
                DestinationAddress: ongoingTrip.DestinationAddress,
                Distance: ongoingTrip.Distance,
                Price: ongoingTrip.Price,
                RideRequestID: ongoingTrip.RideRequestID,
                CreatedBy: ongoingTrip.CreatedBy,
              });
            }
          }}>
          <Text style={styles.buttonText}>View</Text>
        </Pressable>
      </View>

      {rideHistory &&
        rideHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyData}>
              Distance : {item.Distance}km Price: {item.FareAmount} Evrs{' '}
            </Text>
            <Text style={styles.historyData}>
              {' '}
              Status: {item.RideStatus} Date: {item.UpdatedDate}
            </Text>
          </View>
        ))}
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#F0ED5C',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  historyData: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  historyItem: {
    margin: 5,
    backgroundColor: '#dee0de',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
