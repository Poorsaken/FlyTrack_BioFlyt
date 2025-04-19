import React, { useEffect, useState, useCallback } from "react";
import { View , Text, TouchableOpacity, Image} from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { useApiUrl } from "../../UserContext/API";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
const ITEMS_PER_PAGE = 4;

const EmployeeTable = ({navigation, route}: any) => {
  const apiUrl = useApiUrl();
  const [page, setPage] = useState(0);
  const [dutyData, setDutyData] = useState<any[]>([]);



  const fetchDateDuty = async () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    console.log("Formatted Date:", formattedDate); // Log the formatted date
    try {
      const response = await axios.post(
        `${apiUrl}/api/attendance/alldate/employees`,
        { date: formattedDate }
      );

      console.log("Duty Records:", response.data);
      setDutyData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching duty records:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error fetching duty records:", error);
      }
    }
  };

   useFocusEffect(
     useCallback(() => {
       fetchDateDuty();
     }, [])
   );

  const from = page * ITEMS_PER_PAGE;
  const to = Math.min((page + 1) * ITEMS_PER_PAGE, dutyData.length);
  const paginatedData = dutyData.slice(from, to);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f7] p-4">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          className="w-8 h-8 m-2"
          source={require("../../assets/images/menu-bar.png")}
        />
      </TouchableOpacity>
      <View>
        <View className="border rounded-lg p-4 border-[#d1d5db] mb-4">
          <View className="mb-4">
            <Text className="text-lg font-medium">Daily Time Record</Text>
            {/* <Text className="text-md font-normal">Employ</Text> */}
          </View>

          <DataTable>
            <DataTable.Header className="bg-[#FAFAFA]">
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Employee ID</DataTable.Title>
              <DataTable.Title>Time In</DataTable.Title>
              <DataTable.Title>Time Out</DataTable.Title>
              <DataTable.Title>Duration</DataTable.Title>
              <DataTable.Title numeric>Breaks</DataTable.Title>
            </DataTable.Header>

            {paginatedData.map((item, index) => (
              <DataTable.Row key={index} className="bg-[#fff]">
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.employeeId}</DataTable.Cell>
                <DataTable.Cell>
                  <Text className="text-green-600">{item.timeIn || "-"}</Text>
                </DataTable.Cell>

                <DataTable.Cell>
                  <Text className="text-red-600">{item.timeOut || "-"}</Text>
                </DataTable.Cell>
                <DataTable.Cell>{item.duration || "-"}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Text className="text-amber-500">{item.breakCount}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(dutyData.length / ITEMS_PER_PAGE)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${from + 1}-${to} of ${dutyData.length}`}
              numberOfItemsPerPage={ITEMS_PER_PAGE}
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeTable;
