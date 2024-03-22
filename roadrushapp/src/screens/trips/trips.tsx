import {StyleSheet, View, Text, Pressable} from 'react-native';
import {BottomNavigationButtons} from '../../components/bottom-navigation-bar/bottom-navigation-bar';
import AuthorizedLayout from '../../layouts/authorized-layout';
import {useEffect, useState} from 'react';
import ApiService from '../../services/api-service';
import DateService from '../../services/date-service';
import AppTheme from '../../helpers/theme';

export default function Trips({navigation, route}) {
  const apiService = ApiService.getInstance();
  const dateService = DateService.getInstance();
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);
  const data = route.params;
  const [rideHistory, setRideHIstory] = useState([]);
  const ongoingTrip = data.ongoingTrips[0]|| {};
  console.log("Ongoing trips",ongoingTrip)
  const user = data.user;
  const loggedInAs = data.loggedInAs;

  useEffect(() => {
    apiService.getRideHistory(data.userId).then((response: any) => {
      console.log('Res RideHistory: ', response);
      setRideHIstory(response);
      setShowLoadingIndicator(false)
    });
  }, []);

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Trips}
      title="Ride History">
        {ongoingTrip.PickUpAddress != null &&
      <View style={styles.topContainer}>
        <Text style={{fontSize: 17, marginRight: 10, color:'black'}}>
          Ongoing ride from {ongoingTrip.PickUpAddress} to{' '}
          {ongoingTrip.DestinationAddress}{' '}
        </Text>
        <View>
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
                requestId: ongoingTrip.RideRequestID,
              });
            } else if (loggedInAs == 'driver') {
              navigation.navigate('rideviewdriver', {item:{
                PickupLocation: JSON.parse(ongoingTrip.PickupLocation),
                Destination: JSON.parse(ongoingTrip.Destination),
                PickUpAddress: ongoingTrip.PickUpAddress,
                DestinationAddress: ongoingTrip.DestinationAddress,
                Distance: ongoingTrip.Distance,
                Price: ongoingTrip.Price,
                RideRequestID: ongoingTrip.RideRequestID,
                CreatedBy: ongoingTrip.CreatedBy,
              }});
            }
          }}>
          <Text style={styles.buttonText}>View</Text>
        </Pressable>
        </View>
      </View>
      }
      <View style={{flex:0.8}}>
      <Text style={styles.historyText}>History</Text>
      {rideHistory &&
        rideHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyData}>
              Date: {dateService.getThemedTimeStamp(item.UpdatedDate)}
            </Text>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={styles.historyData}>
              Distance : {item.Distance}km
            </Text>
            <Text style={styles.historyData}>
              Amount: {item.FareAmount} EVR
            </Text>
            </View>
            <Text style={styles.historyData}>
              Status:{' '}
              {item.RideStatus == 'FINISHED' ? 'Payment Pending' : 'Completed'}
            </Text>
          </View>
        ))}
        </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.2,
    //flexDirection: 'row',
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
    borderRadius: 12,
    borderWidth: 0.75,
    borderColor: AppTheme.specification.colors.primary,
    elevation: 6,
    margin: 10,
    padding: 10,
    backgroundColor: AppTheme.specification.colors.white,
  },
  button: {
   //position: 'absolute',
    bottom: 1,
    right: 10,
    backgroundColor: 'green',
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
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
