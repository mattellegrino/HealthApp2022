import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");
import { BarChart, PieChart } from "react-native-gifted-charts";
import {
  ProgressChart
} from "react-native-chart-kit";

export default function Attività_fisica_s({route}) {

  const mockbardataday = {
    date: "2022-06-21",
    steps: 2200
}

  const mockbardataweek = [
    {steps: 2000, date: '2022-06-20'},
    {steps: 3000, date: '2022-06-21'},
    {steps: 300, date: '2022-06-22'}, 
    {steps: 2000, date: '2022-06-23'},
    {steps: 12000, date: '2022-06-24'}, 
    {steps: 3000, date: '2022-06-25'},
    {steps: 2000, date: '2022-06-26'},
];

const mockbardatamonth = [
    {steps: 2200, date: '2022-06-1'},
    {steps: 3000, date: '2022-06-2'},
    {steps: 12300,date: '2022-06-3'}, 
    {steps: 12300,date: '2022-06-4'},
    {steps: 1200, date: '2022-06-5'},
    {steps: 3000, date: '2022-06-6'},
    {steps: 12300,date: '2022-06-7'},
    {steps: 3230, date: '2022-06-8'},
    {steps: 1230, date: '2022-06-9'},
    {steps: 1230, date: '2022-06-10'},
    {steps: 2230, date: '2022-06-11'},
    {steps: 1230, date: '2022-06-12'},
    {steps: 1230, date: '2022-06-13'},
    {steps: 1230, date: '2022-06-14'},
    {steps: 320,  date: '2022-06-15'},
    {steps: 12300,date: '2022-06-16'},    
    {steps: 17000,date: '2022-06-17'}, 
    {steps: 2000, date: '2022-06-18'},
    {steps: 3200, date: '2022-06-19'}, 
    {steps: 30000,date: '2022-06-20'},
    {steps: 10000,date: '2022-06-21'},
    {steps: 1000, date: '2022-06-22'},
    {steps: 1000, date: '2022-06-23'}, 
    {steps: 30000,date: '2022-06-24'}, 
    {steps: 1230, date: '2022-06-25'},
    {steps: 3230, date: '2022-06-26'}, 
    {steps: 2730, date: '2022-06-27'},
    {steps: 1230, date: '2022-06-28'},
];   


  var selezioni = ["Giorno", "Settimana", "Mese"];

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
  const [redthreshold,setRedThreshold] = useState(1000);
  const [orangethreshold,setOrangeThreshold] = useState(4000);
  const [yellowthreshold,setYellowThreshold] = useState(8000);
  // Passi fatti
  const [num_steps_done,setNumStepsDone] = useState(route.params.steps_done);
  const [color_num_steps_done, setColorNumStepsDone] = useState("grey");
  const [pieData,setPieData] = useState([]);


  //Numero sospensioni
  const handleselection = (selected) => {
    setIsSelected(selected);
  };

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


  function formatDate(data) {
    let d = data, month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
  }


function formatDate2 (data) {
const year = +data.substring(0, 4);
const month = +data.substring(5, 7);
const day = +data.substring(8, 10);

console.log(year + " " + month + " " + day)

const date = new Date(year, month - 1, day);
return date;
}

  const plus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var dayafter = new Date (getdayconvertible(variableGiornoDate));
        dayafter.setDate(variableGiornoDate.getDate() + 1);
        let dayafterforapi = formatDate(dayafter);
        //Inserire API per sonno giornaliero: /api/patients/{patientID}/activities/steps (startDate=dayafterforapi, endDate=dayafterforapi)
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

        //Inserire API per passi settimanale: /api/patients/{patientID}/activities/steps (startDate=firstdayafterforapi, endDate=lastdayafterforapi)

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
        let firstdaymonthafterapi = formatDate(new Date(monthafter.getFullYear(), monthafter.getMonth(), 1)); 
        let lastdaymonthafterapi = formatDate (new Date(monthafter.getFullYear(), monthafter.getMonth() + 1, 0));

        //Inserire API per passi mensili: /api/patients/{patientID}/activities/steps (startDate=firstdaymonthafterforapi, endDate=lastdaymonthafterforapi)

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


  const convertDateintoDayoftheWeek = (date) => {

    let fordate = formatDate2(date);
    let dayoftheweek = fordate.getDay();

    console.log("fordate" + fordate);
    console.log("dayoftheweek" + dayoftheweek);
  
    switch (dayoftheweek) {
      case 1:
        return "LUN";
      case 2:
        return "MAR";
      case 3:
        return "MER";
      case 4:
        return "GIO";
      case 5:
        return "VEN";
      case 6:
        return "SAB";
      case 0:
        return "DOM";
    }
  }

  const convertDateintoNumberDay = (data) => {

    let fordate = formatDate2(data);
    let date = fordate.getDate();
  
    return parseInt(date,10);
  }
  
  useEffect(() => {

  let dateforapi = formatDate(date); //variabile da inserire nell'API per ricavare il sonno giornaliero
  // data odierna, non va MAI cambiata
  // inizializzo date che poi vengono cambiate quando si va avanti/indietro con le frecce
  setVariableGiornoDate(date);
  setVariableMonthDate(date);
  setMonthDate(date);
  

  let range_giorno = getday(date);
  setRangeTime(range_giorno);
  //setNumStepsDone(dayformattedtime);
  let steps_day = route.params.steps_done;
  setBarDataDay(steps_day);  

  setFirstTime(true);

  let arr = new Array();

  if(steps_day < redthreshold){
  setColorNumStepsDone("red");
  arr.push({value: steps_day, color:"red"});
  arr.push({value: yellowthreshold - steps_day, color:"white"});
  setPieData(arr);
  }
 else if(steps_day >= redthreshold && steps_day < orangethreshold){
  arr.push({value: steps_day, color:"orange"});
  arr.push({value: yellowthreshold - steps_day, color:"white"});
  setPieData(arr);
  setColorNumStepsDone("orange");
 }

 else if(steps_day >= orangethreshold && steps_day < yellowthreshold){
  arr.push({value: steps_day, color:"yellow"});
  arr.push({value: yellowthreshold - steps_day, color:"white"});
  setPieData(arr);
  setColorNumStepsDone("yellow");
 }

 else if (steps_day >= yellowthreshold){
  arr.push({value: steps_day, color:"green"});
  arr.push({value: yellowthreshold - steps_day, color:"whit"});
  setPieData(arr);
  setColorNumStepsDone("green");
 }
  
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
    
     el.value = el.steps;
     if(el.value < redthreshold)
      el.frontColor = "red";

     else if(el.value >= redthreshold && el.value < orangethreshold)
      el.frontColor = "orange";

     else if(el.value >= orangethreshold && el.value <yellowthreshold)
     el.frontColor = "yellow";

     else if (el.value >= yellowthreshold)
      el.frontColor = "green";

      el.label = convertDateintoDayoftheWeek(el.date);

    return el;
  
  })

  setBarDataWeek(_bardataweek);

  let _bardatamonth = mockbardatamonth.map((el) => {
    
    el.value = el.steps;

    if(el.value < redthreshold)
     el.frontColor = "red";

    else if(el.value >= redthreshold && el.value < orangethreshold)
     el.frontColor = "orange";

    else if(el.value >= orangethreshold && el.value <yellowthreshold)
    el.frontColor = "yellow";

    else if (el.value >= yellowthreshold)
     el.frontColor = "green";

    el.label = convertDateintoNumberDay(el.date);
   return el;
 
 })
  
 setBarDataMonth(_bardatamonth);


  //Inserire API per sonno giornaliero: /api/patients/{patientID}/sleep/duration (startDate=dateforapi, endDate=dateforapi)
  // setBarDataDay con il valore proveniente dall'API



},[])

useEffect(() => {
  let copiaPieData = Array.from(pieData);

  switch (isSelected) {
    case "Giorno": 
  
    let range_giorno = getday(date);
    setRangeTime(range_giorno);

    if(bardataday) {
    setNumStepsDone(bardataday);

    if(bardataday < redthreshold){
      copiaPieData[0].value = bardataday;
      copiaPieData[1].value = yellowthreshold - bardataday;
      setPieData(copiaPieData);
      setColorNumStepsDone("red");
    }

   else if(bardataday >= redthreshold && bardataday < orangethreshold){
    copiaPieData[0].value = bardataday;
    copiaPieData[1].value = yellowthreshold - bardataday;
    setPieData(copiaPieData);
    setColorNumStepsDone("orange");
   }

   else if(bardataday >= orangethreshold && bardataday < yellowthreshold)
    setColorNumStepsDone("yellow");

   else if (bardataday >= yellowthreshold)
    setColorNumStepsDone("green");
  }
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
      let average_steps_done = sum/bardataweek.length;

      setNumStepsDone(average_steps_done.toFixed(0));

      if(average_steps_done < redthreshold)
        setColorNumStepsDone("red");

       else if(average_steps_done >= redthreshold && average_steps_done < orangethreshold){
        copiaPieData[0].value = average_steps_done;
        copiaPieData[0].color = "orange";
        copiaPieData[1].value = yellowthreshold - average_steps_done;
        setPieData(copiaPieData);
        setColorNumStepsDone("orange");
       }
 
       else if(average_steps_done >= orangethreshold && average_steps_done <yellowthreshold){
        copiaPieData[0].value = average_steps_done;
        copiaPieData[0].color = "yellow";
        copiaPieData[1].value = yellowthreshold - average_steps_done;
        setPieData(copiaPieData);
        setColorNumStepsDone("yellow");
       }
 
       else if (average_steps_done >= yellowthreshold){
        copiaPieData[0].value = average_steps_done;
        copiaPieData[0].color = "green";
        copiaPieData[1].value = yellowthreshold - average_steps_done;
        setPieData(copiaPieData);
        setColorNumStepsDone("green");
       }
      
      //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayforapi, endDate=lastdayforapi)
     break;

    case "Mese":
      setRangeTime(padTo2Digits(parseInt(date.getMonth()+ Number(1))) + "/" + date.getFullYear());

      let summonth = 0;
      bardatamonth.forEach((el) => {
        summonth = summonth + el.value;
      });
      let average_month_steps = summonth/bardatamonth.length;

      setNumStepsDone(average_month_steps.toFixed(0));
      
      if(average_month_steps < redthreshold){
        copiaPieData[0].value = average_month_steps;
        copiaPieData[0].color = "red";
        copiaPieData[1].value = yellowthreshold - average_month_steps;
        setPieData(copiaPieData);
        setColorNumStepsDone("red");
      }

       else if(average_month_steps >= redthreshold && average_month_steps < orangethreshold){
        copiaPieData[0].value = average_month_steps;
        copiaPieData[0].color = "orange";
        copiaPieData[1].value = yellowthreshold - average_month_steps;
        setPieData(copiaPieData);
        setColorNumStepsDone("orange");
       }

       else if(average_month_steps >= orangethreshold && average_month_steps <yellowthreshold){
        copiaPieData[0].value = average_month_steps;
        copiaPieData[0].color = "yellow";
        copiaPieData[1].value = yellowthreshold - average_month_steps;
        setPieData(copiaPieData);
        setColorNumStepsDone("yellow");
       }
 
       else if (average_month_steps >= yellowthreshold){
        copiaPieData[0].value = average_month_steps;
        copiaPieData[0].color = "green";
        copiaPieData[1].value = yellowthreshold - average_month_steps;
        setPieData(copiaPieData);
        setColorNumStepsDone("green");
       }
      
      break;
  
  
}},[isSelected])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
     <View style={{flex:0.2}}>
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
      <View style={{flex:0.5, flexDirection: "row",justifyContent:"center",alignItems: "center"}}>
        <View style={{flex:0,alignItems: "center"}}>
        <View style={{flex:0}}>
            <PieChart
               donut
               radius={55}
               innerRadius={45}
               textSize={10}
               data={pieData}
               centerLabelComponent={() => {
              return <Text style={{fontSize: 25}}>{num_steps_done}</Text>;
                }}
            />
        </View>
         </View>
         <View style={{flex:0}}>
          <Text style={s.header(4,"regular")}>
            Passi
            {isSelected != "Giorno" && <Text>/giorno</Text>}
            </Text>
         </View>
      </View>
      {isSelected != "Giorno" && 
        (<View style={{height:"40%"}}>
          <View style={{marginLeft:15,marginBottom:10}}>
            <Text style={s.body("medium")}>Passi</Text>
          </View>
         <BarChart 
            data={isSelected == "Settimana" ? bardataweek : isSelected =="Giorno" ? bardataday : bardatamonth}
            spacing={isSelected == "Settimana" ? 30 : 10}
            barBorderRadius={4}
            initialSpacing = {5}
            noOfSections={3}
            maxValue={10000}
            yAxisThickness={0}
            xAxisThickness={0}
            barWidth={isSelected == "Settimana" ? 20 : 11}
            />
        </View>)}
    </View>
  );
}
