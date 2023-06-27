import LoginScreen from "app/src/screens/Login.screen";
import WelcomeScreen from "app/src/screens/Welcome.screen";
import EvmScreen from "app/src/screens/Evm.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type GuestNavigatorParamList = {
  loading: undefined;
  login: undefined;
  logout: undefined;
  welcome: undefined;
  evm: undefined;
};

const Stack = createNativeStackNavigator<GuestNavigatorParamList>();

export function GuestNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="evm"
        component={EvmScreen}
        options={{
          title: "Login with EVM identity",
        }}
      />
    </Stack.Navigator>
  );
}
