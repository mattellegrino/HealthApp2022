import {View, Text, ActivityIndicator, Pressable, FlatList, StyleSheet, ScrollView} from 'react-native'
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
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
    const [maxWeight,setMaxWeight] = useState(0);
    /* */
    let getweightValuesbyId;


    const mocklinedatamonthweights = [
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

      const _mocklinedatamonthweight = [
        { id:1, value:55, bmi:17, label: "Oct 21"},
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:56, bmi:17, label: "" },
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:55, bmi:17, label: "" },
        { id:1, value:58, bmi:20, label: "" },
        { id:1, value:55, bmi:17, label: "Nov 21" },
        { id:1, value:55, bmi:17, label: "" },
      ];  
      function formatDate2(data) {
        const year = +data.substring(0, 4);
        const month = +data.substring(5, 7);
        const day = +data.substring(8, 10);
    
        const date = new Date(year, month - 1, day);
        return date;
      }
      
      const convertDateintoNumberDay = (data) => {
        let fordate = formatDate2(data);
        let date = fordate.getDate();
    
        return parseInt(date, 10);
      };

    getweightValuesbyId = () => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/weights`)
            .then((response) => response.json())
            .then((json) =>{ 
                setlastWeight(Array.of(json[json.length -1])); 
                let map_result = json.map((el,_i)=> {

                  let obj = {"label":"","value":"","id":""};

                  obj.label = el.date;
                  obj.value = el.weight;
                  obj.id = el.id;

                  return obj;
                  })

                  let arrayofwweights = [];

                  map_result.map((el,i)=>{

                    if(arrayofwweights.length == 0)
                    {
                      arrayofwweights.push(el);
                    }
                    else {
                      let modifica = 0;
                      arrayofwweights.forEach((element,_i)=>{

                        if(element.label == el.label && element.id < el.id){
                          arrayofwweights[_i] = el;
                          modifica = 1;
                        }

                      })

                      if(modifica == 0)
                      arrayofwweights.push(el);
                    }

                  })

                  setweightValues(arrayofwweights);
                

              })
            .catch((error) => { console.error(error)})
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        getweightValuesbyId()

        let _bardatamonth = mocklinedatamonthweights.map((el) => {
            el.value = el.weight;
      
            /*if(tipoUtente == "sperimentale"){
              if (el.value < redthreshold) el.frontColor = "red";
              else if (el.value >= redthreshold && el.value < orangethreshold)
                el.frontColor = "orange";
              else if (el.value >= orangethreshold && el.value < yellowthreshold)
                el.frontColor = "#FFEA00";
              else if (el.value >= yellowthreshold) el.frontColor = "green";
            }
      
            else*/
              el.frontColor = "grey";
            el.label = convertDateintoNumberDay(el.date);
            return el;
          });
      
          setweightValues(_bardatamonth);
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
                <View style={{alignItems: 'center',marginBottom:30}}>
                    <Text style={s.header(3,"bold")}>Analisi del peso</Text>
                    <Card style={{width:"80%"}}>
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
                            yAxisThickness={1}
                            xAxisThickness={1}
                            yAxisTextStyle={styles.progressStyle}
                            xAxisLabelTextStyle={styles.progressXStyle}
                            startOpacity={0.1}
                            endOpacity={0.7}
                            initialSpacing={1}
                            height={200}
                            width={260}
                            data={
                                weightValues
                            }
                            spacing={30}
                            textColor1="black"
                            textShiftY={-10}
                            textShiftX={-5}
                            showTextOnPress
                            pressEnabled={true}
                            textFontSize={10}
                            thickness={3}
                            curved
                            isAnimated={true}
                            focusedDataPointRadius={5}
                            focusedDataPointColor={"black"}
                            hideRules
                            yAxisColor="#000"
                            xAxisColor="#000"
                        />
                </Card>
                </View>
                
                </>
            )
  )
}

const styles = StyleSheet.create({

    progressStyle: {
        fontSize:10
      },
      progressXStyle: {
        fontSize: 12,
        width: 50,
        marginLeft: 5,
      },  
})
export default Profilo;