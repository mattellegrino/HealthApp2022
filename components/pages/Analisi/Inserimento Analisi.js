import {View, Text, ScrollView, SafeAreaView, Dimensions,StyleSheet,Alert, ActivityIndicator, Keyboard, Button} from 'react-native'
import React, {useState} from 'react'
import AnalisiInput from "./AnalisiInput";
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");

const Inserimento_Analisi = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);
    let   [finished, setFinished] = useState(undefined)
    let date = formatDate();
    let eritrociti={ name: "Eritrociti (x10^12/L)", value: null}
        ,emoglobina={ name: "Emoglobina (g/dL)", value: null}
        ,mcv= { name: "MCV (fL)", value: null}
        ,ht = { name: "HT (%)", value: null}
        ,leucociti= { name: "Leucociti (x10^9/L)", value: null}
        ,piastrine = { name: "Piastrine (x10^9/L)", value: null}
        ,glicemia= { name: "Glicemia (mg/dL)", value: null}
        ,urea = { name: "Urea (mg/dL)", value: null}
        ,na= { name: "Sodio (mmol/L)", value: null}
        ,k= { name: "Potassio (mmol/L)", value: null}
        ,creatinina= { name: "Creatinina (mg/dL)", value: null}
        ,colesterolo_totale= { name: "Colesterolo Totale (mg/dL)", value: null}
        ,colesterolo_hdl ={ name: "Colesterolo HDL (mg/dl)", value: null}
        ,trigliceridi= { name: "Trigliceridi (mg/dL)", value: null}
        ,pcr= { name: "PCR (mg/L)", value: null}
    ;



    let inputs = [eritrociti,
        emoglobina,
        mcv,
        ht,
        leucociti,
        piastrine,
        glicemia,
        urea,
        na,
        k,
        creatinina,
        colesterolo_totale,
        colesterolo_hdl,
        trigliceridi,
        pcr];


    function formatDate() {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    async function postMedicalValues() {
        return new Promise ((resolve, reject) => {
            fetch(`${global.endpoint}/api/patients/${global.id}/bloodAnalysis`, {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body:  JSON.stringify(
                    {
                        "eritrociti": eritrociti.value,
                        "emoglobina": emoglobina.value,
                        "mcv": mcv.value,
                        "ht": ht.value,
                        "leucociti": leucociti.value,
                        "piastrine": piastrine.value,
                        "glicemia": glicemia.value,
                        "urea": urea.value,
                        "na": na.value,
                        "k": k.value,
                        "creatinina": creatinina.value,
                        "colesterolo_totale": colesterolo_totale.value,
                        "colesterolo_hdl": colesterolo_hdl.value,
                        "trigliceridi": trigliceridi.value,
                        "pcr": pcr.value,
                        "date": date
                    }
                )
            })
                .then((response) => {
                    if(response.ok)
                    {
                        setFinished(true);
                        Alert.alert("Analisi del sangue inviata!");
                        // go to main page
                        navigation.navigate('Impostazioni')
                    }

                })
                .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                     // ADD THIS THROW error
                      throw error;
                    })
        })
    }

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
        let element;

        for(element of inputs)
        {
            if(element.value===null || isNaN(element.value))
            {

                isValid=false;
                break;
            }
        }

        return isValid;

    };

  return (
   <View style={styles.scrollview}>
             <ScrollView>
                <AnalisiInput medicaldata={eritrociti}></AnalisiInput>
                <AnalisiInput medicaldata={emoglobina}></AnalisiInput>
                <AnalisiInput medicaldata={mcv}></AnalisiInput>
                <AnalisiInput medicaldata={ht}></AnalisiInput>
                <AnalisiInput medicaldata={leucociti}></AnalisiInput>
                <AnalisiInput medicaldata={piastrine}></AnalisiInput>
                <AnalisiInput medicaldata={glicemia}></AnalisiInput>
                <AnalisiInput medicaldata={urea}></AnalisiInput>
                <AnalisiInput medicaldata={na}></AnalisiInput>
                <AnalisiInput medicaldata={k}></AnalisiInput>
                <AnalisiInput medicaldata={creatinina}></AnalisiInput>
                <AnalisiInput medicaldata={colesterolo_totale}></AnalisiInput>
                <AnalisiInput medicaldata={colesterolo_hdl}></AnalisiInput>
                <AnalisiInput medicaldata={trigliceridi}></AnalisiInput>
                <AnalisiInput medicaldata={pcr}></AnalisiInput>

                <View style={{alignSelf:"center",margin:20}}><CustomButton  onPress={ async () => {
                    setIsLoading(false)
                    let isValid=validate();
                    if(!isValid)
                    {
                        Alert.alert("Errore compilazione","Uno o piu' campi non inseriti, riprovare")
                        setIsLoading(true)
                        finished=false;
                    }
                    else {
                        await postMedicalValues()
                    }
                }
                } button={"first"} text={isLoading ? "Manda analisi del sangue" : "Invio in corso.."}
                 />
                 </View>
            </ScrollView>
    </View>            
  )
}

export default Inserimento_Analisi

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: "white",
        padding:20
    },

    scrollview: {
        flex:1,
        width:"100%", 
        alignSelf:"center",
        padding:0
    }


})