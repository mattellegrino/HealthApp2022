import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CiboCard() {
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

})