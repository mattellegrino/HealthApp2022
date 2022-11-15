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
    const [weightValues,setweightValues] = useState([]);
    const [lastWeight,setlastWeight] = useState([]);
    /* */
    let getweightValuesbyId;


    const mocklinedatamonthhr = [
        { id:1, weight:55, bmi:17, date: "2022-06-1"},
        { id:1, weight:55, bmi:17, date: "2022-06-2" },
        { id:1, weight:56, bmi:17, date: "2022-06-3" },
        { id:1, weight:55, bmi:17, date: "2022-06-8" },
        { id:1, weight:55, bmi:17, date: "2022-06-9" },
        { id:1, weight:55, bmi:17, date: "2022-06-10" },
        { id:1, weight:55, bmi:17, date: "2022-06-17" },
        { id:1, weight:55, bmi:17, date: "2022-06-18" },
        { id:1, weight:58, bmi:20, date: "2022-06-19" },
        { id:1, weight:55, bmi:17, date: "2022-06-20" },
        { id:1, weight:55, bmi:17, date: "2022-06-28" },
      ];  
      

    getweightValuesbyId = () => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/weights`)
            .then((response) => response.json())
            .then((json) =>{ 
                setlastWeight(Array.of(json[json.length -1])); 
                setweightValues(Array.of(json))})
            .catch((error) => { console.error(error)})
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        getweightValuesbyId()
    }, []);


    useEffect(() => {
        getweightValuesbyId()
    },[route.params])

    const Item = (props) => (
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
                <>
                <FlatList
                 data={lastWeight}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                />
                <View>
                    <LineChart
                            color="grey"
                            startFillColor="grey"
                            endFillColor="grey"
                            areaChart
                            showReferenceLine1
                            maxValue={100}referenceLine1Position={60}
                            referenceLine1Config={{
                            color: "gray",
                            labelText: "Media",
                            labelTextStyle: styles.progressStyle,
                            dashWidth: 2,
                            dashGap: 3,
                            }}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            yAxisTextStyle={styles.progressStyle}
                            xAxisLabelTextStyle={styles.progressXStyle}
                            startOpacity={0.1}
                            endOpacity={0.7}
                            initialSpacing={0}
                            height={200}
                            data={
                                mocklinedatamonthhr
                            }
                            spacing={isSelected == "Settimana" ? 50 : 20}
                            textColor1="black"
                            textShiftY={-10}
                            textShiftX={-5}
                            showTextOnPress
                            pressEnabled={true}
                            textFontSize={12}
                            thickness={2}
                            curved
                            isAnimated={true}
                            focusedDataPointRadius={5}
                            focusedDataPointColor={"black"}
                            hideRules
                            yAxisColor="#0BA5A4"
                            xAxisColor="#0BA5A4"
                        />
                </View>
                </>
            )
  )
}
export default Profilo;