import React from 'react'
import {TextInput} from "react-native";
import { styles } from "../../core/styles";
const  CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
    return (
                    <TextInput
                        placeholder={placeholder}
                        selectionColor={"grey"}
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        secureTextEntry={secureTextEntry}
                    />
    )
}
export default CustomInput