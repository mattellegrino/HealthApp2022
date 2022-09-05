import { View, Text } from 'react-native'
import React from 'react'
const s = require("../../../core/styles");

export default function Generalità(props) {
  return (
    <View style={{flex:0,paddingTop:20,paddingBottom: 20,borderBottomWidth: 0.5, borderColor:"grey"}}>
      <View style={{flex:0,flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={s.body("medium")}> {props.nome} </Text>
        <Text style={s.text("regular")}> Valore </Text>
      </View>
    </View>
  )
}