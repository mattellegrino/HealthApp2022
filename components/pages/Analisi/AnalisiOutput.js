import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, BackHandler, ScrollView} from 'react-native';

const AnalisiOutput = ({route}) => {
    const [isLoading, setLoading] = useState(true);
    const {analisi_data} = route.params;
    /* */


    return(
        <View style={{ padding: 20 }}>
            <Text style={{fontWeight: 'bold'}} >Analisi del sangue del giorno {analisi_data.date}</Text>
            <Text> Eritrociti : {analisi_data.eritrociti}</Text>
            <Text> Emoglobina : {analisi_data.emoglobina}</Text>
            <Text> MCV : {analisi_data.mcv}</Text>
            <Text> HT : {analisi_data.ht}</Text>
            <Text> Leucociti : {analisi_data.leucociti}</Text>
            <Text> Piastrine : {analisi_data.piastrine}</Text>
            <Text> Glicemia : {analisi_data.glicemia}</Text>
            <Text> Urea : {analisi_data.urea}</Text>
            <Text> Sodio : {analisi_data.na}</Text>
            <Text> Potassio : {analisi_data.k}</Text>
            <Text> Creatinina : {analisi_data.creatinina}</Text>
            <Text> Colesterolo Totale : {analisi_data.colesteroloTotale}</Text>
            <Text> Colesterolo HDL : {analisi_data.colesteroloHdl}</Text>
            <Text> Trigliceridi : {analisi_data.trigliceridi}</Text>
            <Text> PCR : {analisi_data.pcr}</Text>
        </View>
    );
};
export default AnalisiOutput;
