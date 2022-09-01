import React from 'react'
import {View, Text,Pressable} from "react-native";
const s = require("../../core/styles");
const  CustomButton = ({onPress,text,button,fontSize}) => {

    return (
        <View style={{ paddingTop:30, alignItems: "center" }}>
        <Pressable onPress={onPress} style={s.primary_button}>
              {button === "first" 
                ? <Text style={s.primary_button_text(fontSize)}> {text} </Text>
                : <Text style={s.secondary_button_text(fontSize)}> {text} </Text> }
        </Pressable>
        </View>
    );

};

export default CustomButton