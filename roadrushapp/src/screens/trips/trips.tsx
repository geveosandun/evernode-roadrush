import {StyleSheet, View, Text, Pressable} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import DateService from '../../services/date-service';

export default function Trips({navigation, route}) {
  const apiService = ApiService.getInstance();
  const dateService = DateService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const data = route.params;
  const [rideHistory, setRideHIstory] = useState([]);
  const ongoingTrip = data.ongoingTrips[0] || {};
  const user = data.user;
  const loggedInAs = data.loggedInAs;

  useEffect(() => {
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
      {ongoingTrip.PickUpAddress != null && (
        <View style={styles.topContainer}>
          <Text style={{fontSize: 18, marginRight: 10, color: 'black'}}>
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
                  item: {
                    PickUpAddress: ongoingTrip.PickUpAddress,
                    DestinationAddress: ongoingTrip.DestinationAddress,
                    Distance: ongoingTrip.Distance,
                    Price: ongoingTrip.Price,
                    RideRequestID: ongoingTrip.RideRequestID,
                    CreatedBy: ongoingTrip.CreatedBy,
                  },
                });
              }
            }}>
            <Text style={styles.buttonText}>View</Text>
          </Pressable>
        </View>
      )}
      <Text style={styles.historyText}>History</Text>
      {rideHistory &&
        rideHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyData}>
              Date: {dateService.getThemedTimeStamp(item.UpdatedDate)}
            </Text>
            <Text style={styles.historyData}>
              Distance : {item.Distance}km Price: {item.FareAmount} Evrs
            </Text>
            <Text style={styles.historyData}>
              Status:{' '}
              {item.RideStatus == 'FINISHED' ? 'Payment Pending' : 'Completed'}
            </Text>
          </View>
        ))}
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#d5eda6',
    borderRadius: 15,
    elevation: 6,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  historyData: {
    fontSize: 16,
    marginBottom: 2,
    color: 'black',
  },
  historyItem: {
    borderRadius: 10,
    elevation: 6,
    margin: 10,
    padding: 10,
    backgroundColor: '#f2f5f4',
  },
  button: {
    width: 100,
    backgroundColor: 'green',
    marginTop: 5,
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyText: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
