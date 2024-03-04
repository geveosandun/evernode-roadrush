import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RRBottomNavigationBar, {
  BottomNavigationButtons,
} from '../../../components/bottom-navigation-bar/bottom-navigation-bar';
import GoogleMapSearch from '../../../components/google-map-search/google-map-search';
import AuthorizedLayout from '../../../layouts/authorized-layout';

export function PassengerHome({navigation}): React.JSX.Element {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
    console.log(tab);
    return true;
  }

  return (
    <AuthorizedLayout
      title="Passenger Home"
      navigation={navigation}
      showWaitIndicator={showLoadingIndicator}
      showBottomNavigation={true}
      selectedBottomNavigationTab={BottomNavigationButtons.Home}>
      <View style={styles.mainContainer}>
        <GoogleMapSearch navigation={navigation}></GoogleMapSearch>
      </View>
    </AuthorizedLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
