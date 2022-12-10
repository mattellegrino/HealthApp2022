import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect} from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Card } from "react-native-shadow-cards";
import Battito_Cardiaco from "./Battito_Cardiaco";
const s = require("../../../core/styles");
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LottieView from 'lottie-react-native';
import * as Progress from "react-native-progress";
import LabelComponent from "./LabelComponent";
export default function Attività_fisica_s({ route }) {

  const mockbardataweek = [
    { steps: 2000, date: "2022-06-20" },
    { steps: 3000, date: "2022-06-21" },
    { steps: 300, date: "2022-06-22" },
    { steps: 2000, date: "2022-06-23" },
    { steps: 12000, date: "2022-06-24" },
    { steps: 3000, date: "2022-06-25" },
    { steps: 2000, date: "2022-06-26" },
  ];

  const mocklinedataweekhr = [
    { rest: 80, date: "2022-06-20" },
    { rest: 70, date: "2022-06-21" },
    { rest: 90, date: "2022-06-22" },
    { rest: 110, date: "2022-06-23" },
    { rest: 75, date: "2022-06-24" },
    { rest: 100, date: "2022-06-25" },
    { rest: 96, date: "2022-06-26" },
  ];

  const mockbardatamonth = [
    { steps: 2200, date: "2022-06-1" },
    { steps: 3000, date: "2022-06-2" },
    { steps: 12300, date: "2022-06-3" },
    { steps: 12300, date: "2022-06-4" },
    { steps: 1200, date: "2022-06-5" },
    { steps: 3000, date: "2022-06-6" },
    { steps: 12300, date: "2022-06-7" },
    { steps: 3230, date: "2022-06-8" },
    { steps: 1230, date: "2022-06-9" },
    { steps: 1230, date: "2022-06-10" },
    { steps: 2230, date: "2022-06-11" },
    { steps: 1230, date: "2022-06-12" },
    { steps: 1230, date: "2022-06-13" },
    { steps: 1230, date: "2022-06-14" },
    { steps: 320, date: "2022-06-15" },
    { steps: 12300, date: "2022-06-16" },
    { steps: 17000, date: "2022-06-17" },
    { steps: 2000, date: "2022-06-18" },
    { steps: 3200, date: "2022-06-19" },
    { steps: 20000, date: "2022-06-20" },
    { steps: 10000, date: "2022-06-21" },
    { steps: 1000, date: "2022-06-22" },
    { steps: 1000, date: "2022-06-23" },
    { steps: 20000, date: "2022-06-24" },
    { steps: 1230, date: "2022-06-25" },
    { steps: 3230, date: "2022-06-26" },
    { steps: 2730, date: "2022-06-27" },
    { steps: 1230, date: "2022-06-28" },
  ];
  const mocklinedatamonthhr = [
    { rest: 100, date: "2022-06-1" },
    { rest: 100, date: "2022-06-2" },
    { rest: 120, date: "2022-06-3" },
    { rest: 120, date: "2022-06-4" },
    { rest: 60, date: "2022-06-5" },
    { rest: 60, date: "2022-06-6" },
    { rest: 60, date: "2022-06-7" },
    { rest: 60, date: "2022-06-8" },
    { rest: 60, date: "2022-06-9" },
    { rest: 60, date: "2022-06-10" },
    { rest: 60, date: "2022-06-11" },
    { rest: 70, date: "2022-06-12" },
    { rest: 70, date: "2022-06-13" },
    { rest: 70, date: "2022-06-14" },
    { rest: 70, date: "2022-06-15" },
    { rest: 65, date: "2022-06-16" },
    { rest: 65, date: "2022-06-17" },
    { rest: 65, date: "2022-06-18" },
    { rest: 65, date: "2022-06-19" },
    { rest: 65, date: "2022-06-20" },
    { rest: 65, date: "2022-06-21" },
    { rest: 65, date: "2022-06-22" },
    { rest: 75, date: "2022-06-23" },
    { rest: 75, date: "2022-06-24" },
    { rest: 75, date: "2022-06-25" },
    { rest: 80, date: "2022-06-26" },
    { rest: 80, date: "2022-06-27" },
    { rest: 80, date: "2022-06-28" },
  ];


  var selezioni = ["Giorno", "Settimana", "Mese"];

  const date = new Date();

  let tipoUtente;
  if(global.patient_type === false)
  {
    tipoUtente="controllo"
  }
  else tipoUtente="sperimentale"

  const [isSelected, setIsSelected] = useState("Giorno");
  const [firstTime, setFirstTime] = useState(false);
  const [range_time, setRangeTime] = useState("");
  const [variableGiornoDate, setVariableGiornoDate] = useState("");
  const [variableFirstWeekDay, setVariableFirstWeekDay] = useState("");
  const [variableLastWeekDay, setVariableLastWeekDay] = useState("");
  const [variableMonthDate, setVariableMonthDate] = useState("");
  const [firstWeekDay, setFirstWeekDay] = useState("");
  const [lastWeekDay, setLastWeekDay] = useState("");
  const [firstmonthday, setFirstMonthDay] = useState("");
  const [lastmonthday, setLastMonthDay] = useState("");
  const [firstVariableMonthDay, setVariableFirstMonthDay] = useState("");
  const [lastVariableMonthDay, setVariableLastMonthDay] = useState("");
  const [monthdate, setMonthDate] = useState("");
  const [sleepdata, setSleepData] = useState([]);

  //props Card onPress
  const [cardvisible, setCardVisible] = useState(false);
  const [passiCard,setpassiCard] = useState(0);
  const [dateCard,setdateCard] = useState("");


  const [bardataday, setBarDataDay] = useState("");
  const [bardataweek, setBarDataWeek] = useState([]);
  const [bardatamonth, setBarDataMonth] = useState([]);
  const [linedatadayhr, setLineDataDayHr] = useState("");
  const [linedataweekhr, setLineDataWeekHr] = useState([]);
  const [linedatamonthhr, setLineDataMonthHr] = useState([]);

  const [redthreshold, setRedThreshold] = useState(1000);
  const [orangethreshold, setOrangeThreshold] = useState(4000);
  const [yellowthreshold, setYellowThreshold] = useState(8000);

  const hr_redthreshold = 120;
  const hr_orangethreshold = 100;
  const hr_yellowthreshold = 80;
  const hr_greenthreshold = 60;

  const [selectedChoice, setSelectedChoice] = useState("passi");
  // Passi fatti
  const [num_steps_done, setNumStepsDone] = useState(0);
  const [color_num_steps_done, setColorNumStepsDone] = useState("grey");

  //Battito a riposo
  const [hr_rest,setHrRest] = useState([]);
  const [color_hr_rest, setColorHrRest] = useState("red");

  //Numero sospensioni
  const handleselection = (selected) => {
    setIsSelected(selected);
  };

  const getday = (data) => {
    let day =
        data.getDate() +
        "/" +
        parseInt(data.getMonth() + Number(1)) +
        "/" +
        data.getFullYear();

    return day;
  };
  const getdayconvertible = (data) => {
    let day =
        data.getFullYear() +
        "-" +
        padTo2Digits(parseInt(data.getMonth() + Number(1))) +
        "-" +
        padTo2Digits(data.getDate());
    return day;
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }




  function formatDate(data) {
    let d = data,
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  function formatDate2(data) {
    const year = +data.substring(0, 4);
    const month = +data.substring(5, 7);
    const day = +data.substring(8, 10);

    const date = new Date(year, month - 1, day);
    return date;
  }

  const plus = () => {
    switch (isSelected) {
      case "Giorno": {
        var dayafter = new Date(getdayconvertible(variableGiornoDate));
        dayafter.setDate(variableGiornoDate.getDate() + 1);
        let dayafterforapi = formatDate(dayafter);
        //Inserire API per sonno giornaliero: /api/patients/{patientID}/activities/steps (startDate=dayafterforapi, endDate=dayafterforapi)
        getSteps(dayafterforapi,dayafterforapi).then((_steps) => {
            setNumStepsDone(_steps[0].steps)
            handleColorNumStepsDone(_steps[0].steps);
        }
      ).catch((err) => setNumStepsDone(0));

        getHrValues(dayafterforapi,dayafterforapi).then((_hrValues) => {
          setHrRest(_hrValues[0].rest)
        }).catch((err) => setHrRest(0));
        setRangeTime(getday(dayafter));
        setVariableGiornoDate(dayafter);
        break;
      }

      case "Settimana": {
        var firstdayafter = new Date(getdayconvertible(variableLastWeekDay));
        firstdayafter.setDate(variableLastWeekDay.getDate() + 1);
        let firstdayafterforapi = formatDate(firstdayafter);
        var lastdayafter = new Date(getdayconvertible(variableLastWeekDay));
        lastdayafter.setDate(variableLastWeekDay.getDate() + 7);
        let lastdayafterforapi = formatDate(lastdayafter);

        let firstday_string = getday(firstdayafter);
        let lastday_string = getday(lastdayafter);

        //Inserire API per passi settimanale: /api/patients/{patientID}/activities/steps (startDate=firstdayafterforapi, endDate=lastdayafterforapi)

        fillDates(firstdayafterforapi,lastdayafterforapi,"steps","week",7);
        fillDates(firstdayafterforapi,lastdayafterforapi,"heart_rate","week",7);

        setVariableFirstWeekDay(firstdayafter);
        setVariableLastWeekDay(lastdayafter);
        setRangeTime(firstday_string + " - " + lastday_string);
        break;
      }

      case "Mese": {
        var monthafter = new Date(getdayconvertible(variableMonthDate));
        monthafter.setMonth(variableMonthDate.getMonth() + 1);
        let variablefirstmonthday = new Date(monthafter.getFullYear(), monthafter.getMonth(), 1);
        setVariableFirstMonthDay(
            variablefirstmonthday
        );
        let variablelastmonthday =  new Date(monthafter.getFullYear(), monthafter.getMonth() + 1, 0);
        setVariableLastMonthDay(
            variablelastmonthday

        );

        let firstdaymonthafter = new Date(monthafter.getFullYear(), monthafter.getMonth(), 1);
        let firstdaymonthafterapi = formatDate(
          firstdaymonthafter
        );
        let lastdaymonthafter = new Date(monthafter.getFullYear(), monthafter.getMonth() + 1, 0);
        let lastdaymonthafterapi = formatDate(
            lastdaymonthafter
        );

        //Inserire API per passi mensili: /api/patients/{patientID}/activities/steps (startDate=firstdaymonthafterforapi, endDate=lastdaymonthafterforapi)

        setRangeTime(
            padTo2Digits(parseInt(monthafter.getMonth() + Number(1))) +
            "/" +
            monthafter.getFullYear()
        );
        setVariableMonthDate(monthafter);

        let number_days_of_month = lastdaymonthafter.getDate() - firstdaymonthafter.getDate();
        fillDates(firstdaymonthafterapi,lastdaymonthafterapi,"steps","month",number_days_of_month);
        fillDates(firstdaymonthafterapi,lastdaymonthafterapi,"heart_rate","month",number_days_of_month);
        break;
      }
    }
  };

  const minus = () => {
    switch (isSelected) {
      case "Giorno": {
        var daybefore = new Date(getdayconvertible(variableGiornoDate));
        daybefore.setDate(variableGiornoDate.getDate() - 1);
        let daybeforeforapi = formatDate(daybefore);
        getSteps(daybeforeforapi,daybeforeforapi).then((_steps) => {
              setNumStepsDone(_steps[0].steps)
              handleColorNumStepsDone(_steps[0].steps);
            }
        ).catch((err) => setNumStepsDone(0));

        getHrValues(daybeforeforapi,daybeforeforapi).then((_hrValues) => {
          setHrRest(_hrValues[0].rest)
        }).catch((err) => setHrRest(0));
        setRangeTime(getday(daybefore));
        setVariableGiornoDate(daybefore);
        break;
      }

      case "Settimana": {
        var firstdaybefore = new Date(getdayconvertible(variableFirstWeekDay));
        firstdaybefore.setDate(variableFirstWeekDay.getDate() - 7);
        let firstdaybeforeforapi = formatDate(firstdaybefore);
        setVariableFirstWeekDay(firstdaybefore);
        var lastdaybefore = new Date(getdayconvertible(variableLastWeekDay));
        lastdaybefore.setDate(variableLastWeekDay.getDate() - 7);
        let lastdaybeforeforapi = formatDate(lastdaybefore);
        setVariableLastWeekDay(lastdaybefore);
        let firstday_string = getday(firstdaybefore);
        let lastday_string = getday(lastdaybefore);

        //Inserire API per sonno settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayafterforapi, endDate=lastdayafterforapi)
        fillDates(firstdaybeforeforapi,lastdaybeforeforapi,"steps","week",7);
        fillDates(firstdaybeforeforapi,lastdaybeforeforapi,"heart_rate","week",7);
        setRangeTime(firstday_string + " - " + lastday_string);
        break;
      }

      case "Mese": {
        var monthbefore = new Date(getdayconvertible(variableMonthDate));
        monthbefore.setMonth(variableMonthDate.getMonth() - 1);

        setVariableFirstMonthDay(
            new Date(monthbefore.getFullYear(), monthbefore.getMonth(), 1)
        );
        setVariableLastMonthDay(
            new Date(monthbefore.getFullYear(), monthbefore.getMonth() + 1, 0)
        );
        setRangeTime(
            padTo2Digits(parseInt(monthbefore.getMonth() + Number(1))) +
            "/" +
            monthbefore.getFullYear()
        );
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
        fillDates(firstdaymonthbeforeapi,lastdaymonthbeforeapi,"steps","month",number_days_of_month);
        fillDates(firstdaymonthbeforeapi,lastdaymonthbeforeapi,"heart_rate","month",number_days_of_month);

        break;
      }
    }
  };

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
  };

  const convertDateintoNumberDay = (data) => {
    let fordate = formatDate2(data);
    let date = fordate.getDate();

    return parseInt(date, 10);
  };

  const progressValueSteps = (value) => {
    return value / yellowthreshold;
  };

  const convertColorFromValue = (num_hours) => {
    if (num_hours < redthreshold) return "red";
    else if (num_hours >= redthreshold && num_hours < orangethreshold)
      return "orange";
    else if (num_hours >= orangethreshold && num_hours < yellowthreshold)
      return "#FFEA00";
    else if (num_hours >= yellowthreshold) return "green";
  };

  const convertIndicatorFromColor = (color) => {
    switch (color) {
      case "red":
        return "Scarso";

      case "orange":
        return "Discreto";

      case "#FFEA00":
        return "Buono";

      case "green":
        return "Ottimo";
    }
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

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

  const handleColorNumStepsDone = (value) => {

    if (value < redthreshold) setColorNumStepsDone("red");
    else if (
        value >= redthreshold &&
        value < orangethreshold
    ) {
      setColorNumStepsDone("orange");
    } else if (
        value >= orangethreshold &&
        value < yellowthreshold
    ) {
      setColorNumStepsDone("#FFEA00");
    } else if (value >= yellowthreshold) {
      setColorNumStepsDone("green");
    }
  }

  const handleColorHrRest = (value) => {

    if (value > hr_redthreshold) setColorHrRest("red");
    else if (
        value <= hr_redthreshold &&
        value > hr_orangethreshold
    ) {
      setColorHrRest("orange");
    } else if (
        value <= hr_orangethreshold &&
        value > hr_yellowthreshold
    ) {
      setColorHrRest("#FFEA00");
    } else if (value <= hr_yellowthreshold) {
      setColorHrRest("green");
    }
  }

  const customDataPoint = () => {
    return (
        <View
            style={{
              width: 5,
              height: 5,
              marginTop:18,
              backgroundColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: 'black',
            }}
        />
    );
  };

  async function getSteps(startDate,endDate) {
    const response = await fetch(`http://${global.enrico}:8080/api/patients/${global.id}/activities/steps?startDate=${startDate}&endDate=${endDate}`);
    const steps= await response.json();
    if (response.ok)
    {
      return steps;
    }
    else {
      throw steps;
    }
  }

  async function getHrValues(startDate,endDate) {
    const response = await fetch(`http://${global.enrico}:8080/api/patients/${global.id}/hrs/rest?startDate=${startDate}&endDate=${endDate}`);
    const hrValues= await response.json();
    if (response.ok)
    {
      return hrValues;
    }
    else {
      throw hrValues;
    }
  }

  const activeCard = (value,date) => {

    setdateCard(date);
    setpassiCard(value);
    setCardVisible(true);
    function myStopFunction() {
      setCardVisible(false);
    }
    setTimeout(myStopFunction, 1000);

  }


  const fillDates = async (firstweekdayapi,lastweekdayapi,activity_type,granularity,number_of_days) => {
    let giorniesistenti = [];

    if(activity_type==="steps")
    {
      getSteps(firstweekdayapi,lastweekdayapi).then((_stepsweek) => {

            _stepsweek.forEach((dayelement) => {
              giorniesistenti.push(dayelement);
            })

            let temparray = [];
            let tempdate = new Date(firstweekdayapi);

            for(let i =0; i< number_of_days; i++) {

              if(i!=0)
              tempdate.setDate(tempdate.getDate() + 1);
              let tempdatestring = tempdate.toISOString().split("T")[0];
              let dayobject= {"date": tempdatestring, "steps": 0}
              temparray.push(dayobject);

            }



            for (let i = 0; i < number_of_days; i++) {

              giorniesistenti.forEach((el) => {
                if(el.date == temparray[i].date){
                  temparray[i].steps = el.steps;
                }
              })
             
            }
            let _bardata = temparray.map((el) => {
              el.value = el.steps;

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
              let average_weekly_steps = media(_bardata);

              setNumStepsDone(average_weekly_steps.toFixed(0));
              console.log(_bardata);
              handleColorNumStepsDone(average_weekly_steps);
            }else {
              setBarDataMonth(_bardata);
              let average_monthly_steps = media(_bardata);
              console.log(_bardata);
              setNumStepsDone(average_monthly_steps.toFixed(0));
              handleColorNumStepsDone(average_monthly_steps);

            }

          }
      ).catch((err) => {
        console.log(err);

      })
    }
    else
    {
      getHrValues(firstweekdayapi,lastweekdayapi).then((hrweek) => {

            hrweek.forEach((dayelement) => {
              giorniesistenti.push(dayelement);
            })

            let temparray = [];
            let tempdate = new Date(firstweekdayapi);

            for(let i =0; i< number_of_days; i++) {

              if(i!=0)
              tempdate.setDate(tempdate.getDate() + 1);
              let tempdatestring = tempdate.toISOString().split("T")[0];
              let dayobject= {"date": tempdatestring, "rest": 0}
              temparray.push(dayobject);

            }



            for (let i = 0; i < number_of_days; i++) {

              giorniesistenti.forEach((el) => {
                if(el.date == temparray[i].date){
                  temparray[i].rest = el.rest;
                }
              })
             
            }

            let _bardatahr = temparray.map((el) => {
              el.value = el.rest;

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
              else el.label =convertDateintoNumberDay(el.date);
              return el;
            });
            if(granularity == "week"){
            setLineDataWeekHr(_bardatahr);
            
            let average_weekly_hr = media(_bardatahr);

            setHrRest(average_weekly_hr.toFixed(0));
            handleColorHrRest(average_weekly_hr)
          }
            else {
              setLineDataMonthHr(_bardatahr);
              let average_monthly_hr = media(_bardatahr);

              setHrRest(average_monthly_hr.toFixed(0));
              handleColorHrRest(average_monthly_hr);
            }

          }
      ).catch((err) => {
        console.log(err);

      })
    }

  }



  useEffect(() => {
    let dayforapi = formatDate(date); //variabile da inserire nell'API per ricavare il sonno giornaliero

    // inizializzo date che poi vengono cambiate quando si va avanti/indietro con le frecce
    setVariableGiornoDate(date);
    setVariableMonthDate(date);
    setMonthDate(date);

    let range_giorno = getday(date);
    setRangeTime(range_giorno);
    //setNumStepsDone(dayformattedtime);

    getSteps(dayforapi,dayforapi).then((_stepsValues) => {

      setNumStepsDone(_stepsValues[0].steps);
      handleColorNumStepsDone(_stepsValues[0].steps);

    }).catch((err)=> setNumStepsDone(0));


    getHrValues(dayforapi,dayforapi).then((_hrValues) => {
      setHrRest(_hrValues[0].rest),
      setLineDataDayHr(hr_rest);
      handleColorHrRest(_hrValues[0].rest);
    }).catch((err) => setHrRest(0));


    setFirstTime(true);


    //inizializzo primo e ultimo giorno della settimana
    let currdate = new Date();
    var first = currdate.getDate() - currdate.getDay() + 1;
    var last = first + 6;
    let firstweekday = new Date(currdate.setDate(first));
    setFirstWeekDay(firstweekday);
    let firstweekdayapi = formatDate(firstweekday);
    setVariableFirstWeekDay(firstweekday);
    let lastweekday = new Date(currdate.setDate(last));
    setLastWeekDay(lastweekday);
    let lastweekdayapi = formatDate(lastweekday);
    setVariableLastWeekDay(lastweekday);

    let firstmonthday = new Date(date.getFullYear(), date.getMonth(), 1);
    setFirstMonthDay(firstmonthday);
    let firstmonthdayapi = formatDate(firstmonthday);
    setVariableFirstMonthDay(firstmonthday);
    let lastmonthday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let lastmonthdayapi = formatDate(lastmonthday);
    setLastMonthDay(lastmonthday);
    setVariableLastMonthDay(lastmonthday);

  }, []);

  useEffect(() => {
    switch (isSelected) {
      case "Giorno":
        let range_giorno = getday(date);
        let dayforapi = formatDate(date);
        
        setRangeTime(range_giorno);

        getSteps(dayforapi,dayforapi).then((_stepsValues) => {

          setNumStepsDone(_stepsValues[0].steps);
          handleColorNumStepsDone(_stepsValues[0].steps);

        }).catch((err)=> setNumStepsDone(0));


        getHrValues(dayforapi,dayforapi).then((_hrValues) => {
          setHrRest(_hrValues[0].rest)
          handleColorHrRest(_hrValues[0].rest);
        }).catch((err) => setHrRest(0));
        
        break;

      case "Settimana":
        
        let firstdayforapi = formatDate(firstWeekDay);
        let lastdayforapi = formatDate(lastWeekDay);

        let firstday_string = getday(firstWeekDay);
        let lastday_string = getday(lastWeekDay);
        setRangeTime(firstday_string + " - " + lastday_string);


        fillDates(firstdayforapi,lastdayforapi,"steps","week",7);
        fillDates(firstdayforapi,lastdayforapi,"heart_rate","week",7);


        //Inserire API per passi  settimanale: /api/patients/{patientID}/sleep/duration (startDate=firstdayforapi, endDate=lastdayforapi)
        break;

      case "Mese":
        setRangeTime(
            padTo2Digits(parseInt(date.getMonth() + Number(1))) +
            "/" +
            date.getFullYear()
        );

        let firstmonthdayapi = formatDate(firstmonthday);
        let lastmonthdayapi = formatDate(lastmonthday);
        let number_days_of_month = lastmonthday.getDate() - firstmonthday.getDate();
        fillDates(firstmonthdayapi,lastmonthdayapi,"steps","month",number_days_of_month);
        fillDates(firstmonthdayapi,lastmonthdayapi,"heart_rate","month",number_days_of_month);
      
        break;
    }
  }, [isSelected]);

  return (
    <View style={styles.container_main}>
      <View style={styles.container_navbar}>
        <CustomNavbar
            type={"attività"}
            isSelected={isSelected}
            selezioni={selezioni}
            handleselection={handleselection}
        ></CustomNavbar>
      </View>
      <View style={styles.container_rangetime}>
          <Ionicons name="chevron-back-outline" size={24} color="black" onPress={() => minus()}/>
          <Text style={s.body("medium")}> {range_time} </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" onPress={() => plus()}/>
        </View>

        <View style={styles.container_multichoice}>
          <Pressable style={styles.choice} onPress={() => handleChoice("passi")}>
            <Text style={styles.textchoice}>Passi</Text>
            <View
                style={styles.choiceicon(selectedChoice == "passi" ? true : false)}
            >
              <FontAwesome5
                  name="running"
                  size={20}
                  color={selectedChoice == "passi" ? "white" : "black"}
              />
            </View>
          </Pressable>

          <Pressable
              style={styles.choice}
              onPress={() => handleChoice("battito")}
          >
            <Text style={styles.textchoice}>Battito Cardiaco</Text>
            <View
                style={styles.choiceicon(
                    selectedChoice == "battito" ? true : false
                )}
            >
              <FontAwesome5
                  name="heartbeat"
                  size={20}
                  color={selectedChoice == "battito" ? "white" : "black"}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.container_grafico}>
          {selectedChoice == "passi" && (
              <View style={{flex:1, marginTop: 0 }}>
                {/*tab passi*/}
                <View style={{flex: 0.5 }}>
                  <Text style={[s.smalltext("medium", "grey"), styles.subtitle]}>
                    Passi
                  </Text>
                  <View
                      style={{
                        backgroundColor: "#fff",
                        flex: 0,
                        width: "95%",
                        padding: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        alignSelf:"center",
                        alignItems: "center",
                      }}
                  >
                    <View style={styles.details_sleep}>
                      <Text style={s.smalltext("regular")}>
                        {isSelected != "Giorno" ? "Media" : "Totale"}
                      </Text>
                      <View>
                        <View
                            style={{
                              flex: 0,
                              flexDirection: "row",
                              alignItems: "baseline",
                            }}
                        >
                          <Text style={[s.header(2, "bold"), { marginRight: 5 }]}>
                            {num_steps_done}
                          </Text>
                          <Text style={s.smalltext("regular")}>
                            Passi
                            {isSelected != "Giorno" && <Text>/giorno</Text>}
                          </Text>
                        </View>
                      </View>

                      {tipoUtente == "sperimentale" &&
                          <>
                            <Progress.Bar
                                progress={progressValueSteps(num_steps_done)}
                                width={150}
                                color={convertColorFromValue(num_steps_done)}
                                unfilledColor={"lightgrey"}
                                borderColor={"white"}
                                borderWidth={1}
                            />
                            <Text style={[s.body("medium"), { margin: "1%" }]}>
                              {convertIndicatorFromColor(color_num_steps_done)}
                            </Text>
                          </>}
                    </View>
                  </View>
                </View>

                {cardvisible &&
                <Card style={styles.cardOnpress}>
                  <Text>Totale</Text>
                  <Text>{passiCard}</Text>
                </Card>
                }

                {isSelected != "Giorno" && (
                    <View style={{ height: "40%" }}>
                      <BarChart
                          data={
                            isSelected == "Settimana"
                                ? bardataweek
                                : isSelected == "Giorno"
                                    ? bardataday
                                    : bardatamonth
                          }
                          spacing={isSelected == "Settimana" ? 30 : 10}
                          barBorderRadius={4}
                          initialSpacing={10}
                          noOfSections={4}
                          maxValue={20000}
                          yAxisTextStyle={styles.progressStyle}
                          xAxisLabelTextStyle={styles.progressXStyle}
                          height={200}                        
                          hideRules
                          yAxisThickness={0}
                          xAxisThickness={0}
                          barWidth={isSelected == "Settimana" ? 20 : 11}
                          showReferenceLine1
                          referenceLine1Position={num_steps_done}
                          referenceLine1Config={{
                            color: "gray",
                            labelText: "Media",
                            labelTextStyle: styles.progressStyle,
                            dashWidth: 2,
                            dashGap: 3,
                          }}
                      />
                    </View>
                )}
              </View>
          )}

          {selectedChoice == "battito" && (
              <View style={{flex: 0.5 }}>

                <Text style={[s.smalltext("medium", "grey"), styles.subtitle]}>
                  Battito cardiaco {isSelected != "Giorno" ? "(media)" : ""}
                </Text>
                <View style={{padding: 10,
                  margin: 5,
                  marginTop: 10,
                  marginBottom: 10,alignItems: "center"}}>
                  <View style={{flex:0,flexDirection:"row",alignItems: "center"}}>
                    <View style={{marginRight:20}}>
                      <FontAwesome5 name="heartbeat" size={30} color="red" />
                    </View>
                    <View style={styles.details_sleep}>

                      <Text style={s.smalltext("regular")}>
                        A riposo
                      </Text>
                      <View>
                        <View
                            style={{
                              flex: 0,
                              flexDirection: "row",
                              alignItems: "baseline",
                            }}
                        >
                          <Text style={[s.header(2, "bold"), { marginRight: 5 }]}>
                            {hr_rest}
                          </Text>
                          <Text style={s.smalltext("regular")}>
                            Bpm
                          </Text>
                        </View>
                      </View>
                      {tipoUtente == "sperimentale" &&
                          <Text style={[s.body("medium"), { margin: "1%" }]}>
                            {convertIndicatorFromColor(color_hr_rest)}
                          </Text>
                      }
                    </View>
                  </View>
                </View>
                {isSelected != "Giorno" &&
                    <LineChart
                        color={tipoUtente == "sperimentale" ? color_hr_rest : "grey"}
                        startFillColor={tipoUtente == "sperimentale" ? color_hr_rest : "grey"}
                        endFillColor={tipoUtente == "sperimentale" ? color_hr_rest : "grey"}
                        areaChart
                        showReferenceLine1
                        maxValue={150}referenceLine1Position={hr_rest}
                        referenceLine1Config={{
                          color: "gray",
                          labelText: "Media",
                          dashWidth: 2,
                          dashGap: 3,
                        }}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        yAxisTextStyle={styles.progressStyle}
                        xAxisLabelTextStyle={styles.progressXStyle}
                        startOpacity={0.1}
                        endOpacity={0.7}
                        initialSpacing={0}
                        height={200}
                        data={
                          isSelected == "Settimana" && linedataweekhr
                              ? linedataweekhr
                              : linedatamonthhr
                        }
                        spacing={isSelected == "Settimana" ? 50 : 20}
                        textColor1="black"
                        textShiftY={-10}
                        textShiftX={-5}
                        showTextOnPress
                        pressEnabled={true}
                        textFontSize={12}
                        thickness={2}
                        curved
                        isAnimated={true}
                        focusedDataPointRadius={5}
                        focusedDataPointColor={"black"}
                        hideRules
                        yAxisColor="#0BA5A4"
                        xAxisColor="#0BA5A4"
                    />
                }
              
              </View>
          )}
        </View>
        <GestureRecognizer style={styles.container_swipe_gestures} onSwipeLeft={()=> plus()} onSwipeRight={()=> minus()}>
         <View style={{marginBottom: 20}}>
          <Text style={s.header(4,"bold")}>SCORRI PER NAVIGARE TRA LE DATE</Text>
         </View>  
          <LottieView
                style={{height:50}}
                source={require("../../../assets/7666-swipe.json")}
                loop
                autoPlay
      />
     </GestureRecognizer>    
      </View>
  );
}

const styles = StyleSheet.create({

  container_main: {
    flex: 5,
    backgroundColor:"white"
},

container_navbar: {
  flex:0.5,
  alignItems: "center"
},
container_rangetime: {
  flex:0,
  margin:10,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row"
},
container_grafico : {
  flex:3,
  marginTop:30,
  marginBottom:30
  },

  container_swipe_gestures: {
    borderTopWidth:3,
    borderTopColor: "black",
    flex: 0.4,
    backgroundColor: "#fff",
    padding:20,
    marginTop:10,
    alignItems: "center",
    justifyContent:"space-evenly"
},

  subtitle: {
    marginLeft:5,
    paddingBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },

  threshold_sleep_container: {
    flex: 0,
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },

  container_multichoice: {
    flex: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  choice: {
    margin: 10,
    alignItems: "center",
  },

  choiceicon: (selected) => ({
    backgroundColor: selected ? "black" : "white",
    padding: 10,
    width: 45,
    height: 45,
    marginTop: 5,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: "center",
  }),

  textchoice: {
    fontSize: 8,
  },

  container_segnalatori: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },

  square_container: {
    borderRadius: 30,
    borderWidth: 1,
  },

  progressStyle: {
    fontSize: 11,
  },

  progressXStyle: {
    fontSize: 12,
    width: 50,
    marginLeft: 5,
  },

  cardOnpress: {
    padding: 10,
  },

  circle: (color) => ({
    height: color != "transparent" ? 30 : 20,
    width: color != "transparent" ? 30 : 20,
    backgroundColor: color,
    borderRadius: 50,
    borderColor: color != "transparent" ? color : "black",
    borderWidth: 1,
  }),
});