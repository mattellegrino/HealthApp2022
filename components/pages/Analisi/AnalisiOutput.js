import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, BackHandler, ScrollView} from 'react-native';

const AnalisiOutput = () => {
    const [isLoading, setLoading] = useState(true);
    const [bloodValues,setbloodValues] = useState([]);
    /* */
    let getBloodValuesById;


      getBloodValuesById = () => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/bloodAnalysis`)
            .then((response) => response.json())
            .then((json) =>{ setbloodValues(json) ; console.log(json)})
            .catch((error) => { console.error(error)})
            .finally(() => {
                setLoading(false)
            });
         }



    useEffect(() => {
        getBloodValuesById();
    }, []);


    const Item = (props ) => (
        <ScrollView >
            <Text style={{fontWeight: 'bold'}} >Analisi del sangue del paziente {props.patient_name} {props.patient_surname}</Text>
            <Text style={{fontWeight: 'bold'}} >Analisi del sangue del giorno {props.date}</Text>
            <Text> Eritrociti : {props.eritrociti}</Text>
            <Text> Emoglobina : {props.emoglobina}</Text>
            <Text> MCV : {props.mcv}</Text>
            <Text> HT : {props.ht}</Text>
            <Text> Leucociti : {props.leucociti}</Text>
            <Text> Piastrine : {props.piastrine}</Text>
            <Text> Glicemia : {props.glicemia}</Text>
            <Text> Urea : {props.urea}</Text>
            <Text> Sodio : {props.na}</Text>
            <Text> Potassio : {props.k}</Text>
            <Text> Creatinina : {props.creatinina}</Text>
            <Text> Colesterolo Totale : {props.colesteroloTotale}</Text>
            <Text> Colesterolo HDL : {props.colesteroloHdl}</Text>
            <Text> Trigliceridi : {props.trigliceridi}</Text>
            <Text> PCR : {props.pcr}</Text>
        </ScrollView>
    );

    const renderItem = ({ item }) =>
        <Item
              patient_name={item.patient.firstName}
              patient_surname={item.patient.lastName}
              date={item.date}
              eritrociti={item.eritrociti}
              emoglobina={item.emoglobina}
              mcv={item.mcv}
              ht={item.ht}
              leucociti={item.leucociti}
              piastrine={item.piastrine}
              glicemia={item.glicemia}
              urea={item.urea}
              na={item.na}
              k={item.k}
              creatinina={item.creatinina}
              colesteroloTotale={item.colesteroloTotale}
              colesteroloHdl={item.colesteroloHdl}
              trigliceridi={item.trigliceridi}
              pcr={item.pcr}
        />;


    return(
        <View style={{ padding: 20 }}>
            <Text style={{fontWeight: 'bold'}}>Ciao patient queste sono le analisi del sangue che abbiamo trovato:</Text>
            {isLoading ? <ActivityIndicator/> :
                (
                    <FlatList
                        data={bloodValues}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
        </View>
    );
};
export default AnalisiOutput;
