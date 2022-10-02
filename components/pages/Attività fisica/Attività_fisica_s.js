import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function Attività_fisica_s({route}) {
  var selezioni = ["Giorno", "Settimana", "Mese"];
  var labels_per_day = ["00:00","6:00","12:00","18:00","22:59"];
  var labels_per_week = ["lun","mar","mer","gio","ven","sab","dom"];
  
  var data_per_day = [200, 140,30,50, 45, 28, 80, 99, 43,200, 140,30,50, 45, 28, 80, 99, 43];
  var data_per_week = [2200, 1240, 3000,5033, 4500, 2800, 8000];

  const {data} = route.params;

  const [isSelected, setIsSelected] = useState("Giorno");
  const [range_time,setRangeTime] = useState("");
  const handleselection = (selected) => {
    setIsSelected(selected);
  };

  const getday = (data) => {
    let day = data.getDate() + "/" + parseInt(data.getMonth()+ Number(1)) + "/" + data.getFullYear();

    return day;
  }

  useEffect(() => {

    
    switch (isSelected) {

      case "Giorno": 
      let range_giorno = getday(data);
      setRangeTime(range_giorno);
      break;
      
      case "Settimana": 
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        
        let firstday = new Date(curr.setDate(first));
        let lastday = new Date(curr.setDate(last));
        
        let firstday_string = getday(firstday);
        let lastday_string = getday(lastday);
        setRangeTime(firstday_string + " - " + lastday_string);
      break;

      case "Mese":
        setRangeTime(data.getMonth() + "/" + data.getFullYear());
        break;
       default: 

       var rangetime = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
       setRangeTime(rangetime);
    }
   
  },[isSelected])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
     <View style={{flex:0.5}}>
      <CustomNavbar
        type={"attività"}
        isSelected={isSelected}
        selezioni={selezioni}
        handleselection={handleselection}
      ></CustomNavbar>
      </View> 
      <View style={{flex:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
      <Ionicons name="chevron-back-outline" size={24} color="black"></Ionicons>
      <Text style={s.body("medium")}> {range_time} </Text>
      <Ionicons name="chevron-forward-outline" size={24} color="black"></Ionicons>
      </View>
      <View style={{flex:1, flexDirection: "row",justifyContent:"center",alignItems: "center"}}>
        <View style={{flex:0,alignItems: "center"}}>
        <ProgressChart
                  data={[0.8]}
                  width={Dimensions.get("screen").width/3}
                  height={Dimensions.get("screen").height/7}
                  strokeWidth={8}
                  radius={50}
                  hideLegend={true}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 139, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
          <Text style={[s.header(3,"bold"),{position:"absolute", top:"22%", color:"#008b00"}]}> 7898 </Text>
         </View>
         <View style={{flex:0}}>
          <Text style={s.header(4,"regular")}>Passi/giorno</Text>
         </View>
      </View>
      <BarChart
        data={{
          labels: isSelected == "Giorno" ? labels_per_day : labels_per_week,
          datasets: [
            {
              data: isSelected == "Giorno" ? data_per_day : data_per_week
            },
          ],
        }}
        width={Dimensions.get("window").width-16}
        height={220}
        yAxisLabel={""}
        withInnerLines={false}
        showBarTops={false}
        fromZero={true}
        chartConfig={{
          barPercentage: isSelected == "Giorno" ? 0.2 : 0.5,
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          fillShadowGradientFrom: "#c6f68d",
          fillShadowGradientTo: "#c6f68d",
          fillShadowGradientFromOpacity: 4,
          fillShadowGradientToOpacity: 4,
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          flex:2,
          padding:0,
          marginVertical: 0,
          borderRadius: 17,
          right:12
        }}
      />
    </View>
  );
}
