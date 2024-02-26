import { StyleSheet, View } from "react-native";
import SCBottomNavigationBar, {
    BottomNavigationButtons,
  } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import { useState } from "react";
import TestService from "../../../services/services-domain/test-service";
import SCButton from "../../../components/button/button";

export default function HomePassanger({ navigation }) {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    let _testService = TestService.getInstance();

    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }

    const handleClick = () => {
      _testService.getChallngesByUser().then((reposne: any) => console.log('res')).catch((error) => console.log(error))
    }
    
    return (
        <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
            <View style={styles.mainContainer}>
            </View>
            <View style={{height: 80}}>
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