import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import RadioButton from '../../RadioButton/RadioButton';
const s = require("../../../core/styles");


export default function Domanda(props) {

    const [checked, setChecked] = useState(-1);

    const handlechecked = (number,risposta) => {

     let _questionAnswer = props.questionAnswer;
     _questionAnswer.chosenAnswer.id = number;
     _questionAnswer.chosenAnswer.text = risposta;

      console.log(_questionAnswer);

     props.editQuestionAnswers(_questionAnswer);
    }


  return (
   <View style={styles.container}>
     <View style={{flex:0.5,alignItems: "center"}}>
       <Text style={s.body("regular")}>Domanda n° {props.n_domanda + 1} </Text>
     </View>
     <View style={{flex:1,alignItems: "center"}}>
       <Text style={s.header(3,"medium")}>{props.testo}</Text>
     </View>
     <View style={{flex:4}}>
      {props.risposte && props.risposte.map((risposta,i)=> (
        <RadioButton questionAnswer = {props.questionAnswer} checked={checked} key={i} number={i} risposta={risposta.text} handlechecked = {handlechecked} />
      ))}
    </View>
   </View>  
  )
}

const styles = StyleSheet.create({

  container: {
    padding:10, 
    flex:1,
    borderWidth:1,
    borderRadius:25, 
  }

})