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
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
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
  const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  
    minutes = minutes / 100;
  
    let total = parseInt(hours) + parseInt(minutes);
    return total;
  }
  const dayformattedtime = formatTime(mockbardataday.time_ms).toPrecision(3);

  const [num_hours_sleeped, setNumHoursSleeped] = useState("0:00");
 
  /* se vuoi far chiudere l'app con il tasto indietro questo è il codice */

  useEffect(() => {
    var currentDate = new Date();
    setGiorno(currentDate);


    setNumHoursSleeped(dayformattedtime);

    const backAction = () => {
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
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
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
            onPress={() => navigation.navigate('Sonno_s',{hours_sleeped: dayformattedtime})}
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
                data: new Date(),
              })
            }
          >
            <View style={{ flex: 3 }}>
              <Card
                cornerRadius={30}
                style={{
                  backgroundColor: "#c6f68d",
                  flex: 3,
                  width: "95%",
                  margin:5,
                  marginBottom: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    s.header(4, "medium", "#008b00"),
                    { paddingTop: 10, width: "100%", textAlign: "center" },
                  ]}
                >
                  {" "}
                  Attività fisica{" "}
                </Text>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 50,
                      alignItems: "center",
                    }}
                  >
                    <ProgressChart
                      data={[0.8]}
                      width={Dimensions.get("screen").width / 3}
                      height={Dimensions.get("screen").height / 7}
                      strokeWidth={8}
                      radius={50}
                      hideLegend={true}
                      chartConfig={{
                        backgroundColor: "#c6f68d",
                        backgroundGradientFrom: "#c6f68d",
                        backgroundGradientTo: "#c6f68d",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 139, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                    />
                    <Text
                      style={[
                        s.header(3, "bold"),
                        { position: "absolute", top: "35%", color: "#008b00" },
                      ]}
                    >
                      {" "}
                      7898{" "}
                    </Text>
                    <FontAwesome5 name="running" size={32} color="#008b00" />
                  </View>
                  <View
                    style={{ padding: 20, alignItems: "center", width: 300 }}
                  >
                    <FontAwesome5 name="heartbeat" size={45} color="#008b00" />
                    <Text style={s.text("small", "#008b00")}>
                      {" "}
                      Ultimo battito registrato:{" "}
                    </Text>
                    <Text style={s.header(4, "medium", "#008b00")}>
                      {" "}
                      83 bpm{" "}
                    </Text>
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
              navigation.navigate("Alimentazione", {
                data: new Date(),
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
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
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
              </View>

              <View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "space-around",
                  marginBottom: 10,
                }}
              >
                <AlimentazioneRow titolo="Colazione"></AlimentazioneRow>
                <AlimentazioneRow titolo="Pranzo"></AlimentazioneRow>
                <AlimentazioneRow titolo="Cena"></AlimentazioneRow>
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
