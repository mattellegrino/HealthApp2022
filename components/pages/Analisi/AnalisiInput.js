import {View, Text, TextInput} from 'react-native'
import React from 'react'
const s = require("../../../core/styles");



export default function AnalisiInput(props) {
    const [number, onChangeNumber] = React.useState(null);
    return (
        <View style={{flex:0,paddingTop:20,paddingBottom: 20,borderBottomWidth: 0.5, borderColor:"grey"}}>
            <View style={{flex:0,flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={s.body("medium")}> {props.medicaldata.name} </Text>
                <TextInput
                    onChangeText={onChangeNumber}
                    value={number}
                    onBlur={ () => { props.medicaldata.value = number}}
                    placeholder="valore"
                    keyboardType="numeric"
                />
            </View>
        </View>
    )
}