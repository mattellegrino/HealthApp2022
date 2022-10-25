import { View, SafeAreaView, Text, StyleSheet,Dimensions, FlatList, StatusBar,ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");
import { BarChart } from "react-native-gifted-charts";

export default function Sonno_c({navigation,route}) {

  const mockbardataday = {
    date: "2022-06-21",
    time_ms: 22300000
}


  const mockbardataweek = [
          {value: 22300000, label: 'LUN'},
           {value: 42300000, label: 'MAR', frontColor:'#177AD5'},
           {value: 32300000, label: 'MER', frontColor: '#177AD5'},
           {value: 12300000, label: 'GIO'},
           {value: 32300000, label: 'VEN', frontColor: '#177AD5'},
           {value: 36300000, label: 'SAB'},
           {value: 22300000, label: 'DOM'},
       ];

  const mockbardatamonth = [
           {value: 22300000, label: '1'},
           {value: 22300000, label: '2', frontColor:'#177AD5'},
           {value: 12300000, label: '3', frontColor: '#177AD5'},
           {value: 12300000, label: '4'},
           {value: 12300000, label: '5', frontColor: '#177AD5'},
           {value: 42300000, label: '6'},
           {value: 12300000, label: '7'},
           {value: 32300000, label: '8'},
           {value: 12300000, label: '9', frontColor:'#177AD5'},
           {value: 12300000, label: '10', frontColor: '#177AD5'},
           {value: 22300000, label: '11'},
           {value: 12300000, label: '12', frontColor: '#177AD5'},
           {value: 12300000,label: '13'},
           {value: 12300000, label: '14'},
           {value: 32300000, label: '15'},
           {value: 12300000, label: '16', frontColor:'#177AD5'},
           {value: 17300000, label: '17', frontColor: '#177AD5'},
           {value: 22300000,label: '18'},
           {value: 12300000, label: '19', frontColor: '#177AD5'},
           {value: 12300000, label: '20'},
           {value: 19300000,label: '21'},
           {value: 12300000, label: '22'},
           {value: 12300000, label: '23', frontColor:'#177AD5'},
           {value: 41230000,label: '24', frontColor: '#177AD5'},
           {value: 12300000, label: '25'},
           {value: 32300000, label: '26', frontColor: '#177AD5'},
           {value: 27300000, label: '27'},
           {value: 12300000, label: '28'},
       ];     
    
  var selezioni = ["Giorno","Settimana","Mese"];
  
  const date = new Date();
  const [isSelected, setIsSelected] = useState("Giorno");
  const [firstTime,setFirstTime] = useState(false);
  const [range_time,setRangeTime] = useState("");
  const [variableGiornoDate,setVariableGiornoDate] = useState("");
  const [variableFirstWeekDay,setVariableFirstWeekDay] = useState("");
  const [variableLastWeekDay,setVariableLastWeekDay] = useState("");
  const [variableMonthDate,setVariableMonthDate] = useState("");
  const [firstWeekDay,setFirstWeekDay] = useState("");
  const [lastWeekDay,setLastWeekDay] = useState("");
  const [firstMonthDay,setFirstMonthDay] = useState("");
  const [lastMonthDay,setLastMonthDay] = useState("");
  const [firstVariableMonthDay,setVariableFirstMonthDay] = useState("");
  const [lastVariableMonthDay,setVariableLastMonthDay] = useState("");
  const [monthdate,setMonthDate] = useState("");
  const [sleepdata,setSleepData] = useState([]);
  const [bardataday,setBarDataDay] = useState("");
  const [bardataweek,setBarDataWeek] = useState([]);
  const [bardatamonth,setBarDataMonth] = useState([]);
  const [redthreshold,setRedThreshold] = useState(5);
  const [orangethreshold,setOrangeThreshold] = useState(6);
  const [yellowthreshold,setYellowThreshold] = useState(7.30);
  //Ore dormite
  const [num_hours_sleeped, setNumHoursSleeped] = useState(route.params.hours_sleeped);
  const [color_num_hours_sleeped, setColorNumHoursSleeped] = useState("red");
  //Numero sospensioni
  const [num_sospensions,setNumSospensions] = useState(0);
  //Ore sonno profondo
  const [num_hours_deepsleep,setNumHoursDeepsleep] = useState(0);
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

  function formatDate(data) {
    let d = data,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

  const plus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var dayafter = new Date (getdayconvertible(variableGiornoDate));
        dayafter.setDate(variableGiornoDate.getDate() + 1);
        let dayafterforapi = formatDate(dayafter);
        //Inserire API per sonno giornaliero: /api/patients/{patientID}/sleep/duration (startDate=dayafterforapi, endDate=dayafterforapi)
        setRangeTime (getday(dayafter));
        setVariableGiornoDate(dayafter);
        break;

      }

      case "Settimana" : {

        var firstdayafter = new Date (getdayconvertible(variableLastWeekDay));
        firstdayafter.setDate(variableLastWeekDay.getDate() + 1);
        let firstdayafterforapi = formatDate(firstdayafter);
        var lastdayafter = new Date (getdayconvertible(variableLastWeekDay));
        lastdayafter.setDate(variableLastWeekDay.getDate() + 7);
        let lastdayafterforapi = formatDate(lastdayafter);

        
        let firstday_string = getday(firstdayafter);
        let lastday_string = getday(lastdayafter);

        //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayafterforapi, endDate=lastdayafterforapi)

        setVariableFirstWeekDay(firstdayafter);
        setVariableLastWeekDay(lastdayafter);
        setRangeTime(firstday_string + " - " + lastday_string);
        break;
      }

      case "Mese" : {
  
        var monthafter = new Date (getdayconvertible(variableMonthDate));
        monthafter.setMonth(variableMonthDate.getMonth() + 1);
        setVariableFirstMonthDay(new Date(monthafter.getFullYear(), monthafter.getMonth(), 1));
        setVariableLastMonthDay(new Date(monthafter.getFullYear(), monthafter.getMonth() + 1, 0));
        setRangeTime(padTo2Digits(parseInt(monthafter.getMonth()+ Number(1))) + "/" + monthafter.getFullYear());
        setVariableMonthDate(monthafter);
        break;
      }

    }
  }

  const minus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var daybefore = new Date (getdayconvertible(variableGiornoDate));
        daybefore.setDate(variableGiornoDate.getDate() - 1);
        setRangeTime (getday(daybefore));
        setVariableGiornoDate(daybefore);
        break;
      }

      case "Settimana" : {

        var firstdaybefore = new Date (getdayconvertible(variableFirstWeekDay));
        firstdaybefore.setDate(variableFirstWeekDay.getDate() - 7);
        let firstdaybeforeforapi = formatDate(firstdaybefore);
        setVariableFirstWeekDay(firstdaybefore);
        var lastdaybefore = new Date (getdayconvertible(variableLastWeekDay));
        lastdaybefore.setDate(variableLastWeekDay.getDate() - 7);
        let lastdaybeforeforapi = formatDate(lastdaybefore);
        setVariableLastWeekDay(lastdaybefore);
        let firstday_string = getday(firstdaybefore);
        let lastday_string = getday(lastdaybefore);

        //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayafterforapi, endDate=lastdayafterforapi)

        setRangeTime(firstday_string + " - " + lastday_string);
        break;
      }

      case "Mese" : {

        var monthbefore = new Date (getdayconvertible(variableMonthDate));
        monthbefore.setMonth(variableMonthDate.getMonth() - 1);
        setVariableFirstMonthDay(new Date(monthbefore.getFullYear(), monthbefore.getMonth(), 1));
        setVariableLastMonthDay(new Date(monthbefore.getFullYear(), monthbefore.getMonth() + 1, 0));
        setRangeTime(padTo2Digits(parseInt(monthbefore.getMonth()+ Number(1))) + "/" + monthbefore.getFullYear());
        setVariableMonthDate(monthbefore);
        break;
        
      }
      
    }
  }

  const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    minutes = minutes / 100;

    let total = parseInt(hours) + parseInt(minutes);
    return total;
}


  useEffect(() => {

  },[variableGiornoDate])

 
  useEffect(() => {

    let dateforapi = formatDate(date); //variabile da inserire nell'API per ricavare il sonno giornaliero
    // data odierna, non va MAI cambiata
    // inizializzo date che poi vengono cambiate quando si va avanti/indietro con le frecce
    setVariableGiornoDate(date);
    setVariableMonthDate(date);
    setMonthDate(date);
    

    let range_giorno = getday(date);
    setRangeTime(range_giorno);
    let dayformattedtime = formatTime(mockbardataday.time_ms).toPrecision(3);
    //setNumHoursSleeped(dayformattedtime);
    setBarDataDay(dayformattedtime);
    setFirstTime(true);

    if(dayformattedtime < redthreshold)
    setColorNumHoursSleeped("red");
 
   else if(dayformattedtime >= redthreshold && dayformattedtime < orangethreshold)
    setColorNumHoursSleeped("orange");
 
   else if(dayformattedtime >= orangethreshold && dayformattedtime < yellowthreshold)
    setColorNumHoursSleeped("#FFEA00");
 
   else if (dayformattedtime >= yellowthreshold)
    setColorNumHoursSleeped("green");
    
    //inizializzo primo e ultimo giorno della settimana 
    let currdate = new Date ();
    var first = currdate.getDate() - currdate.getDay(); 
    var last = first + 6; 
    let firstweekday = new Date(currdate.setDate(first));
    setFirstWeekDay(firstweekday);
    setVariableFirstWeekDay(firstweekday);
    let lastweekday = new Date(currdate.setDate(last));
    setLastWeekDay(lastweekday);
    setVariableLastWeekDay(lastweekday);

    let firstmonthday = new Date(date.getFullYear(), date.getMonth(), 1);
    setFirstMonthDay(firstmonthday);
    setVariableFirstMonthDay(firstmonthday);
    let lastmonthday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setLastMonthDay(lastmonthday);
    setVariableLastMonthDay(lastmonthday);

    let _bardataweek = mockbardataweek.map((el) => {
      
       el.value = formatTime(el.value);
       if(el.value < redthreshold)
        el.frontColor = "red";
  
       else if(el.value >= redthreshold && el.value < orangethreshold)
        el.frontColor = "orange";

       else if(el.value >= orangethreshold && el.value <yellowthreshold)
       el.frontColor = "#FFEA00";

       else if (el.value >= yellowthreshold)
        el.frontColor = "green";

      return el;
    
    })

    setBarDataWeek(_bardataweek);

    let _bardatamonth = mockbardatamonth.map((el) => {
      
      el.value = formatTime(el.value);

      if(el.value < redthreshold)
       el.frontColor = "red";

      else if(el.value >= redthreshold && el.value < orangethreshold)
       el.frontColor = "orange";

      else if(el.value >= orangethreshold && el.value <yellowthreshold)
      el.frontColor = "#FFEA00";

      else if (el.value >= yellowthreshold)
       el.frontColor = "green";

     return el;
   
   })
    
   setBarDataMonth(_bardatamonth);


    //Inserire API per sonno giornaliero: /api/patients/{patientID}/sleep/duration (startDate=dateforapi, endDate=dateforapi)
    // setBarDataDay con il valore proveniente dall'API



  },[])

  useEffect(() => {

    switch (isSelected) {
      case "Giorno": 
  
      let range_giorno = getday(date);
      setRangeTime(range_giorno);

      if(bardataday)
      setNumHoursSleeped(bardataday);

      if(bardataday < redthreshold)
      setColorNumHoursSleeped("red");

     else if(bardataday >= redthreshold && bardataday < orangethreshold)
      setColorNumHoursSleeped("orange");

     else if(bardataday >= orangethreshold && bardataday < yellowthreshold)
      setColorNumHoursSleeped("#FFEA00");

     else if (bardataday >= yellowthreshold)
      setColorNumHoursSleeped("green");
      break;
      
      case "Settimana": 
   
        let firstdayforapi = formatDate(firstWeekDay);
        let lastdayforapi = formatDate(lastWeekDay);

        let firstday_string = getday(firstWeekDay);
        let lastday_string = getday(lastWeekDay);
        setRangeTime(firstday_string + " - " + lastday_string);

        let sum = 0;
        bardataweek.forEach((el) => {
          sum = sum + el.value;
        });
        let average_week_sleep_hours = sum/bardataweek.length;

        setNumHoursSleeped(average_week_sleep_hours.toFixed(2).toString());

        if(average_week_sleep_hours < redthreshold)
          setColorNumHoursSleeped("red");

         else if(average_week_sleep_hours >= redthreshold && average_week_sleep_hours < orangethreshold)
          setColorNumHoursSleeped("orange");
   
         else if(average_week_sleep_hours >= orangethreshold && average_week_sleep_hours <yellowthreshold)
          setColorNumHoursSleeped("#FFEA00");
   
         else if (average_week_sleep_hours >= yellowthreshold)
          setColorNumHoursSleeped("green");
        
        //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayforapi, endDate=lastdayforapi)
       break;

      case "Mese":
        setRangeTime(padTo2Digits(parseInt(date.getMonth()+ Number(1))) + "/" + date.getFullYear());

        let summonth = 0;
        bardatamonth.forEach((el) => {
          summonth = summonth + el.value;
        });
        let average_month_sleep_hours = summonth/bardatamonth.length;

        setNumHoursSleeped(average_month_sleep_hours.toFixed(2).toString());
        
        if(average_month_sleep_hours < redthreshold)
          setColorNumHoursSleeped("red");

         else if(average_month_sleep_hours >= redthreshold && average_month_sleep_hours < orangethreshold)
          setColorNumHoursSleeped("orange");
   
         else if(average_month_sleep_hours >= orangethreshold && average_month_sleep_hours <yellowthreshold)
          setColorNumHoursSleeped("#FFEA00");
   
         else if (average_month_sleep_hours >= yellowthreshold)
          setColorNumHoursSleeped("green");
        
        break;
    
    
  }},[isSelected])


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
          <Text style={[s.body("regular","black")]}>Durata del sonno</Text>
            <View style={styles.details_sleep}>
            
              <View style={styles.hours_sleep}>
                <Text style={[s.header(1,"bold","black"),{marginRight:"2%"}]}> {num_hours_sleeped}</Text>
                <Text style={s.body("medium","black")}>h{isSelected != "Giorno" && <Text>/giorno</Text>}</Text>
              </View>
            
              <View style={styles.threshold_sleep_container}>
                <View style={styles.container_segnalatori}><View style={styles.circle(color_num_hours_sleeped == "red" ? "red" : "transparent")}></View><Text style={[s.smalltext(color_num_hours_sleeped == "red" ? "medium" :"regular",color_num_hours_sleeped == "red" ? "red" : "black"),{textAlign: "center"}]}>Scarso</Text></View>
                <View style={styles.container_segnalatori}><View style={styles.circle(color_num_hours_sleeped == "orange" ? "orange" : "transparent")}></View><Text style={[s.smalltext(color_num_hours_sleeped == "orange" ? "medium" :"regular",color_num_hours_sleeped == "orange" ? "orange" : "black"),{textAlign: "center"}]}>Discreto</Text></View>
                <View style={styles.container_segnalatori}><View style={styles.circle(color_num_hours_sleeped == "#FFEA00" ? "#FFEA00" : "transparent")}></View><Text style={[s.smalltext(color_num_hours_sleeped == "#FFEA00" ? "medium" :"regular",color_num_hours_sleeped == "#FFEA00" ? "#FFEA00" : "black"),{textAlign: "center"}]}>Buono</Text></View>
                <View style={styles.container_segnalatori}><View style={styles.circle(color_num_hours_sleeped == "green" ? "green" : "transparent")}></View><Text style={[s.smalltext(color_num_hours_sleeped == "green" ? "medium" :"regular",color_num_hours_sleeped == "green" ? "green" : "black"),{textAlign: "center"}]}>Ottimo</Text></View>
              </View>  
           </View>  
        </View> 

        {isSelected != "Giorno" && 
        (<View style={{height:"40%"}}>
          <View style={{marginLeft:15,marginBottom:10}}>
            <Text style={s.body("medium")}>Ore sonno</Text>
          </View>
         <BarChart 
            data={isSelected == "Settimana" ? bardataweek : isSelected =="Giorno" ? bardataday : bardatamonth}
            spacing={isSelected == "Settimana" ? 30 : 10}
            barBorderRadius={4}
            initialSpacing = {5}
            noOfSections={3}
            maxValue={10}
            yAxisThickness={0}
            xAxisThickness={0}
            barWidth={isSelected == "Settimana" ? 20 : 11}
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
        borderRadius:20,
        backgroundColor:"#ACC8E5",
        borderColor:"#1565C0",
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
        backgroundColor: "#ACC8E5",
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
    },

    details_sleep: {
      flexDirection: "row",
      justifyContent:"space-between",
      alignItems: "baseline"
    },

    hours_sleep: {
      flexDirection: "row",
      alignItems: "baseline"
    },

    threshold_sleep_container: {
      flex:0, 
      flexDirection: "row"

    },

    container_segnalatori: {
      flex:0, 
      alignItems: "center",
      justifyContent:"center",
      marginLeft:15,
    },

    circle: color => ({
      height: 30, 
      width: 30, 
      backgroundColor : color,
      borderRadius: 50,
      borderColor: color != "transparent" ? color : "black",
      borderWidth: 1
    })

})
