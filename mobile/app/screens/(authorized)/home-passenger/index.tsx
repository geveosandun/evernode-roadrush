import { StyleSheet, View } from "react-native";
import SCBottomNavigationBar, {
    BottomNavigationButtons,
  } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import { useState } from "react";
import TestService from "../../../services/services-domain/test-service";
import SCButton from "../../../components/button/button";
import GoogleMapTrack from "../map-track";
import GoogleMapSearch from "../map-search";

export default function HomePassanger({ navigation }) {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);


    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }

    return (
      <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
        <View style={styles.mainContainer}>
          <GoogleMapSearch navigation={navigation}></GoogleMapSearch>
        </View>
        <View style={{ height: 80 }}>
          <SCBottomNavigationBar
            navigation={navigation}
            selectedTab={BottomNavigationButtons.Home}
            onTapCallback={onBottomNavigationTapped}
          />
        </View>
      </AuthorizedLayout>
    );
  }

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 10,
    },
});