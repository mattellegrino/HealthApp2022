import React from 'react'
import {TextInput} from "react-native";
const styles = require("../../core/styles");
const  CustomInput = ({value,setValue,placeholder,secureTextEntry,onFocus,error,keyboardType, numericInput}) => {
    return (
                    <TextInput
                        onFocus={onFocus}
                        placeholder={placeholder}
                        selectionColor={"grey"}
                        style={numericInput? styles.input_num : styles.input}
                        value={value}
                        onChangeText={setValue}
                        secureTextEntry={secureTextEntry}
                        error={error}
                        keyboardType={keyboardType}
                    />
    )
}
export default CustomInput