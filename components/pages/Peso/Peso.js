import {View, Text, TextInput, StyleSheet, Keyboard, Alert, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput";
const s = require("../../../core/styles");



const Peso = ({navigation}) => {
    const [peso,setPeso] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    let   [finished, setFinished] = useState(undefined);
  return (
    <View style={s.container}>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <FontAwesome5 name="weight" size={94} color="black" />
        <View style={{flex:0, alignItems: "center"}}>
          <Text style={s.header(3,"medium")}>Inserisci Peso</Text>
          <View style={{ flex: 0, flexDirection: "row", alignItems: "center" }}>
            <CustomInput keyboardType="numeric" placeholder="Peso"  value={peso} setValue={setPeso} numericInput={true}></CustomInput>
            <Text style={s.header(3, "bold")}> Kg </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton
          fontSize="medium"
          text={isLoading ? "Salva" : finished ? "Salvato" : "Salvataggio in corso.."}
          onPress={async () => {
              setIsLoading(false)
              let isValid=validate(peso);
              if(!isValid)
              {
                  Alert.alert("Errore compilazione","Uno o piu' campi non inseriti, riprovare")
                  setIsLoading(true)
                  finished=false;
              }
              else {
                  await postWeight(peso)
              }
          }}
        ></CustomButton>
      </View>
    </View>
  );


async function postWeight(peso) {

    // check all AnalisiInput has values
    //if yes, try to post in the backend
    //if not, repeat
    return new Promise ((resolve, reject) => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/weights`, {
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
                          onPress: () => navigation.navigate('Profilo',{
                            invioPeso: true
                          }),
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
}

const validate = (peso) => {
    Keyboard.dismiss();
    let isValid = true;
    console.log("Valore peso:" + {peso})
        if(peso===null || isNaN(peso))
        {
            isValid=false;
        }

    return isValid;
};

export  default Peso;
