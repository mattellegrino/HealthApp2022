import React from 'react'
import {TextInput} from "react-native";
const styles = require("../../core/styles");
const  CustomInput = ({value,setValue,placeholder,secureTextEntry,onFocus,error}) => {
    return (
                    <TextInput
                        onFocus={onFocus}
                        placeholder={placeholder}
                        selectionColor={"grey"}
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        secureTextEntry={secureTextEntry}ù
                        error={error}
                    />
    )
}
export default CustomInput