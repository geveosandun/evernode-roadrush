import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./welcome-screen";
import LandingScreen from "./screens/(anonymous)/landing";
import SignInScreen from "./screens/(anonymous)/signIn";
import SplashScreen from "./screens/(anonymous)/splash";
import SelectTypeScreen from "./screens/(anonymous)/selectType";
import Home from "./screens/(authorized)/home";
import Activity from "./screens/(authorized)/activity";
import Notification from "./screens/(authorized)/notification";
import Profile from "./screens/(authorized)/profile";
import HomePassenger from "./screens/(authorized)/home-passenger";
import HomeDriver from "./screens/(authorized)/home-driver";
import GoogleMapTrack from "./screens/(authorized)/map-track";
import GoogleMapSearch from "./screens/(authorized)/map-search"
import RideBooking from "./screens/(authorized)/ride-booking-passenger";
import RideDetails from "./screens/(authorized)/ride-details-for-passenger";
import RideViewScreen from "./screens/(authorized)/ride-view-driver";
import WalletScreen from "./screens/(authorized)/wallet";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"SplashScreen"}
      >
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="ActivityScreen"
          component={Activity}
          options={{ title: "Activity" }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={Notification}
          options={{ title: "Notification" }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ title: "Landing" }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: "Splash" }}
        />
        <Stack.Screen
          name="SelectTypeScreen"
          component={SelectTypeScreen}
          options={{ title: "Select Type" }}
        />
          <Stack.Screen
          name="HomePassenger"
          component={HomePassenger}
          options={{ title: "Home Passenger" }}
        />
          <Stack.Screen
          name="HomeDriver"
          component={HomeDriver}
          options={{ title: "Home Driver" }}
        />
          <Stack.Screen
          name="GoogleMapTrack"
          component={GoogleMapTrack}
          options={{ title: "Google Map Track" }}
        />
          <Stack.Screen
          name="GoogleMapSearch"
          component={GoogleMapSearch}
          options={{ title: " Google Map Search" }}
        />
        <Stack.Screen
          name="RideBookinghScreen"
          component={RideBooking}
          options={{ title: "Ride Booking" }}
        />
          <Stack.Screen
          name="RideDetails"
          component={RideDetails}
          options={{ title: "Ride Details" }}
        />
          <Stack.Screen
          name="RideViewScreen"
          component={RideViewScreen}
          options={{ title: "Ride  View Screen" }}
        />
          <Stack.Screen
          name="WalletScreen"
          component={WalletScreen}
          options={{ title: "Wallet Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
