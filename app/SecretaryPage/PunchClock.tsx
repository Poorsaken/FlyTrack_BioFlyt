import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useApiUrl } from "../../UserContext/API";

const PunchClock = ({ navigation, route }: any) => {
  const apiUrl = useApiUrl();
  const { employee } = route.params || {};
  const [timeIn, setTimeIn] = useState<string | null>(null); 
  const [timeOut, setTimeOut] = useState<string | null>(null); 
  const [breakNow, setBreak] = useState<string[] | null>(null); 
  

  useEffect(() => {
    if (!employee?.employee_id) return;

    setTimeIn(null);
    setTimeOut(null);
    setBreak(null);

    getTimeIn();
    getTimeOut();
    getBreak();
  }, [employee?.employee_id]);

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


      getTimeOut();
    } catch (err) {
      console.log("Error in clocking out", err);
    }
  };

  const handleBreak = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/attendance/break`, {
        employee_id: employee.employee_id,
      });

      alert("Break recorded successfully!");
      console.log("Break response:", response.data);

      const breakValue = response.data.break_time || response.data.break_count; // Adjust based on API response
      setBreak(breakValue); // Update the break state

        getBreak();
    } catch (err) {
      console.log("Error in recording break", err);
    }
  };

  const getTimeOut = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/attendance/out/${employee.employee_id}`
      );
      console.log("Full Time Out Response:", response.data);

      const timeOutValue = response.data.time_out;
      if (timeOutValue) {
        setTimeOut(timeOutValue);
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

  const getBreak = async () => {
    console.log("employee id", employee.employee_id);
    try {
      const response = await axios.get(
        `${apiUrl}/api/attendance/break/${employee.employee_id}`
      );
      console.log("Full Break Response:", response.data);

      const breakTimes = response.data.break_times;
      if (breakTimes && breakTimes.length > 0) {
        setBreak(breakTimes); // Save all break times
      } else {
        console.log("No break times found");
      }
    } catch (err) {
      console.log(
        "Error fetching break",
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

        <View className="flex-1 flex-row my-2 space-x-2">
          <View className="flex-1 flex-row bg-white rounded-md p-2">
            <View className="w-[40%] bg-gray-500 rounded-md">
              <Image
                className="w-full h-full rounded-md"
                source={{ uri: employee.profile }}
              />
            </View>
            <View className="flex-1 p-4 flex-col justify-evenly">
              <Text className="text-[#B2B2B2] text-sm">
                {employee.employee_id}
              </Text>

              <Text className="text-[#B2B2B2]">Employee Name</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {employee.firstname} {employee.surname}
              </Text>

              <Text className="text-[#B2B2B2]">Job Title</Text>
              <Text className="text-[#1d1d1f] text-lg font-normal">
                {employee.jobTitle}
              </Text>

              <View className="flex-row flex">
                <View className="mr-5">
                  <Text className="text-[#B2B2B2]">Start Time</Text>
                  <Text className="text-green-600 text-sm font-normal">
                    {timeIn || "Not clocked in"}
                  </Text>
                </View>

                <View>
                  <Text className="text-[#B2B2B2]">Time Out</Text>
                  <Text className="text-red-600 text-sm font-normal">
                    {timeOut || "Not clocked out"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-[40%] bg-white rounded-md p-4">
            <Text className="text-[#B2B2B2]">Break Time</Text>
            {breakNow && breakNow.length > 0 ? (
              breakNow.map((time, index) => (
                <Text
                  key={index}
                  className="text-[#1d1d1f] text-lg font-normal"
                >
                  {time}
                </Text>
              ))
            ) : (
              <Text className="text-[#1d1d1f] text-lg font-normal">
                No breaks recorded
              </Text>
            )}
          </View>
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

          {timeOut || !timeIn ? (
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

          <TouchableOpacity
            className="flex-1 bg-[#FFA641] rounded-lg justify-center items-center"
            onPress={() => handleBreak()}
          >
            <Text className="text-center text-lg text-white">BREAK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PunchClock;
