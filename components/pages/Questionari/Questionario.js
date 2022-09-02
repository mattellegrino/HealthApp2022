import { View, Text } from "react-native";
import React, {useState} from "react";
import Domanda from "./Domanda";
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");

export default function Questionario({route,navigation},props) {

  const {nomequestionario} = route.params;
  const [n_domanda,setNumeroDomanda] = useState(1);

  return (
    <View style={s.container}>
      <Text style={s.header(2,"bold")}>{nomequestionario}</Text>
      <View style={{flex:1, flexDirection: "row"}}>
        <View></View>
        <View></View>
        <View></View>
      </View>  
       <Domanda n_domanda={n_domanda}></Domanda>
        <CustomButton onPress={()=> setNumeroDomanda(n_domanda + 1)} text="Prossima"/>
        {n_domanda > 1 && (
        <CustomButton onPress={()=> setNumeroDomanda(n_domanda - 1)} text="Precedente"/> )}
    </View>
  );
}
