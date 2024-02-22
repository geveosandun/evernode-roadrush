import { StyleSheet, View } from "react-native";
import SCBottomNavigationBar, {
    BottomNavigationButtons,
  } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import { useState } from "react";

export default function Profile({ navigation }) {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }
    
    return (
        <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
            <View style={styles.mainContainer}>
            
            </View>
            <View style={{height: 80}}>
                <SCBottomNavigationBar
                    navigation={navigation}
                    selectedTab={BottomNavigationButtons.Profile}
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