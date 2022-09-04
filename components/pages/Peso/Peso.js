import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");

export default function Peso({ navigation }) {
  return (
    <View style={s.container}>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FontAwesome5 name="weight" size={94} color="black" />
        <View style={{flex:0, alignItems: "center"}}>
          <Text style={s.header(3,"medium")}>Inserisci Peso</Text>
          <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
            <TextInput style={styles.input} keyboardType="numeric"></TextInput>
            <Text style={s.header(3, "bold")}> Kg </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          fontSize="big"
          text={"Salva"}
          onPress={() => navigation.navigate("Questionari")}
        ></CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
});
