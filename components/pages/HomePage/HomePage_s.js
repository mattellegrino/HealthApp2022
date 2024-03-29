import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
  ImageBackground
} from "react-native";
import {
  ProgressChart
} from "react-native-chart-kit";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Card } from "react-native-shadow-cards";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../CustomButton/CustomButton";
import AlimentazioneRow from "../Alimentazione/AlimentazioneRow";
const s = require("../../../core/styles");


const HomePage_s = ({ navigation, route }) => {
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
  const dayformattedtime = formatTime(mockbardataday.time_ms).toPrecision(3);
  const [num_questionari_da_compilare,setNumQuestionari_da_compilare] = useState(1);
  const [num_hours_sleeped, setNumHoursSleeped] = useState("0:00");
  const [pieData,setPieData] = useState([]);
  const [colorNumHoursSleeped, setColorNumHoursSleeped] = useState("orange");
  const [colorNumStepsDone,setColorNumStepsDone] = useState("grey");
  const [redthreshold,setRedThreshold] = useState(1000);
  const [orangethreshold,setOrangeThreshold] = useState(4000);
  const [yellowthreshold,setYellowThreshold] = useState(8000);
  const redthresholdsleep = 5;
  const orangethresholdsleep = 6; 
  const yellowthresholdsleep = 7.30;
  

  useEffect(() => {
    let arr = new Array();
    var currentDate = new Date();
    setGiorno(currentDate);
    let steps_day = mockbardatadaysteps.steps;

    if(dayformattedtime < redthresholdsleep){
    setColorNumHoursSleeped("red");
    console.log(dayformattedtime);  
  }
    else if (dayformattedtime >= redthresholdsleep && dayformattedtime < orangethresholdsleep)
    setColorNumHoursSleeped("orange")
    else if (dayformattedtime >= orangethresholdsleep && dayformattedtime < yellowthresholdsleep)
    setColorNumHoursSleeped("#FFEA00")
    else if (dayformattedtime >= yellowthresholdsleep)
    setColorNumHoursSleeped("green")


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
      arr.push({value: steps_day, color:"#FFEA00"});
      arr.push({value: yellowthreshold - steps_day, color:"white"});
      setPieData(arr);
      setColorNumStepsDone("#FFEA00");
     }
    
     else if (steps_day >= yellowthreshold){
      arr.push({value: steps_day, color:"green"});
      arr.push({value: yellowthreshold - steps_day, color:"white"});
      setPieData(arr);
      setColorNumStepsDone("green");
     }

    setNumHoursSleeped(dayformattedtime);

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
  }, []);

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
            <Text style={s.header(1, "medium")}>Mario!</Text>
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
            onPress={() => navigation.navigate('Sonno_s',{hours_sleeped: dayformattedtime ,color_num_hours_sleeped: colorNumHoursSleeped })}
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
                    <Text style={[s.header(2, "medium","#fff")]}>{dayformattedtime}</Text>
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
                steps_done: mockbardatadaysteps.steps,
                hr_rest: mocklinedatadayhr.rest
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
                    s.header(4, "medium", "#008b00")
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
                      <Text style={[s.header(3,"bold"),{marginRight: 5}]} >{mockbardatadaysteps.steps}</Text>
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
                      <Text style={[s.header(3,"bold"),{marginRight: 5}]} >83</Text>
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
              navigation.navigate("Questionari")
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
                <Text style={s.header(2,"bold")}>{num_questionari_da_compilare}</Text>
              <View>
                <Text>{num_questionari_da_compilare > 1 ? "questionari" : "questionario"}</Text>
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

              <View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "space-around",
                  marginBottom: 10,
                }}
              >
                <AlimentazioneRow titolo="Medas"></AlimentazioneRow>
                <AlimentazioneRow titolo="Cereali"></AlimentazioneRow>
              </View>
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
