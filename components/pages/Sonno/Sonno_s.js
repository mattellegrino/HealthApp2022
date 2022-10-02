import { View, SafeAreaView, Text, StyleSheet, FlatList, StatusBar } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");

export default function Sonno_s({route}) {


  var selezioni = ["Giorno","Settimana","Mese"];

  const [isSelected, setIsSelected] = useState("Giorno");
  const [range_time,setRangeTime] = useState("");
  const [date,setDate] = useState(new Date);
  const [firstday,setFirstDay] = useState("");
  const [lastday,setLastDay] = useState("");
  const [monthdate,setMonthDate] = useState("");
  //Ore dormite
  const [num_hours_sleeped, setNumHoursSleeped] = useState("0:00");
  const [color_num_hours_sleeped, setColorNumHoursSleeped] = useState("red");
  //Numero sospensioni
  const [num_sospensions,setNumSospensions] = useState(0);
  //Ore sonno profondo
  const [num_hours_deepsleep,setNumHoursDeepsleep] = useState("0:00");
  //Cicli 
  const [num_ciclicompletati,setNumCicliCompletati] = useState(0);

  const handleselection = (selected) => {
    setIsSelected(selected);
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  const getday = (data) => {
    let day = padTo2Digits(data.getDate()) + "/" + padTo2Digits(parseInt(data.getMonth()+ Number(1))) + "/" + data.getFullYear();
    return day;
  }

  const getdayconvertible = (data) => {
    let day = data.getFullYear() + "-" + padTo2Digits(parseInt(data.getMonth()+ Number(1))) + "-" + padTo2Digits(data.getDate());
    return day;
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
    <View style={styles.container_main}>
      <CustomNavbar type={"sonno"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
        <View style={{flex:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
            <Ionicons name="chevron-back-outline" size={28} color="black" onPress={()=> minus()}></Ionicons>
                <Text style={s.header(4,"regular")}> {range_time} </Text>
            <Ionicons name="chevron-forward-outline" size={28} color="black" onPress={()=> plus()}></Ionicons>
        </View>

        <View style={styles.container_sleep}>
            <Text style={[s.header(4,"medium"),{textAlign:"center"}]}>Durata del sonno</Text>
            <Text style={s.header(1,"medium",color_num_hours_sleeped)}> {num_hours_sleeped} 
              <Text>h</Text>
            </Text>
        </View> 

        <View style={styles.container_sleep_details}>
            <View style={styles.container_suspensions}>

              <View style={{flex:1}}>
                <Text style={s.body("bold")}> {num_sospensions > 1 || num_sospensions == 0 ? "Sospensioni" : "Sospensione"} </Text>
              </View>

              <View style={{flex:1}}>
                <Text style={s.header(3,"regular")}> {num_sospensions} </Text>
              </View>

            </View>

            <View style={styles.container_deepsleep}>
              <Text style={[s.body("bold"),{ textAlign: "center"}]}>Sonno profondo</Text>
              <View style={styles.text_sleep}>
                <Text style={s.header(3,"regular")}> {num_hours_deepsleep}h</Text>
              </View>              
            </View>

            <View style={styles.container_suspensions}>
                <View style={{flex:1}}>
                 <Text style={[s.body("bold"),{ textAlign: "center"}]}>{num_ciclicompletati > 1 || num_ciclicompletati == 0 ? "Cicli completati" : "Ciclo completato"} </Text>
                </View>                               

                <View style={{flex:1}}>
                 <Text style={s.header(3,"regular")}> {num_ciclicompletati} </Text>
                </View>       
            </View>
        </View> 

        <View style={styles.container_empty}></View>        
    </View>
  );
}

const styles = StyleSheet.create({

    container_main: {
        flex:2,  
        backgroundColor:"white"
    },

    container_sleep: {
        flex:0.5,
        justifyContent:"center",
        alignItems: "center",
        borderRadius:20,
        borderWidth:1,
        borderColor:"lightgrey",
        margin:20,
        padding:20
    },
    container_sleep_details: {
        flex:1.5,
        padding:20,
        flexDirection: "row",
        justifyContent:"space-evenly"
    },

    container_suspensions: {

        flex:0,
        backgroundColor:"#fff",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 20,
        height:"60%",
        width:"30%",
        padding:10,
        borderWidth:2,
        borderColor:"lightgrey",

    },

    container_deepsleep: {
        flex:0,
        backgroundColor: "#E3F2FD",
        width:"30%",
        alignItems: "center",
        borderRadius: 20,
        padding:10,
        borderWidth:2,
        borderColor:"lightgrey",
      
    }, 

    text_sleep: {
      marginTop:"50%",
    },

    container_empty: {
        flex:1.5
    },

})
