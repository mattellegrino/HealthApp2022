import { View, Text, StyleSheet, StatusBar, Pressable} from 'react-native'
import React from 'react'
import { Card } from "react-native-shadow-cards";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const s = require("../../../core/styles");

export default function PastoRow(props) {

    const navigation = useNavigation();

  return (
   <Card cornerRadius={10}
   style={styles.card}>
       <Text style={s.header(3,"medium","#BB530B")}>{props.title}</Text>
       <Pressable onPress={()=>navigation.navigate("Alimenti",{
          data: new Date()
        })}>
        <Ionicons name="add-circle-outline" size={32} color="black" />
       </Pressable> 
   </Card>  
  )
}

const styles = StyleSheet.create({

    card: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#FFF9C4",
        padding: 20,
        borderRadius:20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    container: {
      
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },

    title: {
      fontSize: 32,
    },
  });