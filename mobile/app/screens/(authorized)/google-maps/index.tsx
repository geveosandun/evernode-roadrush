import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


interface googleMapProps {}

const GoogleMap = (props: googleMapProps) => {

  const [markerList, setMarkerList] = useState([
    {
      latitude: 6.836611,
       longitude: 81.003073,
       title: 'I am here'
    },
    {
      latitude: 6.841405, 
       longitude: 81.004405,
       title: 'I am here'
    },
  ])
  return (
    <View style={styles.container}>
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 6.838545, 
         longitude: 81.007132,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
      <Marker
      coordinate={{latitude: 6.838545, longitude: 81.007132}}
      title={'Current Location'}
    />
     </MapView>
    </View>
  );
};

export default GoogleMap;

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
