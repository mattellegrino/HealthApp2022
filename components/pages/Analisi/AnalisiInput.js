import {View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import { Card } from 'react-native-shadow-cards';
import CustomInput from '../../CustomInput';
const s = require("../../../core/styles");



export default function AnalisiInput(props) {
    const [number, onChangeNumber] = React.useState(null);
    return (
        <View style={{flex:0,padding:20,borderColor:"grey"}}>
            <View style={{flex:0, justifyContent: 'space-between'}}>
               <View style={{marginBottom: 5}}>
                <Text style={s.body("medium")}>{props.medicaldata.name}</Text>
                </View> 
               <Card elevation={5} styles={styles.card}>
                <TextInput
                    onChangeText={onChangeNumber}
                    value={number}
                    style={s.input_num}
                    selectionColor={"grey"}
                    onBlur={ () => { props.medicaldata.value = number}}
                    placeholder="Inserisci valore"
                    keyboardType="numeric"
                />
                </Card> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

card: {
    borderRadius:50,
    padding:10
}
 


})