import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ApiUrlProvider } from "../UserContext/API"; // Import the ApiUrlProvider
import LoginScreen from "./Login/login"; // Import your Login screen
import SecretaryPage from "./SecretaryPage/secretary";
import EmployeePage from "./EmployeePage/employee";
import SidebarSecretary from "./SecretaryPage/secretarysidebar";
const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <ApiUrlProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Secretary" component={SecretaryPage} />
        <Stack.Screen name="Employee" component={EmployeePage} />
        <Stack.Screen name="SidebarSecretary" component={SidebarSecretary} />
      </Stack.Navigator>
    </ApiUrlProvider>
  );
}
