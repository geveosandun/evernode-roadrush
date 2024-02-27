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
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Robert Will' },
        { id: '3', name: 'Will Smith' },
        { id: '4', name: 'Jimmy Kay' },
        { id: '5', name: 'Lilly White' },
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
                        </View>
                        <View style={styles.buttonsContainer}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Button title="View" onPress={() => console.log('View pressed')} />
                            </View>
                            <View style={{ backgroundColor: 'a80c16' }}>
                                <Button title="Cancel" onPress={() => console.log('Cancel pressed')} />
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