import { View, SafeAreaView, Text, StyleSheet,Dimensions, FlatList, StatusBar,ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");
import { BarChart } from "react-native-gifted-charts";

export default function Sonno_s({route}) {

  const bardata = [
           {value: 250, label: 'M'},
            {value: 500, label: 'T', frontColor:'#177AD5'},
            {value: 745, label: 'W', frontColor: '#177AD5'},
            {value: 320, label: 'T'},
            {value: 600, label: 'F', frontColor: '#177AD5'},
            {value: 256, label: 'S'},
            {value: 300, label: 'S'},
        ];

  const bardataweek = [
          {value: 250, label: 'Lun'},
           {value: 500, label: 'Mar', frontColor:'#177AD5'},
           {value: 745, label: 'Mer', frontColor: '#177AD5'},
           {value: 320, label: 'Gio'},
           {value: 600, label: 'Ven', frontColor: '#177AD5'},
           {value: 256, label: 'Sab'},
           {value: 300, label: 'Dom'},
       ];

  const bardatamonth = [
          {value: 250, label: '1'},
           {value: 500, label: '2', frontColor:'#177AD5'},
           {value: 745, label: '3', frontColor: '#177AD5'},
           {value: 320, label: '4'},
           {value: 600, label: '5', frontColor: '#177AD5'},
           {value: 256, label: '6'},
           {value: 300, label: '7'},
           {value: 250, label: '8'},
           {value: 500, label: '9', frontColor:'#177AD5'},
           {value: 745, label: '10', frontColor: '#177AD5'},
           {value: 320, label: '11'},
           {value: 600, label: '12', frontColor: '#177AD5'},
           {value: 256, label: '13'},
           {value: 300, label: '14'},
           {value: 250, label: '15'},
           {value: 500, label: '16', frontColor:'#177AD5'},
           {value: 745, label: '17', frontColor: '#177AD5'},
           {value: 320, label: '18'},
           {value: 600, label: '19', frontColor: '#177AD5'},
           {value: 256, label: '20'},
           {value: 300, label: '21'},
           {value: 250, label: '22'},
           {value: 500, label: '23', frontColor:'#177AD5'},
           {value: 745, label: '24', frontColor: '#177AD5'},
           {value: 320, label: '25'},
           {value: 600, label: '26', frontColor: '#177AD5'},
           {value: 256, label: '27'},
           {value: 300, label: '28'},
       ];     
    
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
     <ScrollView style={{flex:1}}>
      <CustomNavbar type={"sonno"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
        <View style={styles.container_rangetime}>
            <Ionicons name="chevron-back-outline" size={28} color="black" onPress={()=> minus()}></Ionicons>
                <Text style={s.body("medium")}> {range_time} </Text>
            <Ionicons name="chevron-forward-outline" size={28} color="black" onPress={()=> plus()}></Ionicons>
        </View>

        <View style={styles.container_sleep}>
            <Text style={[s.header(4,"medium"),{textAlign:"center"}]}>Durata del sonno</Text>
           <View style={{flex: 0, flexDirection: "row",alignItems: "baseline"}}>
            <Text style={[s.header(1,"medium",color_num_hours_sleeped),{marginRight:"2%"}]}> {num_hours_sleeped}</Text>
             <Text style={s.body("medium")}>h{isSelected != "Giorno" && <Text>/giorno</Text>}</Text>
           </View>  
        </View> 

        {isSelected != "Giorno" && 
        (<View style={{height:"40%"}}>
          <Text>Ore sonno</Text>
         <BarChart 
            data={isSelected == "Settimana" ? bardataweek : bardatamonth}
            spacing={isSelected == "Settimana" ? 30 : 10}
            roundedTop
            initialSpacing = {5}
            noOfSections={3}
            barWidth={isSelected == "Settimana" ? 20 : 12}
            />
        </View>)}
        

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
    </ScrollView>
  </View>  
  );
}


const styles = StyleSheet.create({

  
    container_main: {
        flex: 1,
        backgroundColor:"white"
    },

    container_sleep: {
        flex: 0.5,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor:"#fff",
        borderRadius:15,
        borderWidth:2,
        borderColor:"lightgrey",
        margin:10,
        padding:10
    },

    container_sleep_details: {
        flex: 1,
        backgroundColor: "#fff",
        height:230,
        padding:20,
        marginTop:10,
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

    container_rangetime: {
      flex:0.5,
      margin:10,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row"
    },


    text_sleep: {
      marginTop:"50%",
    }

})
