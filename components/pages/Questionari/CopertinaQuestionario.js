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
    <View style={{width: '100%',alignItems: 'center'}}>
     <Text style={[s.header(4,"medium"),{marginBottom: 20}]}>{props.titolo}</Text>
      <View style={s.copertina_questionario}>
       <Image source={"../../../assets/favicon.png"}></Image>
      </View> 
      <View style={{paddingTop:30}}>
       <Card cornerRadius={10} style={styles.card}>
        <CustomButton onPress={()=>navigation.navigate("Questionario", {
          nomequestionario : props.titolo,
          domande_e_risposte : props.domande_e_risposte,
          username:props.username,
           ip_add: props.ip_add,
           user:props.user
        })} text={compilato ? "Modifica" : "Compila"} fontSize="medium"/>
       </Card>         
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    width:"100%",
    alignItems:"center"
  },

})