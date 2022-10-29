import { View, Text, Pressable, StyleSheet} from 'react-native'
import React from 'react'
const s = require("../../core/styles");

export default function RadioButton(props) {
  return (
    <View style={{flex:1,flexDirection:"row",alignItems: "center"}}>
       <Pressable style={{padding:20,flex:1,flexDirection:"row",alignItems: "center"}} onPress={()=> props.handlechecked(props.number)}>
          <View key={props.number} style={props.checked == props.number ? styles.buttonRispostaSelected(true) : styles.buttonRispostaSelected(false)}>
            <Text style={s.header(4,props.checked == props.number ? "medium" : "regular","black")}>{props.risposta}</Text>
          </View>
        </Pressable> 
   </View> 
  )
}

const styles = StyleSheet.create({

  buttonRispostaSelected: selected => ({
    marginRight: 8, 
    borderRadius:50,
    height:50,
    padding: 0,
    flex:0,
    alignItems: "center",
    justifyContent: "center",
    width:"100%",
    backgroundColor: selected ? "#F9A825" : "#e2e2e2", 
    borderColor:"black"
  })

})