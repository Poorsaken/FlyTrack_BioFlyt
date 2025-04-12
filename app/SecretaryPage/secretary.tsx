import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useApiUrl } from "../../UserContext/API";
import SidebarSecretary from "./secretarysidebar";
import axios from "axios";

const SecretaryPage = ({ navigation, route }: any) => {
  const apiUrl = useApiUrl();
  const { userData } = route.params;
  console.log(route.params);

  interface Employee {
    id: number;
    name: string;
    email: string;
  }

  const [employeedata, setEmployeeData] = useState<Employee[]>([]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/employees`);
      console.log("employee:", response.data);
      setEmployeeData(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate("secondscreen")}>

    <View className="p-4 border-b border-gray-300">
      <Text className="text-lg font-bold text-blue-500">{item.firstname}</Text>
      <Text className="text-gray-500">{item.email}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-row bg-white">
        <View className="w-1/4">
          <SidebarSecretary />
          <Text style={{ color: "green" }}>{userData.user.email}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-xl font-bold p-4">Employee List</Text>
          <FlatList
            data={employeedata} 
            renderItem={renderItem} 
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecretaryPage;