import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground
} from "react-native";

import { Card } from "react-native-shadow-cards";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import QuestionnaireTemplate from "../../../classes/QuestionnaireTemplate";
import QuestionnaireAnswered from "../../../classes/QuestionnaireAnswered";
import Sleep from "../../../classes/Sleep";
const s = require("../../../core/styles");


const HomePage_s = ({ navigation, route }) => {
  const {username} = route.params;
  const [giorno_dell_anno, setGiorno] = useState("");
  const mockbardataday = {
    date: "2022-06-21",
    time_ms: 22300000
  }

  const mocklinedatadayhr = {
    date: "2022-06-21",
    rest: 80,
  };

  const mockbardatadaysteps = {
    date: "2022-06-21",
    steps: 2200
  }
  const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  
    minutes = minutes / 100;
  
    let total = parseInt(hours) + parseFloat(minutes);
    return total;
  }

  const [allQuests, setAllQuests] = useState([]);
  const [quests, setQuests] = useState([]);
  const [questsTodo, setQuestsTodo] = useState([]);
  const [questsCompilati, setQuestsCompilati] = useState([]);
  const [num_hours_sleeped, setNumHoursSleeped] = useState("0:00");
  const [pieData,setPieData] = useState([]);
  const [steps_daily_done,setStepsDailyDone] = useState(undefined);
  const [hr_daily_done,setHrDailyDone] = useState(undefined);
  const [sonno_daily_done,setSonnoDailyDone] = useState(undefined);
  const [colorNumHoursSleeped, setColorNumHoursSleeped] = useState("orange");
  const [colorNumStepsDone,setColorNumStepsDone] = useState("grey");
  const [redthreshold,setRedThreshold] = useState(1000);
  const [orangethreshold,setOrangeThreshold] = useState(4000);
  const [yellowthreshold,setYellowThreshold] = useState(8000);
  const redthresholdsleep = 5;
  const orangethresholdsleep = 6; 
  const yellowthresholdsleep = 7.30;
  

  function filterDaCompilare(quest,questionari_compilati){

    let trovato = 0;

    questionari_compilati.forEach((quest_compilato) => {
      if(quest_compilato.questionnaireTemplate.id == quest.id)
        trovato = 1;
    })

    if(trovato == 1)
    return false;

    else
    return true;

  }

  const getQuestionnairesCompiled = (AllQuestionnaireTemplate) => {
    fetch(`http://${global.enrico}:8080/api/patients/${global.id}/questionnaires`)
        .then((response) => response.json())
        .then((json) =>{
            let questionari_compilati = json.map(json => QuestionnaireAnswered.from(json));
            setQuestsCompilati(json.map(json => QuestionnaireAnswered.from(json)))
            let questionari_da_compilare = AllQuestionnaireTemplate.filter((quest) => filterDaCompilare(quest,questionari_compilati));      
            setQuestsTodo(questionari_da_compilare);
            setQuests(questionari_da_compilare);
        })
        .catch((error) => { console.error(error)})
}


const getTodaySteps = (today) => {
    fetch(`http://${global.enrico}:8080/api/patients/${global.id}/activities/steps?startDate=${today}&endDate=${today}`)
        .then((response) => response.json())
        .then((json) =>{
            if(json[json.length -1] !== undefined)
            setStepsDailyDone(json[json.length -1]);
            else
            {
                let value = {"date": today, "steps": 0 };
                setStepsDailyDone(value)
            }
        })
        .catch((error) => { console.error(error)})
}

const getTodayHrValue = (today) => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/hrs/rest?startDate=${today}&endDate=${today}`)
            .then((response) => response.json())
            .then((json) =>{
                if(json[json.length -1] !== undefined)
                setHrDailyDone(json[json.length -1]);
                else
                {
                    let value = {"date": today, "rest": 0 };
                    setHrDailyDone(value)
                }
            })
            .catch((error) => { console.error(error)})
  }


   const getTodaySleepValue= (today) => {
       fetch(`http://${global.enrico}:8080/api/patients/${global.id}/sleep/duration?startDate=${today}&endDate=${today}`)
           .then((response) => response.json())
           .then((json) =>{
               let sonno = json.map(json => Sleep.from(json));
               if(sonno[sonno.length -1] !== undefined)
               {
                   setSonnoDailyDone(sonno[sonno.length -1]);
                   console.log(sonno[sonno.length -1])
               }
               else
               {
                   let value = {"date": today, "durationMs": 0 };
                   setSonnoDailyDone(value)
               }
           })
           .catch((error) => { console.error(error)})
    }

    const getQuestionnairesAvailable = () => {
        fetch(`http://${global.enrico}:8080/api/questionnaires/templates`)
            .then((response) => response.json())
            .then((json) =>{
                let AllQuestionnaireTemplate = json.map(json => QuestionnaireTemplate.from(json));
                setAllQuests(json.map(json => QuestionnaireTemplate.from(json)));
                getQuestionnairesCompiled(AllQuestionnaireTemplate);
            })
            .catch((error) => { console.error(error)})
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
  

    useEffect(() => {
    let  currentDate = new Date();
    let currentDateApi = formatDate(currentDate);
    getTodaySteps(currentDateApi);
    getTodayHrValue(currentDateApi);
    getTodaySleepValue(currentDateApi);

        setGiorno(currentDate);
    let steps_day = mockbardatadaysteps.steps;
    //Inserire API per passi giornalieri
    //setState(steps_daily_done

    if(steps_day < redthreshold){
      setColorNumStepsDone("red");
      }
     else if(steps_day >= redthreshold && steps_day < orangethreshold){
      setColorNumStepsDone("orange");
     }

     else if(steps_day >= orangethreshold && steps_day < yellowthreshold){
      setColorNumStepsDone("#FFEA00");
     }

     else if (steps_day >= yellowthreshold){
      setColorNumStepsDone("green");
     }

    getQuestionnairesAvailable();



    /*const backAction = () => {
      Alert.alert("Arrivederci", "Sei sicuro di voler chiudere l'app?", [
        {
          text: "Annulla",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => {
            //doLogout()
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };*/
    /*const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();*/
  }, [route.params]);

  const image = "../Homepage/background.png";

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../HomePage/background.png')} resizeMode="cover" style={{flex:1,width:"100%"}}>
        <View style={{flex:1,padding:20}}>
      <View
        justifyContent="space-between"
        style={{
          flex: 1,
          height: "100%",
          flexDirection: "row",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <View style={{ flex: 1, paddingTop: 10 }}>
          <Text>
            <Text style={s.header(1, "regular")}>Ciao </Text>
            <Text style={s.header(1, "medium")}>{username}</Text>
          </Text>
          <Text style={s.header(4, "regular")}>
            Questi sono i risultati di oggi
          </Text>
        </View>

        <View
          styles={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "green",
          }}
        >
          <Pressable
            style={{ paddingTop: 20 }}
            onPress={() => navigation.navigate("Impostazioni")}
          >
            <Ionicons name="settings-outline" size={24} />
          </Pressable>
          <Pressable
            style={{ paddingTop: 10 }}
            onPress={() => navigation.navigate("Questionari")}
          >
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Pressable
            style={{ flex: 1.5 }}
            onPress={() => navigation.navigate('Sonno_s',{hours_sleeped: formatTime(sonno_daily_done.durationMs),color_num_hours_sleeped: colorNumHoursSleeped })}
          >
            <View style={styles.container_sonno}>
              <Card
                cornerRadius={30}
                style={{
                  backgroundColor: "#1565C0",
                  flex: 1,
                  width: "95%",
                  margin:5,
                  marginTop:10,
                  marginBottom:10,
                  alignItems: "center",
                }}
              >
                <View style={styles.title}>
                  <View style={styles.moon}>
                    <Ionicons
                      style={{}}
                      name="moon"
                      size={20}
                      color={"#fff"}
                    />
                  </View>
                  <Text
                    style={[
                      s.header(4, "regular","#fff"),
                      {textAlign: "center" },
                    ]}
                  >
                    Sonno
                  </Text>
                </View>  
                  <View style={styles.sleep_details}>
                   <Text>
                    <Text style={[s.header(2, "medium","#fff")]}>{sonno_daily_done!==undefined && formatTime(sonno_daily_done.durationMs)}</Text>
                    <Text style={s.smalltext("regular","#fff")}> h</Text>
                   </Text> 
                    <Text style={[s.text("small","#fff")]}>
                      dormite la scorsa notte
                    </Text>
                  </View>
                
              </Card>
            </View>
          </Pressable>
          <Pressable
            style={{ flex: 3.5 }}
            onPress={() =>
              navigation.navigate("Attività_fisica_s", {
                steps_done: steps_daily_done.steps,
                hr_rest: hr_daily_done.rest
              })
            }
          >
            <View style={{ flex: 3,width: "100%"}}>
              <Card
                cornerRadius={30}
                style={{
                  backgroundColor: "#fff",
                  flex: 3,
                  width: "95%",
                  margin:5,
                  marginBottom: 10,
               
                }}
              >
               <View style={styles.title}>    
                <Text
                  style={[
                    s.header(4, "medium", "#000")
                  ]}
                >
                  {" "}
                  Attività fisica{" "}
                </Text>
              </View>  
                  <View style={styles.container_attivita}>
                   
                    <View style={{flex:0 ,flexDirection:"row",alignItems: "baseline", justifyContent: "space-evenly"}}>
                      <FontAwesome5 name="running" size={20} color="black"/>
                    <View style={{flex:0, flexDirection:"row",alignItems: "baseline"}}>
                        {steps_daily_done !== undefined &&
                      <Text style={[s.header(3,"bold"),{marginRight: 5}]} >{steps_daily_done.steps}</Text>}
                      <Text style={s.smalltext("regular")}>
                      Passi
                      </Text>
                    </View>    
                  </View> 

                  <View style={styles.borderbottom}></View>
                  <View>
                    <View style={{flex:0, flexDirection:"row",alignItems: "baseline",justifyContent: "space-evenly"}}>
                    <FontAwesome5 name="heartbeat" size={20} color="red"/>
                    <View style={{flex:0, flexDirection:"row",alignItems: "baseline"}}>
                        {hr_daily_done !== undefined &&
                            <Text style={[s.header(3, "bold"), {marginRight: 5}]}>{hr_daily_done.rest}</Text>
                        }
                      <Text style={s.smalltext("regular")}>
                      bpm
                      </Text>
                    </View>  
                    </View>  
                  </View> 
                </View>
              </Card>
            </View>
          </Pressable>
        </View>

        <View style={{ flex: 1, flexDirection: "column" }}>
          <Pressable
            style={{ flex: 4 }}
            onPress={() =>
              navigation.navigate("Questionari", {
                update:true
              })
            }
          >
            <Card
              cornerRadius={30}
              style={{
                backgroundColor: "#FFF9C4",
                flex: 4,
                width: "95%",
                margin:10,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  s.header(4, "medium", "#BB530B"),
                  { paddingTop: 15, width: "100%", textAlign: "center" },
                ]}
              >
                Alimentazione
              </Text>
               <View
                style={{
                  flex: 2,
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >

              <View><Text>Hai ancora</Text></View>
                <Text style={s.header(1,"bold")}>{questsTodo.length}</Text>
              <View>
                <Text>{questsTodo.length == 1 ? "questionario" : "questionari"}</Text>
                <Text>da compilare</Text>
              </View>        



              {/* vista per l'alimentazione inserita manualmente
                <View style={{ alignItems: "center" }}>
                  <View style={{ position: "relative", alignItems: "center" }}>
                    <ProgressChart
                      data={[0.8]}
                      width={Dimensions.get("screen").width / 3}
                      height={Dimensions.get("screen").height / 6}
                      strokeWidth={8}
                      radius={60}
                      hideLegend={true}
                      chartConfig={{
                        backgroundColor: "#FFF9C4",
                        backgroundGradientFrom: "#FFF9C4",
                        backgroundGradientTo: "#FFF9C4",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(187, 83, 11, ${opacity})`,
                        style: {
                          borderRadius: 16,
                          position: "relative",
                        },
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      s.header(4, "bold"),
                      { position: "absolute", top: "35%", color: "#BB530B" },
                    ]}
                  >
                    <Text>1234 </Text>
                    <Text>cal</Text>
                  </Text>
                  <Text style={[s.body("bold"), { color: "#BB530B" }]}>
                    {" "}
                    290 calorie rimaste{" "}
                  </Text>
                </View>
                  */}
                  </View>

              {/*<View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "space-around",
                  marginBottom: 10,
                }}
              >
                {allQuests.map((questTemplate,i) => {
                  return  <AlimentazioneRow key={i} titolo={questTemplate.name}></AlimentazioneRow>
                })}
               
              </View>*/}
            </Card>
          </Pressable>

          <Pressable
            style={{ flex: 3 }}
            onPress={() => navigation.navigate("Recommendation")}
          >
            <Card
              cornerRadius={30}
              style={{
                flex: 3,
                width: "95%",
                marginBottom: 10,
                marginLeft: 10,
                marginTop:10,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  s.header(4, "medium"),
                  { paddingTop: 10, width: "100%", textAlign: "center" },
                ]}
              >
                Consigli
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="thumbs-up-outline"
                  size={32}
                ></Ionicons>
                <Text style={[s.body("regular"), { textAlign: "center" }]}>
                  Compila almeno un questionario per vedere i Consigli della
                  Settimana{" "}
                </Text>
              </View>
            </Card>
          </Pressable>
        </View>
      </View>
     </View> 
     </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },

  borderbottom: {
    height:10,
    padding:5,
    borderBottomWidth:1,
    width:100,
    borderColor:"grey",
    alignSelf: "center",
  },

  container_attivita: {
    flex:1,
    width: "100%",
    marginBottom: 50,
    justifyContent: "space-around"
  },

  container_sonno: {
    flex: 2,
    color: "#fff",
  },

  title: {
    flex: 0,
    width: "100%",
    marginTop: 20,
    marginLeft: 30,
    alignItems: "baseline",
    flexDirection: "row",
  },

  moon: {
    marginRight: 8,
  },

  sleep_details: {
  
    marginTop:"30%"
  }
});
export default HomePage_s;
