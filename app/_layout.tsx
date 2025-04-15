import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ApiUrlProvider } from "../UserContext/API"; // Import the ApiUrlProvider
import LoginScreen from "./Login/login"; // Import your Login screen
import SecretaryPage from "./SecretaryPage/secretary";
import EmployeePage from "./EmployeePage/employee";
import SidebarSecretary from "./SecretaryPage/secretarysidebar";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <ApiUrlProvider>
      {/* <NavigationContainer> */}
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Secretary" component={SecretaryPage} />
          <Drawer.Screen name="Employee" component={EmployeePage} />
          {/* <Drawer.Screen name="SidebarSecretary" component={SidebarSecretary} /> */}
        </Drawer.Navigator>
      {/* </NavigationContainer> */}
    </ApiUrlProvider>
  );
}
