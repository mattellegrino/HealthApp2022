import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ValoriNutrizionaliBox from './ValoriNutrizionaliBox';
const s = require("../../../core/styles");

export default function CaloriesBox() {
  return (
    <View style={styles.container}>
      
       <View style={styles.first}>
         <Text style={s.body("regular")}>Calorie consumate</Text>
         
         <Text> 
            <Text style={s.header(2,"bold")}> 2 </Text>
            <Text style={s.smalltext("medium")}> / 2.345 </Text>
        
        </Text>
       </View> 
       
       <View style={styles.second}>
         <ValoriNutrizionaliBox nome="Carboidrati"/>
         <ValoriNutrizionaliBox nome="Grassi"/>
         <ValoriNutrizionaliBox nome="Proteine"/>
       </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1.5,
      alignItems: 'center',
      padding:10,
      borderWidth: 1,
      borderRadius:20,
      margin:15,
      height:"100%",
      backgroundColor:"#FFF"
    },

    first: {
     flex:1,
     backgroundColor:"#fff",
     alignItems: 'center',
     justifyContent:"center",
     height:"100%",
     width:"100%",
     borderBottomWidth:1
    },

    second: {
     flex:1,
     flexDirection:"row",
     justifyContent: "space-around",
     alignItems: 'center',
     width:"100%",
     
    }
  });