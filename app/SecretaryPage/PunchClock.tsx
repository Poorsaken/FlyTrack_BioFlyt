import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useApiUrl } from "../../UserContext/API";

const PunchClock = ({ navigation, route }: any) => {
  const apiUrl = useApiUrl();
  const { employee } = route.params || {};
  const [timeIn, setTimeIn] = useState<string | null>(null); // State to store time in
  const [timeOut, setTimeOut] = useState<string | null>(null); // State to store time out

     useEffect(() => {
       setTimeIn(null); // Reset timeIn when employee changes
       getTimeIn();
     }, [employee.employee_id]);
     
     useEffect(() => {
       setTimeOut(null); 
       getTimeOut();
     }, [employee.employee_id]);

  console.log("params received from secretary page", employee);

  const handleCLockIn = async () => {
    console.log("employee id", employee.employee_id);
    try {
      const response = await axios.post(`${apiUrl}/api/attendance/in`, {
        employee_id: employee.employee_id,
      });

      alert("Clocked in successfully!");
      console.log("clock in response:", response.data);

      getTimeIn(); 
    } catch (err) {
      console.log("Error in clocking in", err);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/attendance/out`, {
        employee_id: employee.employee_id,
      });

      alert("Clocked out successfully!");
      console.log("clock out response:", response.data);

      getTimeOut(); // Fetch the time out after clocking out
    } catch (err) {
      console.log("Error in clocking out", err);
    }
  };

  const getTimeOut = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/attendance/out/${employee.employee_id}`
      );
      console.log("Full Time Out Response:", response.data);

      const timeOutValue = response.data.time_out; // Use the raw time from the response
      if (timeOutValue) {
        setTimeOut(timeOutValue); // Set the raw time in the state
      } else {
        console.log("Time Out value not found in response");
      }
    } catch (err) {
      console.log(
        "Error fetching time out",
        (err as any).response?.data || (err as any).message
      );
    }
  };

 const getTimeIn = async () => {
   try {
     const response = await axios.get(
       `${apiUrl}/api/attendance/in/${employee.employee_id}`
     );

     console.log("Full Time In Response:", response.data);

     const timeInValue = response.data.time_in; 
     if (timeInValue) {
       setTimeIn(timeInValue); 
     } else {
       console.log("Time In value not found in response");
     }
   } catch (err) {
     console.log(
       "Error fetching time in",
       (err as any).response?.data || (err as any).message
     );
   }
 };






  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f5f5f7] p-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-md flex flex-row items-center"
        >
          <Image source={require("../../assets/images/ep_back.png")} />
          <Text className="text-[#09A214] px-2">Go Back</Text>
        </TouchableOpacity>

        {/* Wrapper */}
        <View className="flex-1 flex-row my-2 space-x-2">
          <View className="flex-1 flex-row bg-white rounded-md p-2">
            <View className="w-[40%] bg-gray-500 rounded-md">
              <Image
                className="w-full h-full rounded-md"
                source={{ uri: employee.profile }}
              />
            </View>
            <View className="flex-1 p-4">
              <Text className="text-[#B2B2B2]">Employee Name</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {employee.firstname} {employee.surname}
              </Text>

              <Text className="text-[#B2B2B2]">Job Title</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {employee.jobTitle}
              </Text>

              {/* Display the time in value */}
              <Text className="text-[#B2B2B2]">Time In</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {timeIn || "Not clocked in"}
              </Text>
              <Text className="text-[#B2B2B2]">Time Out</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {timeOut || "Not clocked out"}
              </Text>
            </View>
          </View>
          <View className="w-[40%] bg-white rounded-md"></View>
        </View>

        {/* Wrapper 2 */}
        <View className="flex-1 flex-row">
          {timeIn ? (
            <>
              <TouchableOpacity
                className="flex-1 bg-[#575757] rounded-lg justify-center items-center"
                onPress={() => handleCLockIn()}
                disabled={true}
                style={{ opacity: 0.5 }}
              >
                <Text className="text-center text-lg text-white">
                  CLOCKED IN
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                className="flex-1 bg-[#26AC30] rounded-lg justify-center items-center"
                onPress={() => handleCLockIn()}
              >
                <Text className="text-center text-lg text-white">CLOCK IN</Text>
              </TouchableOpacity>
            </>
          )}

          {timeOut ? (
            <>
              <TouchableOpacity
                className="flex-1 bg-[#FF0000] mx-2 rounded-lg justify-center items-center"
                onPress={() => handleClockOut()}
                disabled={true}
                style={{ opacity: 0.5 }}
              >
                <Text className="text-center text-lg text-white">
                  CLOCKED OUT
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                className="flex-1 bg-[#FF0000] mx-2 rounded-lg justify-center items-center"
                onPress={() => handleClockOut()}
              >
                <Text className="text-center text-lg text-white">
                  CLOCK OUT
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity className="flex-1 bg-[#FFA641] rounded-lg justify-center items-center">
            <Text className="text-center text-lg text-white">BREAK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PunchClock;
