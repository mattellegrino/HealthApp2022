import {View, Text, ActivityIndicator, Pressable, FlatList, StyleSheet,Modal,Keyboard,Image, Alert, TouchableOpacity} from 'react-native'
import { LineChart } from "react-native-gifted-charts";
import React, {useEffect, useRef, useState} from 'react'
import Generalità from './Generalità'
import { Card } from "react-native-shadow-cards";
const s = require("../../../core/styles");
import { Avatar } from 'react-native-paper';
import CustomButton from '../../CustomButton';
import CustomInput from "../../CustomInput";
const Profilo = ({navigation,route}) =>  {
    const [isLoading, setLoading] = useState(true);
    const [Loading, setisLoading] = useState(true);
    const [peso,setPeso] = useState('')
    const [weightValues,setweightValues] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [lastWeight,setlastWeight] = useState([]);
    const [maxWeight,setMaxWeight] = useState(0);
    let   [finished, setFinished] = useState(undefined);
    /* */
    let getweightValuesbyId;


      function formatDate2(data) {
        const year = +data.substring(0, 4);
        const month = +data.substring(5, 7);
        const day = +data.substring(8, 10);
    
        const date = new Date(year, month - 1, day);
        return date;
      }
    

      const convertDateintoDoubleDate = (data) => {
        let fordate = formatDate2(data);
        let doubleDate = fordate.getDate() + "/" + fordate.getMonth();
        return doubleDate;
      }

      const convertDateintoNumberDay = (data) => {
        let fordate = formatDate2(data);
        let date = fordate.getDate();
    
        return parseInt(date, 10);
      };

      async function postWeight(peso) {

        // check all AnalisiInput has values
        //if yes, try to post in the backend
        //if not, repeat
        return new Promise ((resolve, reject) => {
            fetch(`${global.endpoint}/api/patients/${global.id}/weights`, {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body:  JSON.stringify(
                    {
                       "weight": peso
                    }
                )
            })
                .then((response) => {
                    if(response.ok)
                    {
                        setFinished(true);
                        Alert.alert(
                          "Peso",
                          "Peso modificato correttamente!",
                          [
                            {
                              text: "CHIUDI",
                              onPress: () => handleCloseModal(),
                              style: "cancel"
                            },
                          ]
                        );
                        // go to main page
                        
                    }
    
                })
                .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
        })
    }
    getweightValuesbyId = () => {
        fetch(`${global.endpoint}/api/patients/${global.id}/weights`)
            .then((response) => response.json())
            .then((json) =>{ 
                setlastWeight(Array.of(json[json.length -1])); 
                let map_result = json.map((el,_i)=> {

                  let obj = {"label":"","value":"","id":""};

                  obj.label = convertDateintoDoubleDate(el.date);
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
    }, []);

    const validate = (peso) => {
      Keyboard.dismiss();
      let isValid = true;
      console.log("Valore peso:" + {peso})
          if(peso===null || isNaN(peso) || peso > 250)
          {
              isValid=false;
          }
  
      return isValid;
  };

    const handleCloseModal = () => {
      setisLoading(true);
      setFinished(false);
      setModalVisible(false);
    }

    const media = (array) => {

        let sum = 0;
        let lunghezza = 0;
        array.forEach((el) => {
            if(el.value !== 0) {
                lunghezza = lunghezza +1;
                sum = sum + el.value;
            }
        });
        if(lunghezza!==0)
            return sum / lunghezza;
        else
            return 0;
    }

    useEffect(() => {
        getweightValuesbyId()
    },[route.params,modalVisible])

    const Item = (props) => (
        <View style={{flex:1, backgroundColor:"white"}}>
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
                    <Generalità nome="Peso" valore={props.weight} unità={"kg"} button={<CustomButton onPress={()=> setModalVisible(true)} text={"MODIFICA"} fontSize="small"></CustomButton>}></Generalità>
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
                <View keyboardShouldPersistTaps="always">
                <FlatList
                 keyboardShouldPersistTaps="always"
                 data={lastWeight}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                />
                
                <Modal
                  transparent={true}
                  visible={modalVisible}
                  style={styles.view}>
                    <View style={styles.view}>
                      <View style={styles.modalContainer}>
                        <Text style={s.header(3,"medium")}>Inserisci Peso</Text>
                      <View style={{ flexDirection: "row", marginBottom:30, marginTop:20, alignItems:"center",justifyContent: "center"}}>
                        <Card elevation={5} style={styles.card}>
                          <CustomInput keyboardType="numeric" placeholder="Peso" value={peso} setValue={setPeso} numericInput={true}></CustomInput>
                          <View style={styles.textDetail}>
                            <Text style={s.body("bold")}>Kg</Text>
                          </View>
                        </Card>
                      </View>
                      <View style={styles.bottoni}>
                        <CustomButton fontSize="medium" button="second" text="Indietro" onPress={()=>handleCloseModal()}/>
                        <CustomButton fontSize="medium" text={Loading ? "Salva" : finished ? "Salvato" : "Salvataggio.."}
                          onPress={async () => {
                              setisLoading(false)
                              let isValid=validate(peso);
                              if(!isValid)
                              {
                                  Alert.alert("Errore compilazione","Uno o piu' campi non inseriti o non validi, riprovare")
                                  setisLoading(true)
                                  
                              }
                              else {
                                  await postWeight(peso)
                              }
                        }}
                        ></CustomButton>
                       </View>
                       </View>
                      </View>
                     
              </Modal>
                <View style={{marginLeft:10,width:"100%",marginTop:40,marginBottom:40}}>
                    <Text style={[s.header(3,"bold"),styles.textPeso]}>Analisi del peso</Text>
                    <Card style={{width:"100%"}}>
                    <LineChart
                            color="grey"
                            startFillColor="grey"
                            endFillColor="grey"
                            areaChart
                            showReferenceLine1
                            maxValue={100}referenceLine1Position={media(weightValues)}
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
                            width={360}
                            data={
                                weightValues
                            }
                            spacing={50}
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
                
                </View>
            )
  )
}

const styles = StyleSheet.create({

      textPeso: {
        marginBottom:5
      },
      progressStyle: {
        fontSize:10
      },
      progressXStyle: {
        fontSize: 12,
        width: 50,
        marginLeft: 5,
      },
      textDetail: {
        backgroundColor:"lightgrey",
        borderRadius:20,
        padding: 10,
        borderLeftWidth: 2
      },
      card: { 
        flex:0,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        width:100,
        borderRadius:20,
    }
 ,    
      bottoni: {
        flex:0,
        width: "100%",
        flexDirection:"row",
        justifyContent: "space-around"

      },
      view: {
        flex:1,
        width:"100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
        margin:0
      },
      modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },  
})
export default Profilo;