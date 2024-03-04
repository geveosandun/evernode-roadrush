import { StyleSheet, View, Text, Button } from "react-native";
import SCBottomNavigationBar, {
    BottomNavigationButtons,
} from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import { useState } from "react";
import SCButton from "../../../components/button/button";

export default function HomeDriver({ navigation }) {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
    const requests = [
        { id: '1', name: 'John Doe',pickUpDistance: '2 Km' },
        { id: '2', name: 'Robert Will', pickUpDistance: '2.4 Km' },
        { id: '3', name: 'Will Smith', pickUpDistance: '3 Km' },
        { id: '4', name: 'Jimmy Kay', pickUpDistance: '3 Km' },
        { id: '5', name: 'Lilly White', pickUpDistance: '3.2 Km' },
    ];


    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }

    return (
        <AuthorizedLayout showWaitIndicator={showLoadingIndicator}>
            <View style={styles.mainContainer}>
                <Text style={styles.header}>Requests</Text>
                {requests.map(item => (
                    <View key={item.id} style={styles.item}>
                        <View style={styles.textContainer}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>{item.pickUpDistance} away</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View >
                                <Button title="Accept" onPress={() => navigation.navigate("RideViewScreen")} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.bottomBar}>
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
    header: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#9fc4b1',
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    bottomBar: {
        height: 80,
    },
});