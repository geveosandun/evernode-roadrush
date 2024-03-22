import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RRButton from '../../../components/button/button';
import AuthorizedLayout from '../../../layouts/authorized-layout';
import ApiService from '../../../services/api-service';
import HotPocketClientService from '../../../services/hp-client-service';

export function DriverHome({navigation, route}): React.JSX.Element {
  const apiService = ApiService.getInstance();
  let user = route.params;
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true);

  const [requests, setRequests] = useState<any>();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    HotPocketClientService.getInstance().then(ins => {
      console.log(ins);
    });
    if(user.hasOwnProperty('user')) {
      setUserId(user.user.UserID);
      apiService.getRideRequests(user.user.UserID).then((response: any) => {
        console.log("REQ",response)
        setRequests(response);
        setShowLoadingIndicator(false);
      });
    } else {
      setUserId(user.UserID);
      apiService.getRideRequests(user.UserID).then((response: any) => {
        console.log("REQ",response)
        setRequests(response);
        setShowLoadingIndicator(false);
      });
    }
  }, [user]);

  function acceptRide(rideDetails, userId) {
    apiService.acceptRide(rideDetails, userId);
  }

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      title="Requests">
      <View style={styles.mainContainer}>
        {requests && requests.map(item => {
          console.log("ITEM",item);
          return(  
          <View key={parseInt(item.RideRequestID)} style={styles.item}>
            <View style={styles.textContainer}>
              <View style={styles.rideData}>
                <Text style={styles.itemText}>
                  Pick up: {item.PickUpAddress}
                </Text>
                <Text style={styles.itemTextRightAlign}>
                  Destination: {item.DestinationAddress}
                </Text>
              </View>
              <View style={styles.rideData}>
                <Text style={styles.itemText}>
                  Distance: {item.Distance} km{' '}
                </Text>
                <Text style={styles.itemTextRightAlign}>
                  Price: {item.Price} EVR
                </Text>
              </View>
              <RRButton
                text="Accept"
                onTap={() => {
                  acceptRide(item, user.user.UserID);
                  navigation.navigate('rideviewdriver', {item});
                }}
              />
            </View>
          </View>
        )})}
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f2f5f4',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color:'black'
  },
  itemTextRightAlign: {
    fontSize: 16,
    color:'black',
    textAlign: 'right',
  },
  rideData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
