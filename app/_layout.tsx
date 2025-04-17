import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ApiUrlProvider } from "../UserContext/API";

import LoginScreen from "./Login/login";
import SecretaryPage from "./SecretaryPage/secretary";
import EmployeePage from "./EmployeePage/employee";
import PunchClock from "./SecretaryPage/PunchClock";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null); // Role: 1, 2, etc.

  return (
    <ApiUrlProvider>
      <Drawer.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 250,
          },
        }}
      >
        {!isLoggedIn ? (
          <Drawer.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            )}
          </Drawer.Screen>
        ) : (
          <>
            {userRole === 2 && (
              <>
                <Drawer.Screen name="Secretary">
                  {(props) => <SecretaryPage {...props} />}
                </Drawer.Screen>

                <Drawer.Screen name="PunchClock">
                  {(props) => <PunchClock {...props} />}
                </Drawer.Screen>
              </>
            )}
            {userRole === 1 && (
              <Drawer.Screen name="Employee" component={EmployeePage} />
            )}
          </>
        )}
      </Drawer.Navigator>
    </ApiUrlProvider>
  );
}
