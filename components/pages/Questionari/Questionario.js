import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Domanda from "./Domanda";
import CustomButton from "../../CustomButton";
import { RadioButton } from 'react-native-paper';
const s = require("../../../core/styles");

export default function Questionario({route,navigation},props) {

  const {nomequestionario,domande_e_risposte} = route.params;
  const [n_domanda,setNumeroDomanda] = useState(0);
 

  return (
    <View style={s.container}>
      <Text style={s.header(2,"bold")}>{nomequestionario}</Text>
      <View style={{flex:1, flexDirection: "row", alignItems:"center",justifyContent:"space-around", width:"80%"}}>
        {domande_e_risposte.map((_,i)=> (
           <View key={i} style={n_domanda >= i ? s.progress_rectangle_active : s.progress_rectangle}></View>
        ))}
       
      </View>  
      <View style={{flex:5, width: "80%", borderWidth:1, borderRadius:15, marginBottom:50}}>
       <Domanda n_domanda={n_domanda} testo={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].testo : ""} risposte={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].risposte : ""}></Domanda>
      </View>  
      <View style={{flex:1, flexDirection:"row", width: "80%", justifyContent: "space-around"}}>
      {n_domanda > 0 && (
        <CustomButton button="second" onPress={()=> setNumeroDomanda(n_domanda - 1)} text="Precedente" fontSize="medium"/> )}
      {n_domanda + 1 == domande_e_risposte.length ? <CustomButton onPress={()=> navigation.navigate("Questionari")} fontSize="medium" text="Concludi"></CustomButton> :
        <CustomButton onPress={()=> setNumeroDomanda(n_domanda + 1)} text="Prossima" fontSize="medium"/>}
      </View>
    </View>
  );
}
