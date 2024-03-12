import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import AppSettings from '../../helpers/app-settings';
import AppTheme from '../../helpers/theme';

export default function GoogleMapSearch({navigation}): React.JSX.Element {
  const mapRef = useRef(null);

  const [origin, setOrigin] = useState<{latitude: number; longitude: number} | undefined>();
  const [destination, setDestination] = useState<{latitude: number; longitude: number} | undefined>();
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [markerList, setMarkerList] = useState([
    {
      latitude: 6.836611,
      longitude: 81.003073,
      title: 'I am here',
    },
    {
      latitude: 6.841405,
      longitude: 81.004405,
      title: 'I am here',
    },
  ]);

  async function moveToLocation({latitude, longitude}) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1,
          flex: 0.5,
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Origin"
            enablePoweredByContainer={false}
            numberOfLines={3}
            styles={{
              textInput: {
                height: 40,
                fontSize: 16,
                borderWidth: 1,
              },
            }}
            onPress={(data, details = null) => {
              let originAddress = details.address_components[0].short_name;
              let originCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setOrigin(originCoordinates);
              setOriginAddress(originAddress);
              moveToLocation(originCoordinates);
            }}
            query={{
              key: AppSettings.googleApiKey,
              language: 'en',
            }}
            onFail={error => console.log(error)}
          />
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Destination"
            enablePoweredByContainer={false}
            numberOfLines={2}
            disableScroll= {false}
            currentLocation= {true}
            debounce = {0}
            styles={{
              textInput: {
                height: 40,
                fontSize: 16,
                borderWidth: 1,
              },
            }}
            onPress={(data, details = null) => {
              let destinationAddress = details.address_components[0].short_name;
              let destinationCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setDestinationAddress(destinationAddress);
              setDestination(destinationCoordinates);
              moveToLocation(destinationCoordinates);
            }}
            query={{
              key: AppSettings.googleApiKey,
              language: 'en',
            }}
            onFail={error => console.log(error)}
          />
        </View>
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 6.838545,
          longitude: 81.007132,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        zoomEnabled={true}>
        {origin !== undefined ? <Marker coordinate={origin}></Marker> : null}
        {destination !== undefined ? (
          <Marker coordinate={destination}></Marker>
        ) : null}
        <Marker
          coordinate={{latitude: 6.838545, longitude: 81.007132}}
          title={'Current Location'}
        />
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            strokeColor="blue"
            strokeWidth={6}
            mode= 'DRIVING'
            destination={destination}
            apikey={AppSettings.googleApiKey}
          />
        ) : null}
      </MapView>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('ridebookingpassenger', {
            origin: origin,
            destination: destination,
            originAddress: originAddress,
            destinationAddress: destinationAddress,
          })
        }>
        <Text style={styles.buttonText}>PROCEED</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
