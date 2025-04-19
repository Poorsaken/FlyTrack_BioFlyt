import React, { useState } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { ApiUrlProvider } from "../UserContext/API";

import LoginScreen from "./Login/login";
import SecretaryPage from "./SecretaryPage/secretary";
import EmployeePage from "./EmployeePage/employee";
import PunchClock from "./SecretaryPage/PunchClock";
import EmployeeTable from "./SecretaryPage/employeetable";
import LogoutScreen from "./logout";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);

  return (
    <ApiUrlProvider>
     
        {!isLoggedIn ? (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerType: "back",
   
            }}
          >
            <Drawer.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
         
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerStyle: { width: 250 },
            }}
          >
            {userRole === 2 && (
              <>
                <Drawer.Screen name="Secretary">
                  {(props) => <SecretaryPage {...props} />}
                </Drawer.Screen>

                <Drawer.Screen
                  name="PunchClock"
                  options={{ drawerItemStyle: { display: "none" } }}
                >
                  {(props) => <PunchClock {...props} />}
                </Drawer.Screen>

                <Drawer.Screen name="EmployeeTable">
                  {(props) => <EmployeeTable {...props} />}
                </Drawer.Screen>
              </>
            )}

            {userRole === 1 && (
              <>
                <Drawer.Screen name="Employee" component={EmployeePage} />
              </>
            )}

            <Drawer.Screen
              name="Logout"
              options={{
                drawerLabelStyle: { color: "red", fontWeight: "bold" },
              }}
            >
              {(props) => (
                <LogoutScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        )}

    </ApiUrlProvider>
  );
}
