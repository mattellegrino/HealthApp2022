import {View, Text, Pressable, Alert, BackHandler} from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
const s = require("../../../core/styles");
import { useNavigation } from '@react-navigation/native';
import SignInPage from "../SignInPage";
import * as SecureStore from 'expo-secure-store';

export default function Impostazione(props) {

    const navigation = useNavigation();


   async function doLogout(){
       console.log("Logout")
       await SecureStore.deleteItemAsync('cookie')
       await SecureStore.deleteItemAsync('loggedUser')
       await fetch(`http://${global.enrico}:8080/logout`);
   }


  return ( <Pressable onPress={()=> {
          if (props.nome!== "Logout") navigation.navigate(props.nome)
          else {
              //doLogout
              Alert.alert("Arrivederci", "Sei sicuro di voler effettuare il Logout?", [
                  {
                      text: "Annulla",
                      onPress: () => null,
                      style: "cancel"
                  },
                  { text: "Si", onPress: async () => {
                          //doLogout() and redirect home screen
                          await doLogout().then(() =>  navigation.navigate('Home'));
                      } }
              ]);
          }
      }} style={{flex:0, alignItems:"center", flexDirection: "row",width: "100%", padding:20, borderBottomWidth: props.last ? 0:1, borderBottomColor: "#000"}}>
        <Ionicons name={props.icon_name} size={24} color={props.color ? props.color : "black"}></Ionicons>
        <Text style={[s.body("medium"),{marginLeft:10,color:props.color}]}>{props.nome}</Text>
        {props.freccia &&
        <Ionicons style={{marginLeft: "auto"}} name="chevron-forward-outline" size={24}></Ionicons>
        }
      </Pressable>  
  )
}