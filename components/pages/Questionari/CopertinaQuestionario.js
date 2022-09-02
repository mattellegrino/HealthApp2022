import { View, Text, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
const s = require("../../../core/styles");
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CopertinaQuestionario(props) {

  const navigation = useNavigation();

  return (
    <View style={{width: '100%',alignItems: 'center'}}>
     <Text style={[s.header(3,"medium"),{marginBottom: 20}]}>{props.titolo}</Text>
      <View style={s.copertina_questionario}>
       <Image source={"../../../assets/favicon.png"}></Image>
      </View> 
      <View style={{paddingTop:30}}>
       <Pressable onPress={()=>navigation.navigate("Questionario", {
         nomequestionario : props.titolo,
         domande_e_risposte : props.domande_e_risposte
       })}>
        <Ionicons name="create-outline" size={30}></Ionicons>  
       </Pressable>        
      </View> 
    </View>
  )
}