import React from "react";
import { View, Text } from "react-native";

const EmployeePage = ({navigation}:any) => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-bold text-blue-500">Hi, this is Employee</Text>
    </View>
  );
};

export default EmployeePage;