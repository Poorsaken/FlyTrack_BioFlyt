import React from "react";
import { Button, Text, View } from "react-native";

export default function Index({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-5xl text-blue-700">Expo + Nativewind</Text>

      <Button title="GO TO LOGIN" onPress={()=> navigation.navigate('Login')} />
    </View>
  );
}
