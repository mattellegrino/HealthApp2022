import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, BackHandler, ScrollView} from 'react-native';

const AnalisiOutput = ({route}) => {
    const [isLoading, setLoading] = useState(true);
    const {analisi_data} = route.params;
    /* */


    return(
        <View style={{ padding: 20 }}>
            <Text style={{fontWeight: 'bold'}}>Analisi del sangue del giorno {analisi_data.date}</Text>
            <Text> Eritrociti:<Text style={{fontWeight: 'bold'}}> {analisi_data.eritrociti} x10^12/L</Text></Text>
            <Text> Emoglobina: <Text style={{fontWeight: 'bold'}}>{analisi_data.emoglobina} g/dL</Text></Text>
            <Text> MCV:<Text style={{fontWeight: 'bold'}}> {analisi_data.mcv} fL</Text></Text>
            <Text> HT: <Text style={{fontWeight: 'bold'}}>{analisi_data.ht} %</Text></Text>
            <Text> Leucociti:<Text style={{fontWeight: 'bold'}}> {analisi_data.leucociti} x10^9/L</Text></Text>
            <Text> Piastrine:<Text style={{fontWeight: 'bold'}}> {analisi_data.piastrine} x10^9/L</Text></Text>
            <Text> Glicemia:<Text style={{fontWeight: 'bold'}}> {analisi_data.glicemia} mg/dL</Text></Text>
            <Text> Urea: <Text style={{fontWeight: 'bold'}}>{analisi_data.urea} mg/dL</Text></Text>
            <Text> Sodio:<Text style={{fontWeight: 'bold'}}> {analisi_data.na} mmol/L</Text></Text>
            <Text> Potassio:<Text style={{fontWeight: 'bold'}}> {analisi_data.k} mmol/L</Text></Text>
            <Text> Creatinina:<Text style={{fontWeight: 'bold'}}> {analisi_data.creatinina} mg/dL</Text></Text>
            <Text> Colesterolo Totale:<Text style={{fontWeight: 'bold'}}> {analisi_data.colesteroloTotale} mg/dL</Text></Text>
            <Text> Colesterolo HDL: <Text style={{fontWeight: 'bold'}}>{analisi_data.colesteroloHdl} mg/dL</Text></Text>
            <Text> Trigliceridi: <Text style={{fontWeight: 'bold'}}>{analisi_data.trigliceridi} mg/dL</Text> </Text>
            <Text> PCR: <Text style={{fontWeight: 'bold'}}>{analisi_data.pcr} mg/dL</Text> </Text>
        </View>
    );
};
export default AnalisiOutput;
