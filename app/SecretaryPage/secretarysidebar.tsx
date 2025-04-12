
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useApiUrl } from "../../UserContext/API";


const SidebarSecretary = ({navigation}:any) => {

  
    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, []);
  return (
    <View className="flex-1 justify-center items-center bg-slate-600 w-full">

  
        
        <View>

        <Text>this is sidebar</Text>
        </View>

        

    </View>
  );
};

export default SidebarSecretary;