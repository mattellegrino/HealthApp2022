import { View, Text, Image } from 'react-native'
import React from 'react'
const s = require("../../../core/styles");
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CopertinaQuestionario() {
  return (
    <View style={{width: '100%',alignItems: 'center'}}>
     <Text>Cerealsi</Text>
      <View style={s.copertina_questionario}>
       <Image source={"../../../assets/favicon.png"}></Image>
      </View> 
      <View style={{paddingTop:30}}>
       <Ionicons name="create-outline" size={20}></Ionicons>  
      </View> 
    </View>
  )
}