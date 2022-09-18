import { View, Text } from 'react-native'
import React from 'react'
const s = require("../../core/styles");

export default function Recommendation() {
  return (
    <View style={{flex: 3, alignItems:"center", justifyContent:"center"}}>
        <View style={{flex:1,borderTopColor:"#000",borderTopWidth:2,width:"100%",alignItems: "center",padding:15}}>
         <Text style={s.header(2,"bold")}> I consigli della settimana </Text>
         <Text style={[s.header(4,"regular"),{textAlign: "center", color:"#000",padding:45}]}> Completa almeno un questionario per vedere i consigli della settimana </Text> 
        </View>        
        <View>
          
        </View>    
      </View>
  )
}