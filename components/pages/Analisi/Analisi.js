import {View, Text, ScrollView, SafeAreaView, Alert, ActivityIndicator, StyleSheet, Keyboard, Button} from 'react-native'
import React, {useState, useEffect} from 'react'
import AnalisiInput from "./AnalisiInput";
import CustomButton from "../../CustomButton";
import Analisi_Component from './Analisi_Component';
const s = require("../../../core/styles");

export default function Analisi({navigation}) {
    

    const [isLoading, setLoading] = useState(true);
    const [bloodValues,setBloodValues] = useState([]);

    const getBloodValuesById = () => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/bloodAnalysis`)
            .then((response) => response.json())
            .then((json) =>{ 
                let array_analisi = bloodValues;
                array_analisi.push(json); 
                setBloodValues(array_analisi)})
            .catch((error) => { console.error(error)})
            .finally(() => {
                setLoading(false)
            });
         }



    useEffect(() => {
        getBloodValuesById();
      
    }, []);

   

    return (
            
        <ScrollView style={styles.container}>

          <View style={styles.button}>
           <CustomButton onPress={()=> navigation.navigate('Inserimento Analisi')} text={"Inserisci nuova analisi"} button={"first"} fontSize={"medium"}/> 
        {isLoading ? <ActivityIndicator/> :
            (
                bloodValues.map((analisi) => (
                    <View styles={styles.analisi}>
                         <Analisi_Component navigation={navigation} date={analisi[0].date} analisi_data={analisi[0]}/>
                    </View>
            )))}
            
          </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:"white"
    },

    button: {
        marginTop: 40,
    },
    analisi: {
        flex:1,
        padding:10
    }
})