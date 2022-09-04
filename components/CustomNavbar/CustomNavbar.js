import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Card } from "react-native-shadow-cards";
const s = require("../../core/styles");

export default function CustomNavbar(props) {
  return (
    <View style={{flex:1,paddingRight:20,paddingLeft:20,justifyContent:"center"}}>
        <Card cornerRadius={10} elevation={3} style={{backgroundColor:"white",flex:0,flexDirection:"row",justifyContent:"space-between", borderWidth:0.2, borderColor:"white", borderRadius:30}}>
          {props.selezioni && props.selezioni.map((selezione,i)=> (

            <Pressable key={i} onPress={()=> props.handleselection(selezione)}>
            <View style={props.isSelected == selezione ? s.multichoicebutton_selected(props.type) : s.multichoicebutton_notselected}>
            <Text style={props.isSelected == selezione && s.text_selected(props.type)}> {selezione} </Text>
            </View> 
            </Pressable>

          ))}
        </Card> 
      </View>
  )
}