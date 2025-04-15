import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import axios from "axios";
import { useApiUrl } from "../../UserContext/API"; // Adjust the import path as necessary

const LoginScreen = ({ navigation}: any) => {
  const apiUrl = useApiUrl();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to control the loading modal

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

 const handleLogin = async () => {
   // Show loading modal
   setLoading(true);
   try {
     const response = await axios.post(`${apiUrl}/api/auth/login`, {
       email,
       password,
     });

     if (response.status === 200) {
       const userData = response.data;
       console.log("Login Successful:", userData);

       setLoading(false);

       // Update login state and navigate to the appropriate screen

       if (userData.user.role === 2) {
         navigation.navigate("Secretary", { userData });
       } else {
         navigation.navigate("Employee", { userData });
       }
     } else {
       console.log("Unexpected response:", response.data);
       setLoading(false);
     }
   } catch (err) {
     console.log("Error", err);
     setLoading(false);
   }
 };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
    
      <Modal transparent={true} visible={loading} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <ActivityIndicator size="large" color="#09A214" />
          <Text className="text-white mt-4">Logging in...</Text>
        </View>
      </Modal>
         
      <View className="flex-row w-full h-full">
        <View className="flex-1 justify-center items-center border">
          <View className="w-4/5 mb-5">
            <View className="my-6">
              <Text className="text-[#1d1d1f] text-2xl">Login</Text>
              <Text className="text-[#1d1d1f]">
                Enter your credentials to proceed.
              </Text>
            </View>
            <Text className="text-[#9A9A9A] mb-2">Email</Text>
            <TextInput
              className="h-10 border w-4/5 border-gray-400 mb-2 px-2 rounded"
              placeholder="ex. juan_delacruz@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text className="text-[#9A9A9A] mb-2">Password</Text>
            <TextInput
              className="h-10 border w-4/5 border-gray-400 mb-2 px-2 rounded"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity
              className="bg-[#09A214] h-10 w-4/5 rounded justify-center items-center"
              onPress={handleLogin}
            >
              <Text className="text-white">Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 justify-center items-center border">
          <Text className="text-cyan-400">50%</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
