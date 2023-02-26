import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from 'react-native-shadow-cards';

export default function CopertinaQuestionario(props) {
    const navigation = useNavigation();

  const [compilato,setCompilato] = useState(false);

  return (
  
    <Card elevation={5} style={styles.container}>
      <View style={styles.firstline}>
        <View><Text style={[s.header(3,"bold"),styles.title]}>{props.titolo}</Text></View>
      </View>
    <View style={styles.secondline}>
      
      <Text style={styles.text}> {props.compilato !==undefined && ("Compilato il  " + props.submissionDate/*props.submissionDate.split("T")[0]*/)} </Text>
    
     <View style={styles.button}>
      <CustomButton onPress={()=>navigation.navigate("Questionario", {
          nomequestionario : props.titolo,
          domande_e_risposte : props.domande_e_risposte,
          compiledAnswers:props.compiledAnswers,
          username:props.username,
          user:props.user,
          compilato:props.compilato,
          questionnaireTemplateId: props.questionnaireTemplateId
        })} text={props.compilato !== undefined ? "VISUALIZZA" : "COMPILA"} fontSize="small"/> 
        </View>
    </View>
    </Card>
  )
}



  const styles = StyleSheet.create({

    container: {
    flex:1,
    width: "95%",
    height: "20%",
    justifyContent:"space-between",
    borderRadius: 20,
    margin:30,
    padding:15
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
      alignSelf:"flex-end",
    },

    firstline: {
     marginBottom:10
    },

    secondline: {
      flex:0, flexDirection: "row",justifyContent: "space-between",alignItems: "baseline"
    }

})
