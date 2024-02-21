import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./welcome-screen";
import LandingScreen from "./screens/(anonymous)/landing";
import SignInScreen from "./screens/(anonymous)/signIn";
import SplashScreen from "./screens/(anonymous)/splash";

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
        {/* <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ title: "Home" }}
        /> */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
