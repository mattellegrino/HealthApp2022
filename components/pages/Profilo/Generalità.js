import { View, Text } from 'react-native'
import React from 'react'
const s = require("../../../core/styles");

export default function Generalità(props) {



  return (
    <View style={{flex:0,paddingTop:20,paddingBottom: 20,borderBottomWidth: 0.5, borderColor:"grey"}}>
      <View style={{flex:0,flexDirection: 'row', justifyContent: 'space-between', alignItems:"baseline"}}>
        <Text style={s.body("medium")}> {props.nome}</Text>
        <View style={{flex:0,flexDirection:"row", alignItems:"center"}}>
        {props.nome == "Peso" && 
         <View style={{marginRight:15}}>{props.button}</View>
        }
        <Text style={s.text("regular")}> {props.valore} {props.unità} </Text>
        </View>
      </View>
    </View>
  )
}