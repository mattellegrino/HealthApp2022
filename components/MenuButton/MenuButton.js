import React from 'react'
import {View, Text,Pressable} from "react-native";
import { styles } from "../../core/styles";
const  MenuButton = ({onPress,text,button}) => {
    return (

        <View style={{ padding: 20, alignItems: "center" }}>
            <Pressable onPress={onPress} style={styles.primary_button}>
                {button === "first"? <Text style={styles.firstText}> {text} </Text>
                    : <Text style={styles.secondaryText}> {text} </Text> }
            </Pressable>
        </View>
    );

};

export default MenuButton