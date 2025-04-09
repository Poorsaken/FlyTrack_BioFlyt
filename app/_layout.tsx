import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index"; // Import the Index component
import LoginScreen from "./Login/login"; // Import your Login screen

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation:'fade'
      }}
    >

      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
