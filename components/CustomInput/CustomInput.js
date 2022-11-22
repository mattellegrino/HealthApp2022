import React from 'react'
import {TextInput, StyleSheet} from "react-native";
const s = require("../../core/styles");
const  CustomInput = ({value,setValue,placeholder,secureTextEntry,onFocus,error,keyboardType, numericInput}) => {
    return (
                    <TextInput
                        onFocus={onFocus}
                        placeholder={placeholder}
                        selectionColor={"grey"}
                        style={numericInput? s.input_num : styles.input}
                        value={value}
                        onChangeText={setValue}
                        secureTextEntry={secureTextEntry}
                        error={error}
                        keyboardType={keyboardType}
                    />
    )
}

const styles = StyleSheet.create({

    input : {
        width: "100%",
        borderWidth:1,
        marginBottom:20,
        borderRadius: 20,
        padding:10
    }
})
export default CustomInput