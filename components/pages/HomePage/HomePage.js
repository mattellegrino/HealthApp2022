import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Card } from "react-native-shadow-cards";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import CustomButton from "../../CustomButton/CustomButton"

const s = require("../../../core/styles");
const HomePage = ({ navigation, route }) => {
  /* se vuoi far chiudere l'app con il tasto indietro questo è il codice */
  /*
     useEffect(() => {
        const backAction = () => {
            Alert.alert("Arrivederci", "Sei sicuro di voler chiudere l'app?", [
                {
                    text: "Annulla",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Si", onPress: () => {
                    //doLogout()
                    BackHandler.exitApp()
                } }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
  */

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor:"#fff"}}>
      <View
        justifyContent="space-between"
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <View>
          <Text>
            <Text style={s.header(1,"regular")}>Ciao </Text>
            <Text style={s.header(1,"medium")}>Mario!</Text>
          </Text>
          <Text style={s.header(4,"regular")}>Questi sono i risultati di oggi</Text>
        </View>

        <View
          styles={{
            height: 100,
            width: 200,
            backgroundColor: "green",
          }}
        >
          <Text> </Text>
          <Pressable onPress={() => navigation.navigate("Impostazioni")}>
            <Ionicons name="settings-outline" size={32} />
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
          <Pressable style={{ flex: 2 }} onPress={() => navigation.navigate("Sonno")}>
            <View style={{ flex: 2}}>
              <Card cornerRadius={10}
               style={{
                  justifyContent: "space-around",
                  backgroundColor: "#E3F2FD",
                  flex: 2,
                  width: "95%",
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <Text style={[s.header(4,"medium","#1565C0"), {width: "100%",textAlign: "center" }]}>Sonno</Text>
                <Ionicons style={{}} name="moon-outline" size={50} color={"#1565C0"}/>
               <View style={{ alignItems: "center"}}>
                <Text style={[s.text("small","#1565C0")]}>Ore dormite la scorsa notte:</Text>
                <Text style={[s.header(2,"medium","#1565C0")]}> 6:35h </Text>
               </View>  
              </Card>
            </View>
          </Pressable>
        <Pressable style={{ flex: 3 }} onPress={() => navigation.navigate("Attività fisica")}>
         <View style={{ flex:3}}>
          <Card
            cornerRadius={10}
            style={{
              backgroundColor:"#c6f68d",
              flex: 3,
              width: "95%",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
           
            <Text style={[ s.header(4,"medium","#008b00"),{ paddingTop: 10, width: "100%", textAlign: "center" }]}> Attività fisica{" "}</Text>
             <View style={{width: "100%", alignItems: "center",justifyContent: "space-around"}}>
               <View style={{paddingTop:10,paddingBottom:50, alignItems: "center"}}>
                <ProgressChart
                  data={[0.8]}
                  width={150}
                  height={90}
                  strokeWidth={10}
                  hideLegend={true}
                  chartConfig={{
                    backgroundColor: "#c6f68d",
                    backgroundGradientFrom: "#c6f68d",
                    backgroundGradientTo: "#c6f68d",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 215, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
                 <Text style={[s.body("bold"),{position:"absolute", top:45, color:"#008b00"}]}> 7898 </Text>
                 <FontAwesome5 name="running" size={32} color="#008b00" />
                </View>
                <View style={{padding: 20, alignItems: "center", width:300 }}>
                 <FontAwesome5 name="heartbeat" size={45} color="#008b00" />
                 <Text style={s.text("small","#008b00")}> Ultimo battito registrato: </Text>
                 <Text style={s.header(4,"medium","#008b00")}> 83 bpm </Text>
                </View>
                 
            </View> 
          </Card>
          </View>
         </Pressable> 
        </View>
        <View style={{flex: 1, flexDirection: "column"}}>
          <Card
            cornerRadius={10}
            style={{
              backgroundColor: "#FFF9C4",
              flex: 5,
              width: "95%",
              marginBottom: 15,
              marginLeft: 5,
              alignItems: "center"
            }}
          >
            <Text style={[s.header(4,"medium","#F9A825"),{ paddingTop: 15, width: "100%", textAlign: "center" }]}>Questionari</Text>
            <View style={{alignItems:"center", paddingTop: 30}}> 
              <Ionicons name="thumbs-up-outline" size={32}></Ionicons>
              <Text style = {[s.smalltext("regular"), {textAlign: "center"}]}>Compila almeno un questionario per vedere i Consigli della Settimana </Text>
            </View>
            <View style={{alignItems:"center",paddingTop: 30}}>
              <Text style = {s.body("medium")}> Hai ancora </Text>
              <Text style = {s.header(3,"medium")}> 3 </Text>
              <Text style = {[s.body("medium"), {textAlign: "center"}]}> questionari da {'\n'} compilare </Text>
            </View>
            <View style={{paddingTop: 30}}>
             <CustomButton onPress={()=> navigation.navigate("Questionari")} text="Compila" fontSize="medium"></CustomButton>
            </View>  
          </Card>
         <Pressable style={{flex:3}} onPress={()=>navigation.navigate("Progressi")}> 
          <Card
            cornerRadius={10}
            style={{
              flex: 3,
              width: "95%",
              marginBottom: 10,
              marginLeft: 5,
              alignItems: "center",
            }}
          >
            <Text style={[s.header(4,"medium"),{ paddingTop: 10, width: "100%", textAlign: "center" }]}>Progressi</Text>
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
});
export default HomePage;
