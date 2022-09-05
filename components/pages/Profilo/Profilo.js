import { View, Text } from 'react-native'
import React from 'react'
import Generalità from './Generalità'
const s = require("../../../core/styles");

export default function Profilo() {
  return (
    <View style={{flex:1, backgroundColor:"white" }}>
      <View style={{flex:1, alignItems: "center"}}>
        <View style={{flex:0,marginTop:30, width:"80%",flexDirection:"row", justifyContent: "space-between"}}>
            <Text> IMMAGINE </Text>
            <View style={{marginLeft:20}}>
                <Text style={s.header(3,"regular")}>Nome Cognome</Text>
                <Text style={s.body("regular")}>Email </Text>
            </View>
        </View>
      </View>
      <View style={{flex:3, width:"80%", alignSelf:"center"}}>
         <Generalità nome="Sesso"></Generalità>
         <Generalità nome="Data di nascita"></Generalità>
         <Generalità nome="Altezza"></Generalità>
         <Generalità nome="Peso"></Generalità>
      </View>        
    </View>
  )
}