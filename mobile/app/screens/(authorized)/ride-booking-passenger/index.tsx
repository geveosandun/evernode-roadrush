import { StyleSheet, View, Text, Image } from "react-native";
import AuthorizedLayout from "../../../components/layouts/authorized-layout";
import SCBottomNavigationBar, { BottomNavigationButtons } from "../../../components/bottom-navigation-bar/bottom-navigation-bar";
import AppTheme from "../../../helpers/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faCarSide, faChevronLeft, faL, faLocationCrosshairs, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SCButton from "../../../components/button/button";

export default function RideBooking({navigation}) {
    async function onBottomNavigationTapped(tab: BottomNavigationButtons) {
        console.log(tab);
        return true;
    }

    return (
        <AuthorizedLayout showWaitIndicator={false} >
            <View style={styles.mainContainer}>
                <View style={styles.heading}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faChevronLeft} color={AppTheme.colors.primary} size={20} />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>Book Your Ride Now</Text>
                </View>
                <View style={styles.locationDetails}>
                    <View style={styles.locationIconContainer}>
                        <FontAwesomeIcon icon={faLocationCrosshairs} color={AppTheme.colors.secondary} size={20} />
                        <View style={styles.dashedLine}></View>
                        <FontAwesomeIcon icon={faLocationDot} color={AppTheme.colors.secondary} size={20} />
                    </View>
                    <View style={styles.locationDetailsContainer}>
                        <Text style={{marginBottom: 20}}>Location</Text>
                        <View style={styles.horizontalDashedLine}></View>
                        <Text>Destination</Text>
                    </View>
                </View>
                <View style={styles.rideDetails}>
                    <View style={styles.carIconContainer}>
                        <FontAwesomeIcon icon={faCarSide} size={120} />
                        <Text>Audi e-tron Sportback</Text>
                    </View>
                    <View style={styles.rideFeeContainer}>
                        <Text>8.5km</Text>
                        <Text style={{marginLeft: 50, color: AppTheme.colors.red}}>0.56 Evrs</Text>
                    </View>
                    <View style={styles.driverDetailsContainer}>
                        <Image
                            style={styles.profileImage}
                            resizeMethod="resize"
                            resizeMode="contain"
                            source={{
                                uri: "https://eu.ui-avatars.com/api/?name=Mahinsha+Ramyathilake&size=250"
                            }}
                        />
                        <Text style={{marginHorizontal: 10}}>Cameron Williamson</Text>
                        <TouchableOpacity style={styles.bookkBtn} onPress={() => navigation.navigate("RideDetails")}>
                            <Text style={{color: AppTheme.colors.white}}>Book Now</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottomNav}>
                <SCBottomNavigationBar
                    navigation={navigation}
                    selectedTab={BottomNavigationButtons.Activity}
                    onTapCallback={onBottomNavigationTapped}
                />
            </View>
        </AuthorizedLayout>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 10
    },
    bottomNav: {
        height: 80
    },
    heading: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 5,
        alignItems: "center"
    },
    headingText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    locationDetails: {
        margin: 10,
        borderWidth: 0.5,
        borderRadius: 15,
      //  borderColor: AppTheme.colors.primary,
        padding: 15,
        elevation: 3,
        backgroundColor: AppTheme.colors.white,
        flexDirection: "row",
    },
    locationIconContainer: {
        marginRight: 10,
    },
    horizontalDashedLine: {
        borderBottomWidth: 1,
        marginBottom: 20,
        borderStyle: "dashed",
    },
    locationDetailsContainer: {
        flex: 1,
    },
    rideDetails: {
        margin: 10,
        borderWidth: 0.5,
        borderRadius: 15,
       // borderColor: AppTheme.colors.primary,
        padding: 15,
        elevation: 3,
        backgroundColor: AppTheme.colors.white,
        marginTop: 30,
        alignItems: "center",
    },
    carIconContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    rideFeeContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    driverDetailsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    dashedLine: {
        borderRightWidth: 1,
        borderStyle: "dashed",
        height: 30,
        left: -10,
        marginVertical: 4,
    },
    profileImage: {
        borderRadius: 100,
        borderColor: AppTheme.colors.white,
        borderWidth: 2,
        width: 50,
        height: 50,
        backgroundColor: AppTheme.colors.mediumGrey,
    },
    bookkBtn: {
        padding: 10,
        backgroundColor: AppTheme.colors.primary,
        borderRadius: 10
    },
});