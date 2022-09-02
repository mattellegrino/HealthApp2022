import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { RadioButton } from 'react-native-paper';
const s = require("../../../core/styles");


export default function Domanda(props) {

    const [checked, setChecked] = useState('first');

  return (
   <View>
     <View style={{padding:20}}>
       <Text style={s.header(3,"bold")}>Domanda n° {props.n_domanda + 1} </Text>
     </View>
     <View style={{padding:20, alignItems: "center"}}>
       <Text style={s.header(4,"medium")}> {props.testo} </Text>
     </View>
     
   </View>  
  )
}