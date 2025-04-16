import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useApiUrl } from "../../UserContext/API";
import axios from "axios";

const SecretaryPage = ({ navigation, route }: any) => {
  const apiUrl = useApiUrl();
  const { userData } = route.params || {};

  interface Employee {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    jobTitle: string;
    employee_id: string;
  }

  const [employeedata, setEmployeeData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    fetchEmployee();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/employees`);
      setEmployeeData(response.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg text-gray-600 mt-4">Loading user data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-row bg-white">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            className="w-10 h-10 m-2"
            source={require("../../assets/images/menu-bar.png")}
          />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-xl font-bold p-4">Employee Attendance</Text>

          {loading ? (
            <Text className="text-center text-gray-500">
              Loading employees...
            </Text>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingBottom: 16,
              }}
            >
              {employeedata.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("secondscreen", { employee: item })
                  }
                  className="bg-red-400 rounded-lg m-2 shadow-md w-[30%] aspect-square"
                >
                  <View className="flex-1 items-start justify-center mb-2 rounded-lg bg-orange-300">
                    {/* Optional icon or image here */}
                  </View>
                  <View className="flex-1 justify-center p-4">
                    <Text className="text-lg font-normal text-gray-800">
                      Employee ID: {item.employee_id}
                    </Text>
                    <Text className="text-lg font-bold text-blue-500">
                      Name: {item.firstname} {item.surname}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Job Title: {item.jobTitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecretaryPage;
