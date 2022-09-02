import { View, Text, Pressable } from "react-native";
import React, {useState} from "react";
import Navbar from "../../Navbar/Navbar";
import CustomButton from "../../CustomButton/CustomButton";
import CopertinaQuestionario from "./CopertinaQuestionario";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");

export default function Questionari({navigation}) {

  const [isSelected,setIsSelected] = useState("Tutti");
 

  return (
    <View style={{ flex:8, width:"100%"}}>
      <View style={{flex:1,paddingRight:20,paddingLeft:20,justifyContent:"center"}}>
       <View style={{backgroundColor:"white",flex:0,flexDirection:"row",justifyContent:"space-between", borderWidth:0.2, borderColor:"white", borderRadius:30}}>
       <Pressable onPress={()=> setIsSelected("Tutti")}>
       <View style={isSelected == "Tutti" ? s.multichoicebutton_selected : s.multichoicebutton_notselected}>
        <Text style={isSelected == "Tutti" && s.text_selected}> Tutti </Text>
       </View> 
       </Pressable>  
       <Pressable onPress={()=> setIsSelected("Compilare")}>
       <View style={isSelected == "Compilare" ? s.multichoicebutton_selected : s.multichoicebutton_notselected}>
        <Text style={isSelected == "Compilare" && s.text_selected}> Da compilare </Text>
       </View>
       </Pressable> 
       <Pressable onPress={()=> setIsSelected("Compilati")}>
       <View style={isSelected == "Compilati" ? s.multichoicebutton_selected : s.multichoicebutton_notselected}>
        <Text style={isSelected == "Compilati" && s.text_selected}> Compilati </Text>
       </View>       
       </Pressable> 
       </View> 
      </View>

      <View style={{flex: 4, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <CopertinaQuestionario titolo={"Cereali"}></CopertinaQuestionario>
        <CopertinaQuestionario titolo={"Insomnia"}></CopertinaQuestionario>
        <CopertinaQuestionario titolo={"Medas"}></CopertinaQuestionario>
      </View>

     <Pressable style={{flex:2}}onPress={()=> navigation.navigate("Peso")}>
      <View style={{flex: 2, alignItems:"center", justifyContent:"center"}}>
      <Card cornerRadius={10}
               style={{
                  backgroundColor: "#FFF9C4",
                  flex: 0,
                  width: "90%",
                  marginBottom: 15,
                  alignItems: "center",
                  padding:20, borderRadius:20, flexDirection:"row"
                }}
              >
         <Ionicons name="bar-chart" size={24} color="#F9A825" /> 
         <Text style={[s.header(4,"regular"),{color:"#000",marginLeft:"20%"}]}> Inserisci il tuo peso </Text>    
       </Card> 
      </View>
      </Pressable>  

      <View style={{flex: 3, alignItems:"center", justifyContent:"center"}}>
        <View style={{flex:1,borderTopColor:"#000",borderTopWidth:2,width:"100%",alignItems: "center",padding:15}}>
         <Text style={s.header(2,"bold")}> I consigli della settimana </Text>
         <Text style={[s.header(4,"regular"),{textAlign: "center", color:"#000",padding:45}]}> Completa almeno un questionario per vedere i consigli della settimana </Text> 
        </View>        
        <View>
          
        </View>    
      </View>

    </View>
  );
}
