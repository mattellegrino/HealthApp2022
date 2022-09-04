import { View, Text, Pressable} from 'react-native'
import React from 'react'
const s = require("../../core/styles");

export default function RadioButton(props) {
  return (
    <View style={{flex:1,flexDirection:"row",alignItems: "center"}}>
       <Pressable style={{padding:20,flex:1,flexDirection:"row",alignItems: "center"}} onPress={()=> props.handlechecked(props.number)}>
        {props.checked == props.number ?
        <View key={props.number} style={{marginRight: 8, borderRadius:50,borderWidth:3,backgroundColor:"#F9A825", borderColor:"black", height: 12, width:12}}/>
        :
        <View key={props.number} style={{marginRight: 8, borderRadius:50,borderWidth:1, borderColor:"black", height: 12, width:12}}/>}    
       
             <Text style={s.body("medium")}>{props.risposta}</Text>
        </Pressable> 
   </View> 
  )
}