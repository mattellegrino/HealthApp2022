import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from "react-native-shadow-cards";
const s = require("../../core/styles");

export default function CustomNavbar(props) {
  return (
    <View style={styles.container}>
        <Card cornerRadius={10} elevation={5} style={{
           flex:0,
           backgroundColor:"white",
           flexDirection:"row",
           justifyContent:"space-between", 
           borderWidth:0.2, 
           borderColor:"white", 
           borderRadius:30}}>
          {props.selezioni && props.selezioni.map((selezione,i)=> (

            <Pressable key={i} onPress={()=> props.handleselection(selezione)}>
            <View style={props.isSelected === selezione ? s.multichoicebutton_selected(props.type) : s.multichoicebutton_notselected}>
            <Text style={props.isSelected === selezione ? s.text_selected(props.type) : s.smalltext("bold")}> {selezione.toUpperCase()} </Text>
            </View> 
            </Pressable>

          ))}
        </Card> 
      </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    paddingLeft:5,
    justifyContent:"center",
    marginTop:10
  }


})