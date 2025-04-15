import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useApiUrl } from "../../UserContext/API";
import { Button } from "@react-navigation/elements";
import axios from "axios";

const SecretaryPage = ({ navigation, route }: any) => {
  const apiUrl = useApiUrl();
  const { userData } = route.params || {};
  console.log("userData:", userData);

  useEffect(() => {
    if (!userData) {
      console.log("No userData provided");
      navigation.navigate("Login"); // Redirect to Login if userData is missing
    }
  }, [userData]);

  interface Employee {
    id: number;
    firstname: string;
    email: string;
  }

  const [employeedata, setEmployeeData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    fetchEmployee(); // Load employee data
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/employees`);
      console.log("employee:", response.data);
      setEmployeeData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("secondscreen", { employee: item })}
    >
      <View className="p-4 border-b border-gray-300">
        <Text className="text-lg font-bold text-blue-500">
          {item.firstname}
        </Text>
        <Text className="text-gray-500">{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-lg text-red-500">
          Error: User data is missing
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-row bg-white">
        <Button onPress={() => navigation.openDrawer()}>Open drawer</Button>
        <View className="flex-1">
          <Text className="text-xl font-bold p-4">Employee List</Text>

          <Text>Welcome, {userData?.user?.email}</Text>
          
          {loading ? (
            <Text className="text-center text-gray-500">
              Loading employees...
            </Text>
          ) : (
            <FlatList
              data={employeedata}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecretaryPage;
