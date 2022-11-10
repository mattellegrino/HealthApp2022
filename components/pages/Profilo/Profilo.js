import {View, Text, ActivityIndicator, Pressable, FlatList, ScrollView} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Generalità from './Generalità'
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");
import { Avatar } from 'react-native-paper';
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
                    <Generalità nome="Sesso" valore={props.gender}></Generalità>
                    <Generalità nome="Data di nascita" valore={props.birth_date}></Generalità>
                    <Generalità nome="Altezza" valore={props.height}></Generalità>
                    <Generalità nome="Peso" valore={props.weight}></Generalità>
                </View>

                <Pressable style={{flex:2}}onPress={()=> navigation.navigate("Peso")}>
                    <View style={{flex: 2, alignItems:"center", justifyContent:"center"}}>
                    <Card cornerRadius={10}
                            style={{
                                backgroundColor: "#FFF9C4",
                                flex: 0,
                                width: "90%",
                                marginBottom: 15,
                                alignItems: "center",
                                padding:20, borderRadius:20, flexDirection:"row"
                                }}
                            >
                        <Ionicons name="bar-chart" size={24} color="#F9A825" /> 
                        <Text style={[s.header(4,"regular"),{color:"#000",marginLeft:"20%"}]}> Inserisci il tuo peso </Text>    
                    </Card> 
                    </View>
                    </Pressable>
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