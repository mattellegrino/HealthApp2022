import { View, Text } from 'react-native'
import React, {useState} from 'react'
import RadioButton from '../../RadioButton/RadioButton';
const s = require("../../../core/styles");


export default function Domanda(props) {

    const [checked, setChecked] = useState(-1);


    const handlechecked = (number,risposta) => {

      setChecked(number);

    }

  return (
   <View style={{padding:20, flex:1}}>
     <View style={{flex:1}}>
       <Text style={s.header(3,"bold")}>Domanda n° {props.n_domanda + 1} </Text>
     </View>
     <View style={{flex:1,alignItems: "flex-start"}}>
       <Text style={s.header(4,"medium")}>{props.testo}</Text>
     </View>
     <View style={{flex:4}}>
      {props.risposte && props.risposte.map((risposta,i)=> (
        <RadioButton checked={checked} key={i} number={i} risposta={risposta} handlechecked = {handlechecked} />
      ))}
    </View>
   </View>  
  )
}