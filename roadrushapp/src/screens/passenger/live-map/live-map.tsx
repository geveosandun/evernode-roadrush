import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AppSettings from '../../../helpers/app-settings';

export default function LiveMap({
  navigation,
  origin,
  destination,
}): React.JSX.Element {
  const originCoordinates = {
    latitude: origin.latitude,
    longitude: origin.longitude,
  };
  const destinationCoordinates = {
    latitude: destination.latitude,
    longitude: destination.longitude,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={originCoordinates}
          destination={destinationCoordinates}
          apikey={AppSettings.googleApiKey}
          strokeWidth={5}
          strokeColor="blue"
          mode="DRIVING"
        />
        <Marker coordinate={originCoordinates} title="Starting Point" />
        <Marker coordinate={destinationCoordinates} title="Destination Point" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
