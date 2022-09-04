import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");

export default function Impostazione(props,navigation) {
  return (
    <Pressable style={{flex:0, alignItems:"center", flexDirection: "row",width: "100%", padding:20, borderBottomWidth: props.last ? 0:1, borderBottomColor: "#000"}}>
        <Ionicons name={props.icon_name} size={24} color={props.color ? props.color : "black"}></Ionicons>
        <Text style={[s.body("medium"),{marginLeft:10,color:props.color}]}>{props.nome}</Text>
        {props.freccia &&
        <Ionicons style={{marginLeft: "auto"}} name="chevron-forward-outline" size={24}></Ionicons>
        }
      </Pressable>  
  )
}