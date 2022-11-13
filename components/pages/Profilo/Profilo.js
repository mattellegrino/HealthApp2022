import {View, Text, ActivityIndicator, Pressable, FlatList, ScrollView} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Generalità from './Generalità'
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");
import { Avatar } from 'react-native-paper';
import CustomButton from '../../CustomButton';
const Profilo = ({navigation,route}) =>  {
    const [isLoading, setLoading] = useState(true);
    const [profValues,setprofValues] = useState([]);
    /* */
    let getprofValuesbyId;

    getprofValuesbyId = () => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/weights`)
            .then((response) => response.json())
            .then((json) =>{ setprofValues(Array.of(json[json.length -1])); console.log(Array.of(json[json.length -1])); })
            .catch((error) => { console.error(error)})
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        getprofValuesbyId()
    }, []);

    useEffect(() => {
        getprofValuesbyId()
    },[route.params])

    const Item = (props ) => (
        <View style={{flex:1, backgroundColor:"white" }}>
            <View style={{flex:1, alignItems: "center"}}>
                <View style={{flex:0,marginTop:30, width:"80%",flexDirection:"row", justifyContent: "space-between"}}>
                    <Avatar.Image size={72} source={require('../../../assets/avatar.png')} />
                    <View style={{marginLeft:20}}>
                        <Text style={s.header(3,"regular")}>{props.nome} {props.cognome}</Text>
                        <Text style={s.body("regular")}>{props.email} </Text>
                    </View>
                </View>
            </View>
                <View style={{flex:3, width:"80%", alignSelf:"center"}}>
                    <Generalità nome="Sesso" valore={props.gender} unità={""}></Generalità>
                    <Generalità nome="Data di nascita" valore={props.birth_date} unità ={""}></Generalità>
                    <Generalità nome="Altezza" valore={props.height} unità={"cm"}></Generalità>
                    <Generalità nome="Peso" valore={props.weight} unità={"kg"} button={<CustomButton onPress={()=> navigation.navigate("Peso")} text={"MODIFICA"} fontSize="small"></CustomButton> }></Generalità>
                </View>
           
            </View>
    );

    const renderItem = ({ item }) =>
        <Item
            nome={item.patient.firstName}
            cognome={item.patient.lastName}
            email={item.patient.email}
            gender={item.patient.gender}
            birth_date={item.patient.birthDate}
            height={item.patient.height}
            weight={item.weight}
        />;

  return (
        isLoading ? <ActivityIndicator/> :
            (
                <FlatList
                 data={profValues}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                />
            )
  )
}
export default Profilo;