import {View, Text, ScrollView, SafeAreaView, Alert, ActivityIndicator, Keyboard, Button} from 'react-native'
import React, {useState} from 'react'
import AnalisiInput from "./AnalisiInput";
import CustomButton from "../../CustomButton";
const s = require("../../../core/styles");

export default function Analisi({navigation}) {
    const [isLoading, setIsLoading] = useState(true);
    let   [finished, setFinished] = useState(undefined)
    let date = formatDate();
    let eritrociti={ name: "Eritrociti", value: null}
        ,emoglobina={ name: "Emogoblina", value: null}
        ,mcv= { name: "Mcv", value: null}
        ,ht = { name: "Ht", value: null}
        ,leucociti= { name: "Leucociti", value: null}
        ,piastrine = { name: "Piastrine", value: null}
        ,glicemia= { name: "Glicemia", value: null}
        ,urea = { name: "Urea", value: null}
        ,na= { name: "Sodio", value: null}
        ,k= { name: "Potassio", value: null}
        ,creatinina= { name: "Creatinina", value: null}
        ,colesterolo_totale= { name: "Colesterolo Totale", value: null}
        ,colesterolo_hdl ={ name: "Colesterolo HDL", value: null}
        ,trigliceridi= { name: "Trigliceridi", value: null}
        ,pcr= { name: "Pcr", value: null}
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

        // check all AnalisiInput has values
        //if yes, try to post in the backend
        //if not, repeat
        return new Promise ((resolve, reject) => {
            fetch(`http://${global.enrico}:8080/api/patients/${global.id}/bloodAnalysis`, {
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
                        // go to main page
                        navigation.navigate('Impostazioni')
                    }

                })
                .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
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
            <ScrollView style={{flex:3, width:"85%", alignSelf:"center"}}>
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

                <CustomButton  onPress={ async () => {
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
                } button={"first"} text={isLoading ? "Manda analisi del sangue" :
                    (finished?"Fatto":<ActivityIndicator/>)
                }
                 />

            </ScrollView>

    )
}