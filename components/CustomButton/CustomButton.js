import React, {useState} from 'react'
import {View, Text,Pressable,StyleSheet} from "react-native";
const s = require("../../core/styles");
export default function CustomButton ({onPress, text,button,fontSize, login}){

    const [shadow,setShadow] = useState(true);

    return (
    <Pressable onPress={onPress} onPressIn={()=>setShadow(false)} onPressOut ={()=> setShadow(true)}  style={{ width: login && "100%", alignItems: "center"}}>
        <View style={{width:"100%",position: "relative"}}>
            <View style={button === "first" ? s.primary_button : button === "second" ? s.secondary_button : s.tertiary_button}>
                {button === "first" && text
                    ? <Text style={s.primary_button_text(fontSize)}> {text.toUpperCase()} </Text>
                    : button === "second" && text ?
                    <Text style={s.secondary_button_text(fontSize)}> {text.toUpperCase()} </Text>
                    : 
                    <Text style={s.tertiary_button_text(fontSize)}> {text.toUpperCase()} </Text>}
            </View>
            {shadow && 
         <View style={button === "first" ? styles.shadow_primary : button === "second" ? styles.shadow_secondary : styles.shadow_tertiary}>
        </View>
        }
        </View>
       
    </Pressable>    
    );

};

const styles = StyleSheet.create({

        shadow_primary: {
            position:"absolute",
            elevation: -1,
            zIndex: -1,
            width:"100%",
            top:"50%",
            borderRadius:10,
            padding:10,
            opacity:0.5,
            backgroundColor:"black"
        },

        shadow_secondary: {
            position:"absolute",
            elevation: -1,
            zIndex: -1,
            width:"100%",
            top:"50%",
            borderRadius:10,
            padding:10,
            opacity: 0.5,
            backgroundColor:"black"
        },

        shadow_tertiary: {
            position:"absolute",
            elevation: -1,
            zIndex: -1,
            width:"100%",
            top:"50%",
            borderRadius:10,
            padding:10,
            backgroundColor:"#A47119"
        }

    }) 
