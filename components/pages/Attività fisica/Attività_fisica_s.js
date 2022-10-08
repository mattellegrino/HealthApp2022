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

  const [date,setDate] = useState(new Date);
  const [firstday,setFirstDay] = useState("");
  const [lastday,setLastDay] = useState("");
  const [isSelected, setIsSelected] = useState("Giorno");
  const [range_time,setRangeTime] = useState("");
  const [monthdate,setMonthDate] = useState("");
  const handleselection = (selected) => {
    setIsSelected(selected);
  };

  const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

  const getday = (data) => {
    let day = data.getDate() + "/" + parseInt(data.getMonth()+ Number(1)) + "/" + data.getFullYear();

    return day;
  }
  const getdayconvertible = (data) => {
    let day = data.getFullYear() + "-" + padTo2Digits(parseInt(data.getMonth()+ Number(1))) + "-" + padTo2Digits(data.getDate());
    return day;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const plus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var dayafter = new Date (getdayconvertible(date));
        dayafter.setDate(date.getDate() + 1);
        setRangeTime (getday(dayafter));
        setDate(dayafter);
        break;

      }

      case "Settimana" : {

        var firstdayafter = new Date (getdayconvertible(firstday));
        firstdayafter.setDate(lastday.getDate() + 1);
        var lastdayafter = new Date (getdayconvertible(lastday));
        lastdayafter.setDate(lastday.getDate() + 7);
        let firstday_string = getday(firstdayafter);
        let lastday_string = getday(lastdayafter);
        console.log(firstday_string + " " + lastday_string);
        setRangeTime(firstday_string + " - " + lastday_string);
        setLastDay(lastdayafter);
        setFirstDay(firstdayafter);
        break;
      }

      case "Mese" : {
  
        var monthafter = new Date (getdayconvertible(monthdate));
        monthafter.setMonth(monthdate.getMonth() + 1);
        setRangeTime(padTo2Digits(parseInt(monthafter.getMonth()+ Number(1))) + "/" + monthafter.getFullYear());
        setMonthDate(monthafter);
        break;
      }

    }
  }

  const minus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var daybefore = new Date (getdayconvertible(date));
        daybefore.setDate(date.getDate() - 1);
        setRangeTime (getday(daybefore));
        setDate(daybefore);
        break;
      }

      case "Settimana" : {

        var firstdayafter = new Date (getdayconvertible(firstday));
        firstdayafter.setDate(firstday.getDate() - 7);
        setFirstDay(firstdayafter);
        var lastdayafter = new Date (getdayconvertible(lastday));
        lastdayafter.setDate(lastday.getDate() - 7);
        setLastDay(lastdayafter);
        let firstday_string = getday(firstdayafter);
        let lastday_string = getday(lastdayafter);
        setRangeTime(firstday_string + " - " + lastday_string);
        break;
      }

      case "Mese" : {

        var monthbefore = new Date (getdayconvertible(monthdate));
        monthbefore.setMonth(monthdate.getMonth() - 1);
        setRangeTime(padTo2Digits(parseInt(monthbefore.getMonth()+ Number(1))) + "/" + monthbefore.getFullYear());
        setMonthDate(monthbefore);
        break;
        
      }
      
    }
  }

  useEffect(() => {
    var tmpdate = new Date;
    setDate(tmpdate);
    setMonthDate(tmpdate);
    let range_giorno = getday(tmpdate);
    setRangeTime(range_giorno);
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    let firstday = new Date(curr.setDate(first));
    setFirstDay(firstday);
    let lastday = new Date(curr.setDate(last));
    setLastDay(lastday);

  },[])

  useEffect(() => {

    console.log("isSelected:" + isSelected);

    if(date != ""){
    switch (isSelected) {

      case "Giorno": 
      let range_giorno = getday(date);
      setRangeTime(range_giorno);
      break;
      
      case "Settimana": 

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        
        let firstday = new Date(curr.setDate(first));
        setFirstDay(firstday);
        let lastday = new Date(curr.setDate(last));
        setLastDay(lastday);
        
        let firstday_string = getday(firstday);
        let lastday_string = getday(lastday);
        setRangeTime(firstday_string + " - " + lastday_string);
       break;

      case "Mese":
        setRangeTime(padTo2Digits(parseInt(monthdate.getMonth()+ Number(1))) + "/" + date.getFullYear());
        break;
    
    }
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
        <Ionicons name="chevron-back-outline" size={24} color="black" onPress={()=> minus()}></Ionicons>
          <Text style={s.body("medium")}> {range_time} </Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" onPress={()=> plus()}></Ionicons>
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
