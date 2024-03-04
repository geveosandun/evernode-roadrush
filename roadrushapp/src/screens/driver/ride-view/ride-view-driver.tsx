import {StyleSheet, View, Text} from 'react-native';
import AuthorizedLayout from '../../../layouts/authorized-layout';
import {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AppSettings from '../../../helpers/app-settings';
import RRButton from '../../../components/button/button';

export default function RideViewDriver({navigation}): React.JSX.Element {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [destination, setDestination] = useState({
    latitude: 6.836611,
    longitude: 81.003073,
  });

  const [origin, setOrigin] = useState({
    latitude: 6.841405,
    longitude: 81.004405,
  });

  return (
    <AuthorizedLayout
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      title="Current Ride">
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.838545,
            longitude: 81.007132,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={AppSettings.googleApiKey}
            strokeWidth={5}
            strokeColor="blue"
            mode={'TRANSIT'}
          />
          <Marker coordinate={origin} title="Starting Point" />
          <Marker coordinate={destination} title="Destination Point" />
        </MapView>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{marginTop: 20}}>Passanger : John Doe </Text>
        <Text>Away : 2Km </Text>
        <Text>Drop Down : Kottawa Town </Text>
        <Text>Ride Distance : 15Km </Text>
        <Text>Amount : 6.7 Evrs </Text>
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
  detailsContainer: {
    flex: 0.5,
    marginLeft: 10,
  },
});
