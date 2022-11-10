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
    <View style={styles.secondline}>
      
      <Text style={styles.text}> {props.compilato !=undefined && ("Compilato il   " + props.submissionDate/*props.submissionDate.split("T")[0]*/)} </Text>
    
    <View style={styles.button}>
      <CustomButton onPress={()=>navigation.navigate("Questionario", {
          nomequestionario : props.titolo,
          domande_e_risposte : props.domande_e_risposte,
          compiledAnswers:props.compiledAnswers,
          username:props.username,
           ip_add: props.ip_add,
           user:props.user,
           compilato:props.compilato,
           update:props.update,
            questionnaireTemplateId: props.questionnaireTemplateId
        })} text={props.compilato != undefined ? "Visualizza" : "Compila"} fontSize="medium"/></View>
    </View>
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
    margin:30,
    padding:10
    },

    text: {
      alignSelf:"flex-end"
    },

    title: {
     alignSelf: "center",
     borderBottomWidth:1,
     width:"80%"   
    },

    button: {
      alignSelf:"flex-end"
    },

    secondline: {
      flex:0, flexDirection: "row",justifyContent: "space-between",alignItems: "baseline"
    }

})
