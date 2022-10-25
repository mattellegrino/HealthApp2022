import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");

const Battito_Cardiaco = (props) => {
  return (
    <View style={styles.container}>
      <Text style={s.header(3,"bold")}>{props.battiti} <Text style={s.smalltext("medium","black")}>bpm</Text></Text>
      <Text style={s.smalltext("medium","grey")}>{props.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

container: {

    padding:10,
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "grey"

}

})


export default Battito_Cardiaco;
