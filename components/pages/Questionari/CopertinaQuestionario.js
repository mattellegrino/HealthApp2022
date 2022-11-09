import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card } from "react-native-shadow-cards";
import React, {useState} from 'react'
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CopertinaQuestionario(props) {
    const navigation = useNavigation();

  const [compilato,setCompilato] = useState(false);

  return (
  
    <View style={styles.container}>
    <View><Text style={[s.header(3,"bold"),styles.title]}>{props.titolo}</Text></View>
    <View style={styles.button}><CustomButton onPress={()=>navigation.navigate("Questionario", {
          nomequestionario : props.titolo,
          domande_e_risposte : props.domande_e_risposte,
          username:props.username,
           ip_add: props.ip_add,
           user:props.user,
           update:props.update,
            questionnaireTemplateId: props.questionnaireTemplateId
        })} text={compilato ? "Visualizza" : "Compila"} fontSize="medium"/></View>
    </View>
  )
}



  const styles = StyleSheet.create({

    container: {
    flex:1,
    width: "95%",
    height: "20%",
    justifyContent:"space-between",
    borderRadius: 20,
    borderWidth: 1,
    height: 100,
    margin:30,
    padding:10
    },

    title: {
     alignSelf: "center",
     borderBottomWidth:1,
     width:"80%"   
    },

    button: {
      alignSelf:"flex-end"
    }

})
