import { View, Text } from "react-native";
import React from "react";
import Impostazione from "./Impostazione";

export default function Impostazioni() {
  return (
    <View style={{flex:1, padding:20, backgroundColor:"#fff"}}>
      <Impostazione nome="Profilo" freccia={true} icon_name="person-outline"></Impostazione>
      <Impostazione nome="Logout" freccia={false} icon_name="log-out-outline" color="red" last={true}></Impostazione>
    </View>
  );
}
