import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PassengerHome} from './src/screens/passenger/home/passenger-home';
import {About} from './src/screens/about/about';
import {Login} from './src/screens/login/login';
import SplashScreen from './src/screens/splash/splash';
import UserModeSelection from './src/screens/user-mode-selection/user-mode-selection';
import {DriverHome} from './src/screens/driver/home/driver-home';
import RideViewDriver from './src/screens/driver/ride-view/ride-view-driver';
import Wallet from './src/screens/wallet/wallet';
import RideBookingPassenger from './src/screens/passenger/ride-booking/ride-booking-passenger';
import ActiveRideDetailsPassenger from './src/screens/passenger/active-ride-deails-passenger/active-ride-details-passenger';
import WaitIndicator from './src/components/activity-indicator/activity-indicator';

const linking = {
  prefixes: ['roadrush://'],
};

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<WaitIndicator show={true} />}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{title: 'Splash'}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="usermodeselection"
          component={UserModeSelection}
          options={{title: 'User mode selection'}}
        />
        <Stack.Screen
          name="passengerhome"
          component={PassengerHome}
          options={{title: 'Passenger Home'}}
        />
        <Stack.Screen
          name="driverhome"
          component={DriverHome}
          options={{title: 'Driver Home'}}
        />

        <Stack.Screen
          name="rideviewdriver"
          component={RideViewDriver}
          options={{title: 'Ride  View Driver'}}
        />

        <Stack.Screen
          name="ridebookingpassenger"
          component={RideBookingPassenger}
          options={{title: 'Ride Booking'}}
        />

        <Stack.Screen
          name="activeridedetailspassenger"
          component={ActiveRideDetailsPassenger}
          options={{title: 'Ride Details'}}
        />

        <Stack.Screen
          name="wallet"
          component={Wallet}
          options={{title: 'Wallet'}}
        />

        <Stack.Screen
          name="about"
          component={About}
          options={{title: 'About'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
