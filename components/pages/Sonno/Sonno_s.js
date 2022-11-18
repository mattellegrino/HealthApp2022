import { View, SafeAreaView, Text, StyleSheet,Dimensions, FlatList, StatusBar,ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");
import { BarChart } from "react-native-gifted-charts";
import * as Progress from 'react-native-progress';
import QuestionnaireAnswered from "../../../classes/QuestionnaireAnswered";
import Sleep from "../../../classes/Sleep";

export default function Sonno_s({navigation,route}) {

  const mockbardataday = {
    date: "2022-06-21",
    time_ms: 22300000
}


  const mockbardataweek = [
           {time_ms: 22300000, date: '2022-06-20'},
           {time_ms: 32300000, date: '2022-06-21'},
           {time_ms: 35300000, date: '2022-06-22'},
           {time_ms: 27300000, date: '2022-06-23'},
           {time_ms: 32300000, date: '2022-06-24'},
           {time_ms: 36300000, date: '2022-06-25'},
           {time_ms: 22300000, date: '2022-06-26'},
       ];

  const mockbardatamonth = [
           {time_ms: 22300000, date: '2022-06-1'},
           {time_ms: 22300000, date: '2022-06-2'},
           {time_ms: 12300000, date: '2022-06-3'},
           {time_ms: 12300000, date: '2022-06-4'},
           {time_ms: 12300000, date: '2022-06-5'},
           {time_ms: 32300000, date: '2022-06-6'},
           {time_ms: 12300000, date: '2022-06-7'},
           {time_ms: 32300000, date: '2022-06-8'},
           {time_ms: 12300000, date: '2022-06-9'},
           {time_ms: 12300000, date: '2022-06-10'},
           {time_ms: 22300000, date: '2022-06-11'},
           {time_ms: 12300000, date: '2022-06-12'},
           {time_ms: 12300000, date: '2022-06-13'},
           {time_ms: 12300000, date: '2022-06-14'},
           {time_ms: 32300000, date: '2022-06-15'},
           {time_ms: 12300000, date: '2022-06-16'},
           {time_ms: 17300000, date: '2022-06-17'},
           {time_ms: 22300000, date: '2022-06-18'},
           {time_ms: 32300000, date: '2022-06-19'},
           {time_ms: 32300000, date: '2022-06-20'},
           {time_ms: 19300000, date: '2022-06-21'},
           {time_ms: 12300000, date: '2022-06-22'},
           {time_ms: 12300000, date: '2022-06-23'},
           {time_ms: 31230000, date: '2022-06-24'},
           {time_ms: 12300000, date: '2022-06-25'},
           {time_ms: 32300000, date: '2022-06-26'},
           {time_ms: 27300000, date: '2022-06-27'},
           {time_ms: 12300000, date: '2022-06-28'},
       ];     
    
  var selezioni = ["Giorno","Settimana","Mese"];
  
  const date = new Date();
    let tipoUtente;
    if(global.patient_type === false)
    {
        tipoUtente="controllo"
    }
    else tipoUtente="sperimentale"

  const [isSelected, setIsSelected] = useState("Giorno");
  const [firstTime,setFirstTime] = useState(false);
  const [range_time,setRangeTime] = useState("");
  const [variableGiornoDate,setVariableGiornoDate] = useState("");
  const [variableFirstWeekDay,setVariableFirstWeekDay] = useState("");
  const [variableLastWeekDay,setVariableLastWeekDay] = useState("");
  const [variableMonthDate,setVariableMonthDate] = useState("");

  const [firstWeekDay,setFirstWeekDay] = useState("");
  const [lastWeekDay,setLastWeekDay] = useState("");
  const [firstWeekDayApi,setFirstWeekDayApi] = useState("");
  const [lastWeekDayApi,setLastWeekDayApi] = useState("");     
  
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
  const [color_num_hours_sleeped, setColorNumHoursSleeped] = useState(route.params.color_hours_sleeped);
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

  function formatDate2 (data) {
  const year = +data.substring(0, 4);
  const month = +data.substring(5, 7);
  const day = +data.substring(8, 10);

  
  const date = new Date(year, month - 1, day);
  return date;
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
    let total = parseInt(hours) + parseFloat(minutes);
    return total;
  }


  const convertDateintoDayoftheWeek = (date) => {

    let fordate = formatDate2(date);
    let dayoftheweek = fordate.getDay();

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

  const convertIndicatorFromColor = (color) => {

    switch (color) {

      case "red" :
        return "Scarso"
      
      case "orange" :
        return "Discreto"
        
      case "#FFEA00" :
        return "Buono"

      case "green" :
        return "Ottimo"

    }


  }

  const convertColorFromValue = (num_hours) => {

    if(num_hours < redthreshold)
       return "red";

      else if(num_hours >= redthreshold && num_hours < orangethreshold)
       return "orange";

      else if(num_hours>= orangethreshold && num_hours <yellowthreshold)
       return "#FFEA00";

      else if (num_hours >= yellowthreshold)
       return "green";


  }

  const progressValue = (value) => {
    return value/yellowthreshold;
  }


    const fillDates = async (firstweekdayapi,lastweekdayapi,granularity,number_of_days) => {
        let giorniesistenti = [];

            getSonno(firstweekdayapi,lastweekdayapi).then((_sonnoweek) => {

                    _sonnoweek.forEach((dayelement) => {
                        giorniesistenti.push(dayelement);
                    })

                    let _date;
                    if(_sonnoweek.length > 0)
                    {
                        _date= new Date(giorniesistenti[giorniesistenti.length - 1].date);
                    }
                    else _date = new Date(firstweekdayapi);

                    let length = giorniesistenti.length;
                    for (let i = 0; i < number_of_days - length; i++) {

                        _date.setDate(_date.getDate() + 1);
                        let tempdatestring = _date.toISOString().split("T")[0];
                        let dayobject= {"date": tempdatestring, "durationMs": 0}
                        giorniesistenti.push(dayobject);
                    }
                    let _bardata = giorniesistenti.map((el) => {
                        el.value = formatTime(el.durationMs);

                        if (tipoUtente === "sperimentale") {
                            if (el.value < redthreshold) el.frontColor = "red";
                            else if (el.value >= redthreshold && el.value < orangethreshold)
                                el.frontColor = "orange";
                            else if (el.value >= orangethreshold && el.value < yellowthreshold)
                                el.frontColor = "#FFEA00";
                            else if (el.value >= yellowthreshold) el.frontColor = "green";
                        } else
                            el.frontColor = "grey";
                        if(granularity === "week")
                            el.label = convertDateintoDayoftheWeek(el.date);
                        else
                            el.label = convertDateintoNumberDay(el.date);

                        return el;
                    });

                    if(granularity === "week") {
                        setBarDataWeek(_bardata);
                        let average_weekly_sonno = media(_bardata);
                        setColorNumHoursSleeped(average_weekly_sonno.toFixed(0));
                        handleColorNumStepsDone(average_weekly_sonno);
                    }else {
                        setBarDataMonth(_bardata);
                        let average_monthly_steps = media(_bardata);

                        setNumStepsDone(average_monthly_steps.toFixed(0));
                        handleColorNumStepsDone(average_monthly_steps);

                    }

                }
            ).catch((err) => {
                console.log(err);

            })
    }

    async function getSonno(startDate,endDate) {
        const response = await fetch(`http://${global.enrico}:8080/api/patients/${global.id}/sleep/duration?startDate=${startDate}&endDate=${endDate}`);
        const sonno_json= await response.json();
        if (response.ok)
        {
            let sonno = sonno_json.map(json => Sleep.from(json));
            console.log(sonno);
           return sonno
        }
        else {
            throw sonno_json;
        }
    }

  useEffect(() => {
      getSonno("2022-10-01","2022-10-30")
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
    console.log("dayformattedtime: " + dayformattedtime);
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
    let firstdayforapi = formatDate(firstweekday);
    setFirstWeekDayApi(firstdayforapi);
    setFirstWeekDay(firstweekday);
    setVariableFirstWeekDay(firstweekday);


    let lastweekday = new Date(currdate.setDate(last));
    let lastdayforapi = formatDate(lastweekday);
    setLastWeekDayApi(lastdayforapi);
    setLastWeekDay(lastweekday);
    setVariableLastWeekDay(lastweekday);

    let firstmonthday = new Date(date.getFullYear(), date.getMonth(), 1);
    setFirstMonthDay(firstmonthday);
    setVariableFirstMonthDay(firstmonthday);
    let lastmonthday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setLastMonthDay(lastmonthday);
    setVariableLastMonthDay(lastmonthday);


    //Inserire API per prendere i dati del sonno settimanale e metterli in mockbardataweek
    let _bardataweek = mockbardataweek.map((el) => {
      
       el.value = formatTime(el.time_ms);

       if(tipoUtente === "sperimentale"){

       if(el.value < redthreshold)
        el.frontColor = "red";
  
       else if(el.value >= redthreshold && el.value < orangethreshold)
        el.frontColor = "orange";

       else if(el.value >= orangethreshold && el.value <yellowthreshold)
       el.frontColor = "#FFEA00";

       else if (el.value >= yellowthreshold)
        el.frontColor = "green";

        else
        el.frontColor = "#1565C0";   
       }

       else
       el.frontColor = "#1565C0";

      el.label = convertDateintoDayoftheWeek(el.date);

      return el;
    
    })

    setBarDataWeek(_bardataweek);

    let _bardatamonth = mockbardatamonth.map((el) => {
      
      el.value = formatTime(el.time_ms);

      if(tipoUtente === "sperimentale"){

      if(el.value < redthreshold)
       el.frontColor = "red";

      else if(el.value >= redthreshold && el.value < orangethreshold)
       el.frontColor = "orange";

      else if(el.value >= orangethreshold && el.value <yellowthreshold)
      el.frontColor = "#FFEA00";

      else if (el.value >= yellowthreshold)
       el.frontColor = "green";

      }
      else
      el.frontColor = "#1565C0";

      el.label = convertDateintoNumberDay(el.date);

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

      if(bardataday){
      setNumHoursSleeped(bardataday);
      console.log("bardataday" + bardataday);
    
      if(bardataday < redthreshold)
      setColorNumHoursSleeped("red");

     else if(bardataday >= redthreshold && bardataday < orangethreshold)
      setColorNumHoursSleeped("orange");

     else if(bardataday >= orangethreshold && bardataday < yellowthreshold)
      setColorNumHoursSleeped("#FFEA00");

     else if (bardataday >= yellowthreshold)
      setColorNumHoursSleeped("green");
    
  }
  break;
      
      case "Settimana": 
   
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
     <ScrollView style={{height:Dimensions.get('window').height,padding:10, backgroundColor: "white"}}>
      <CustomNavbar type={"sonno"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
        <View style={styles.container_rangetime}>
            <Ionicons name="chevron-back-outline" size={28} color="black" onPress={()=> minus()}></Ionicons>
                <Text style={s.body("medium")}> {range_time} </Text>
            <Ionicons name="chevron-forward-outline" size={28} color="black" onPress={()=> plus()}></Ionicons>
        </View>

        <Text style={[s.smalltext("medium","grey"), styles.subtitle]}>Durata del sonno</Text>
        <Card
                cornerRadius={20}
                elevation={3}
                style={{
                  backgroundColor: "#1565C0",
                  flex: 1,
                  width: "55%",
                  alignSelf: "center",
                  padding: 10,
                  margin:5,
                  marginTop:10,
                  marginBottom:10,
                  alignItems: "center",
                }}
              >
            <View style={styles.details_sleep}>
            <Text style={s.smalltext("regular","white")}>{isSelected != "Giorno" ? "Media" : "Totale"}</Text>
              <View style={styles.hours_sleep}>
                <Text style={[s.header(1,"bold","white"),{marginRight:"2%"}]}> {num_hours_sleeped}</Text>
                <Text style={s.body("medium","white")}>h{isSelected != "Giorno" && <Text>/giorno</Text>}</Text>
              </View>
            
            {tipoUtente == "sperimentale" && 
            <>
              <Progress.Bar progress={progressValue(num_hours_sleeped)} width={150} color={convertColorFromValue(num_hours_sleeped)} unfilledColor={"lightgrey"} borderColor={"white"} borderWidth={1} />
              <Text style={[s.body("medium","white"),{margin:"1%"}]}>{convertIndicatorFromColor(color_num_hours_sleeped)}</Text>  
              </>
            }
           </View>  
        </Card> 

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
            height={200}
            maxValue={10}
            hideRules
            yAxisThickness={0}
            xAxisThickness={0}
            barWidth={isSelected == "Settimana" ? 20 : 11}
            showReferenceLine1
            referenceLine1Position={num_hours_sleeped}
            referenceLine1Config={{
            color: 'gray',
            labelText: "Media",
            labelTextStyle: styles.progressStyle,
            dashWidth: 2,
            dashGap: 3,
        }}
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
        backgroundColor:"#abdbe3",
        borderColor:"#1565C0",
        margin:10,
        padding:10
    },

    subtitle: {

      borderBottomWidth: 1,
      borderBottomColor: "lightgrey"
   
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
      justifyContent:"space-between",
      alignItems: "center"
    },

    hours_sleep: {
      flexDirection: "row",
      alignItems: "baseline"
    },

    threshold_sleep_container: {
      flex:0, 
      flexDirection: "row",
      alignItems: "baseline"
    },

    container_segnalatori: {
      flex:0, 
      alignItems: "center",
      justifyContent:"center",
      marginLeft:15,
    },

    progressStyle: {
      fontSize:10
    },
  
    circle: color => ({
      height: color != "transparent" ? 30 : 20, 
      width: color != "transparent" ? 30 : 20, 
      backgroundColor : color,
      borderRadius: 50,
      borderColor: color != "transparent" ? color : "black",
      borderWidth: 1
    })

})
