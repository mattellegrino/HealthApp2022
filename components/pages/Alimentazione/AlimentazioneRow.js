import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
const s = require("../../../core/styles");

export default function AlimentazioneRow(props) {
  return (
    <View style={{flex:0, flexDirection: "row",justifyContent:"space-between",marginLeft:10,marginRight:10}}>
      <Text>{props.titolo}</Text>
      <FontAwesome5 name="check-circle" size={20} color="black" />
    </View>
  )
}