import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '../../CustomButton'
const s = require("../../../core/styles");

const Analisi_Component = (props) => {

  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View><Text style={[s.body("bold"),styles.title]}>Analisi del {props.date}</Text></View>
      <View style={styles.button}><CustomButton onPress={()=> navigation.navigate("Analisi_Output", {
        analisi_data: props.analisi_data
      })} text={"Visualizza"} fontSize={"small"} button="first" ></CustomButton></View>
    </View>
  )
}

export default Analisi_Component


const styles = StyleSheet.create({

    container: {
    flex:1,
    justifyContent:"space-between",
    borderRadius: 20,
    borderWidth: 1,
    height: 100,
    margin:20,
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