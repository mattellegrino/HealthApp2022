import React from 'react'
import {View, Text,Pressable} from "react-native";
const s = require("../../core/styles");
const  CustomButton = ({onPress,text,button,fontSize}) => {

    return (
        <View style={{alignItems: "center" }}>
        <Pressable onPress={onPress} style={button == "first" ? s.primary_button : button == "second" ? s.secondary_button : s.tertiary_button}>
              {button === "first" 
                ? <Text style={s.primary_button_text(fontSize)}> {text} </Text>
                : button == "second" ?  
                <Text style={s.secondary_button_text(fontSize)}> {text} </Text>
                : 
                <Text style={s.tertiary_button_text(fontSize)}> {text} </Text>}
        </Pressable>
        </View>
    );

};

export default CustomButton