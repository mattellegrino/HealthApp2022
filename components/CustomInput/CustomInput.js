import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, View} from "react-native";
const s = require("../../core/styles");
const  CustomInput = ({value,setValue,placeholder,eye,onFocus,error,keyboardType, numericInput}) => {
const [showPassword,setShowPassword] = useState(true);

const handleShowPassword = () => {

    setShowPassword(!showPassword);

}
    
    return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize='none'
                    onFocus={onFocus}
                    placeholder={placeholder}
                    selectionColor={"grey"}
                    style={numericInput? s.input_num : styles.input}
                    value={value}
                       onChangeText={setValue}
                       secureTextEntry={eye ? showPassword : false}
                       error={error}
                       keyboardType={keyboardType}
                    />
                {eye ?    
                <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.visibilityBtn}
                      onPress={handleShowPassword}>
                    <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        style={styles.btnImage}
                        size={24}
                    />
                </TouchableOpacity>
                :
                <></>
                }
            </View>    
    )
}

const styles = StyleSheet.create({

    input : {
        position:"relative",
        width: "100%",
        borderWidth:1,
        marginBottom:20,
        borderRadius: 20,
        padding:10
    },
    container: {
        flex: 0,
        justifyContent:"center",
        alignItems: "center",
    },
    inputFlex: {
        alignSelf: 'stretch',
        width: '100%',
        padding: 0,
        backgroundColor: '#ddd'
    },
    visibilityBtn: {
        position: 'absolute',
        right: 20,
        top:15,
        height:24,
        width: 24,
        padding: 0,
    },
})
export default CustomInput