import * as React from "react";
import { useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "../../../helpers/constants";
import MapViewDirections from "react-native-maps-directions";

interface googleMapProps {}

const GoogleMapSearch = (props: googleMapProps) => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | undefined>();
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | undefined>()
  const [markerList, setMarkerList] = useState([
    {
      latitude: 6.836611,
      longitude: 81.003073,
      title: "I am here",
    },
    {
      latitude: 6.841405,
      longitude: 81.004405,
      title: "I am here",
    },
  ]);

  async function moveToLocation({ latitude, longitude }) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          zIndex: 1,
          flex: 0.5,
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Origin"
            onPress={(data, details = null) => {
              let originCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setOrigin(originCoordinates);
              moveToLocation(originCoordinates);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onFail={(error) => console.log(error)}
          />
        </View>
        <View style={{ flex: 0.5, marginLeft: 6 }}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Destination"
            onPress={(data, details = null) => {
              let destinationCoordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
              };
              setDestination(destinationCoordinates);
              moveToLocation(destinationCoordinates);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onFail={(error) => console.log(error)}
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
      >
        {origin !== undefined ? <Marker coordinate={origin}></Marker> : null}
        {destination !== undefined ? ( <Marker coordinate={destination}></Marker>) : null}
        <Marker
          coordinate={{ latitude: 6.838545, longitude: 81.007132 }}
          title={"Current Location"}
        />
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            strokeColor="blue"
            strokeWidth={3}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
          />
        ) : null}
      </MapView>
    </View>
  );
};

export default GoogleMapSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});