import { View, Text, Pressable } from "react-native";
import React, {useState} from "react";
import Navbar from "../../Navbar/Navbar";
import CustomButton from "../../CustomButton/CustomButton";
import CopertinaQuestionario from "./CopertinaQuestionario";
const s = require("../../../core/styles");

export default function Questionari() {

  const [isSelected,setIsSelected] = useState("Tutti");
 

  return (
    <View style={{ flex:8, width:"100%"}}>
      <View style={{flex:1, paddingTop:20}}>
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

      <View style={{flex: 4, flexDirection: "row", justifyContent: "space-around"}}>
        <CopertinaQuestionario></CopertinaQuestionario>
        <CopertinaQuestionario></CopertinaQuestionario>
        <CopertinaQuestionario></CopertinaQuestionario>
      </View>

      <View style={{flex: 1}}>
        <Text> Inserisci il tuo peso </Text>
      </View>

      <View style={{flex: 2}}>
        <Text> Inserisci il tuo peso </Text>
      </View>

    </View>
  );
}
