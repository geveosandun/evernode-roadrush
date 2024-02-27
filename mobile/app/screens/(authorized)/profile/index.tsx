import { StyleSheet, View } from "react-native";
import SCBottomNavigationBar, {
    BottomNavigationButtons,
  } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import { useState } from "react";
import SCButton from "../../../components/button/button";
import AuthService from "../../../services/auth-service";

export default function Profile({ navigation }) {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    const _authService = AuthService.getInstance();

    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }

    const handleClick = () => {
        _authService.submitLogoutRequest().then((resposne: any) => {
            if (resposne) {
                navigation.navigate("SignInScreen");
            }
        })
      }
    
    return (
        <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
            <View style={styles.mainContainer}>
                <SCButton showLeftArrow={false} showRightArrow={false} text="Logout" onTap={handleClick}/>
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