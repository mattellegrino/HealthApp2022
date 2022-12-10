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
            .then((response) => response.text())
            .then((json) =>{
                let bloodAnalysisArray = JSON.parse(json);
                setBloodValues(bloodAnalysisArray)})
            .catch((error) => { 
                console.log(error.message);
                throw error})
            .finally(() => {
                setLoading(false)
            });
         }



    useEffect(() => {
        getBloodValuesById();
    }, []);

   

    return (
            
        <ScrollView style={styles.container}>
          <View>  
            <View style={styles.button}>
            <CustomButton onPress={()=> navigation.navigate('Inserimento Analisi')} text={"Inserisci nuova analisi"} button={"first"} fontSize={"small"}/> 
            </View>
        {isLoading ? <ActivityIndicator/> :
            (
                bloodValues.map((analisi,i) => (
                    <View key={i} styles={styles.analisi}>
                         <Analisi_Component navigation={navigation} date={analisi.date} analisi_data={analisi}/>
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

    analisi: {
        flex:1,
        marginTop: 30,
    },

    button: {
        alignSelf: "center"
        
    }
})