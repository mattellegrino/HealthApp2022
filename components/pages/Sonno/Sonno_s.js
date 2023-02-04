import { View, SafeAreaView, Text, StyleSheet,Dimensions, FlatList, StatusBar,ScrollView } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");
import { BarChart } from "react-native-gifted-charts";
import * as Progress from 'react-native-progress';
import QuestionnaireAnswered from "../../../classes/QuestionnaireAnswered";
import Sleep from "../../../classes/Sleep";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';

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
  
  const [firstmonthday,setFirstMonthDay] = useState("");
  const [lastmonthday,setLastMonthDay] = useState("");
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
  const [num_hours_sleeped, setNumHoursSleeped] = useState(0);
  const [color_num_hours_sleeped, setColorNumHoursSleeped] = useState(0);
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
          getSonno(dayafterforapi,dayafterforapi).then((_sleepValues) => {
                if(_sleepValues[0]!==undefined){
              setNumHoursSleeped(formatTime(_sleepValues[0].durationMs))
                handleColorSleep(formatTime(_sleepValues[0].durationMs))}
                else {
                    setNumHoursSleeped((0));
                    handleColorSleep(0);
                }
          })
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

          fillDates(firstdayafterforapi,lastdayafterforapi,"week",7);

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

          let firstdaymonthafter = new Date(monthafter.getFullYear(), monthafter.getMonth(), 1);
          let firstdaymonthafterapi = formatDate(
              firstdaymonthafter
          );
          let lastdaymonthafter = new Date(monthafter.getFullYear(), monthafter.getMonth() + 1, 0);
          let lastdaymonthafterapi = formatDate(
              lastdaymonthafter
          );

          let number_days_of_month = lastdaymonthafter.getDate() - firstdaymonthafter.getDate();
          fillDates(firstdaymonthafterapi,lastdaymonthafterapi,"month",number_days_of_month);
        break;
      }

    }
  }

  const minus = () => {

    switch (isSelected) {

      case "Giorno" : {

        var daybefore = new Date (getdayconvertible(variableGiornoDate));
        daybefore.setDate(variableGiornoDate.getDate() - 1);
          let daybeforeforapi = formatDate(daybefore);

          getSonno(daybeforeforapi,daybeforeforapi).then((_sleepValues) => {

              if(_sleepValues[0]!==undefined){
                  setNumHoursSleeped(formatTime(_sleepValues[0].durationMs))
                  handleColorSleep(formatTime(_sleepValues[0].durationMs))}
              else {
                  setNumHoursSleeped((0));
                  handleColorSleep(0)
              }

          }).catch((err) => setNumHoursSleeped(0));

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

          fillDates(firstdaybeforeforapi,lastdaybeforeforapi,"week",7);
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
          let firstdaymonthbefore = new Date(monthbefore.getFullYear(), monthbefore.getMonth(), 1);
          let firstdaymonthbeforeapi = formatDate(
              firstdaymonthbefore
          );
          let lastdaymonthbefore = new Date(monthbefore.getFullYear(), monthbefore.getMonth() + 1, 0);
          let lastdaymonthbeforeapi = formatDate(
              lastdaymonthbefore
          );

          let number_days_of_month = lastdaymonthbefore.getDate() - firstdaymonthbefore.getDate();
          fillDates(firstdaymonthbeforeapi,lastdaymonthbeforeapi,"month",number_days_of_month);


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

    const media = (array) => {

        let sum = 0;
        let lunghezza = 0;
        array.forEach((el) => {
            if(el.value !== 0) {
                lunghezza = lunghezza +1;
                sum = sum + el.value;
            }
        });
     if(lunghezza!==0)
        return sum / lunghezza;
          else
              return 0;
    }

  const handleColorSleep = (value) => {

      if(value === 0)
          setColorNumHoursSleeped("white");
      else {

          if (value < redthreshold) setColorNumHoursSleeped("red");
          else if (
              value >= redthreshold &&
              value < orangethreshold
          ) {
              setColorNumHoursSleeped("orange");
          } else if (
              value >= orangethreshold &&
              value < yellowthreshold
          ) {
              setColorNumHoursSleeped("#FFEA00");
          } else if (value >= yellowthreshold) {
              setColorNumHoursSleeped("green");
          }
      }
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

        case "white":
            return ""

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
      
                    let temparray = [];
                    let tempdate = new Date(firstweekdayapi);

                    for(let i =0; i< number_of_days; i++) {

                      if(i!=0)
                      tempdate.setDate(tempdate.getDate() + 1);
                      let tempdatestring = tempdate.toISOString().split("T")[0];
                      let dayobject= {"date": tempdatestring, "durationMs": 0}
                      temparray.push(dayobject);

                    }



                    for (let i = 0; i < number_of_days; i++) {

                      giorniesistenti.forEach((el) => {
                        if(el.date == temparray[i].date){
                          temparray[i].durationMs = el.durationMs;
                        }
                      })
                     
                    }

                    let _bardata = temparray.map((el) => {
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
                        console.log(_bardata);
                        let average_weekly_sonno = media(_bardata);
                    
                        setNumHoursSleeped(average_weekly_sonno.toFixed(2));
                        handleColorSleep(average_weekly_sonno);
                    }else {
                        setBarDataMonth(_bardata);
                        let average_monthly_sleep = media(_bardata);

                        setNumHoursSleeped(average_monthly_sleep.toFixed(2));
                        handleColorSleep(average_monthly_sleep);

                    }

                }
            ).catch((err) => {
                console.log(err);

            })
    }

    async function getSonno(startDate,endDate) {
        const response = await fetch(`${global.endpoint}/api/patients/${global.id}/sleep/duration?startDate=${startDate}&endDate=${endDate}`);
        const sonno_json= await response.json();
        if (response.ok)
        {
            let sonno = sonno_json.map(json => Sleep.from(json));
           return sonno.reverse()
        }
        else {
            throw sonno_json;
        }
    }

  useEffect(() => {
      
  },[variableGiornoDate])

 
  useEffect(() => {

    let dateforapi = formatDate(date); //variabile da inserire nell'API per ricavare il sonno giornaliero
    // data odierna, non va MAI cambiata
    // inizializzo date che poi vengono cambiate quando si va avanti/indietro con le frecce
    getSonno(dateforapi,dateforapi).then((_sleepValues) => {
      console.log(_sleepValues);
      setNumHoursSleeped(_sleepValues[0].durationMs)
  }).catch(() => {setNumHoursSleeped(0)})

    setVariableGiornoDate(date);
    setVariableMonthDate(date);
    setMonthDate(date);

    let range_giorno = getday(date);
    setRangeTime(range_giorno);
    let dayformattedtime = formatTime(mockbardataday.time_ms).toPrecision(3);
    //setNumHoursSleeped(dayformattedtime);
    setBarDataDay(dayformattedtime);
    setFirstTime(true);

    handleColorSleep(dayformattedtime);
    
    //inizializzo primo e ultimo giorno della settimana 
    let currdate = new Date ();
    var first = currdate.getDate() - currdate.getDay() + 1; 
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


  },[])

  useEffect(() => {

    switch (isSelected) {
      case "Giorno": 
  
      let range_giorno = getday(date);
      let dayforapi = formatDate(date);
      setRangeTime(range_giorno);

      getSonno(dayforapi,dayforapi).then((_sleepValues) => {
          console.log(_sleepValues);
          setNumHoursSleeped(_sleepValues[0].durationMs)
      }).catch((err) => {setNumHoursSleeped(0)})
  break;
      
      case "Settimana":

          let firstdayforapi = formatDate(firstWeekDay);
          let lastdayforapi = formatDate(lastWeekDay);

        let firstday_string = getday(firstWeekDay);
        let lastday_string = getday(lastWeekDay);
        setRangeTime(firstday_string + " - " + lastday_string);

        fillDates(firstdayforapi,lastdayforapi,"week",7);

        
        //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayforapi, endDate=lastdayforapi)
       break;

      case "Mese":
        setRangeTime(padTo2Digits(parseInt(date.getMonth()+ Number(1))) + "/" + date.getFullYear());

          let firstmonthdayapi = formatDate(firstmonthday);
          let lastmonthdayapi = formatDate(lastmonthday);
          let number_days_of_month = lastmonthday.getDate() - firstmonthday.getDate();
          fillDates(firstmonthdayapi,lastmonthdayapi,"month",number_days_of_month);

        break;
    
    
  }},[isSelected])


  return (
   <View style={styles.container_main}>
    <View style={styles.container_navbar}>
      <CustomNavbar type={"sonno"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
      </View>
        <View style={styles.container_rangetime}>
            <Ionicons name="chevron-back-outline" size={28} color="black" onPress={()=> minus()}></Ionicons>
                <Text style={s.body("medium")}> {range_time} </Text>
            <Ionicons name="chevron-forward-outline" size={28} color="black" onPress={()=> plus()}></Ionicons>
        </View>
      <View style={styles.container_oresonno}>
        <Text style={[s.smalltext("medium","grey"), styles.subtitle]}>Durata del sonno</Text>
        <Card
                cornerRadius={20}
                elevation={3}
                style={{
                  backgroundColor: "#1565C0",
                  flex: 0,
                  width: "55%",
                  alignSelf: "center",
                  padding: 10,
                  margin:5,
                  marginTop:20,
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
      </View> 

        
        <View style={styles.container_grafico}>
          {isSelected != "Giorno" && (
            <>
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
            </>)}
       
        </View>
        
      <GestureRecognizer style={styles.container_swipe_gestures} onSwipeLeft={()=> plus()} onSwipeRight={()=> minus()}>
         <View style={{marginBottom: 20}}>
          <Text style={s.body("bold")}>SCORRI PER NAVIGARE TRA LE DATE</Text>
         </View>  
          <LottieView
                style={{height:30}}
                source={require("../../../assets/7666-swipe.json")}
                loop
                autoPlay
      />
     </GestureRecognizer>    
            {/*<View style={styles.container_suspensions}>

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
      </View>*/}
    </View>
  );
}


const styles = StyleSheet.create({

  
    container_main: {
        flex: 5,
        backgroundColor:"white"
    },

    container_navbar: {
      flex:0.7,
      alignItems:"center"
    },
    container_rangetime: {
      flex:0,
      margin:10,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row"
    },

    container_oresonno: {
      flex:1,
      padding:10,
      marginBottom:30
    },

    container_grafico : {
      flex:3,
      marginTop:30,
      marginBottom:30
      },
      

    container_swipe_gestures: {
      borderTopWidth:3,
      borderTopColor: "#1565C0",
      flex: 0.4,
      backgroundColor: "#fff",
      padding:20,
      marginTop:10,
      alignItems: "center",
      justifyContent:"space-evenly"
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
