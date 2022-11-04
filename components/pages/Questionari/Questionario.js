import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Domanda from "./Domanda";
import CustomButton from "../../CustomButton";
import { RadioButton } from 'react-native-paper';
import PatientQuestionnaire from "../../../classes/PatientQuestionnaire";
import QuestionAnswer from "../../../classes/QuestionAnswer";
const s = require("../../../core/styles");

export default function Questionario({route,navigation},props) {

  const {nomequestionario,domande_e_risposte} = route.params;
  const [n_domanda,setNumeroDomanda] = useState(0);
  const [patient, setPatient] = useState();
  const [questionAnswers,setQuestionAnswers] = useState([]);
  const [compilato,setCompilato] = useState(false);

  let getQuestsById,getPatientById,patientQuestionnaire;
  /* backend part */

  async function addPatientQuestionnaire(patientId, patientQuestionnaire) {
    return new Promise ((resolve, reject) => {
      fetch(`/api/patients/${patientId}/questionnaires`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(patientQuestionnaire)
      })
          .then((response) => {
            console.log(JSON.stringify(patientQuestionnaire))
            const patientQuestionnaireId = response.json()
            if (response.ok){
              resolve(patientQuestionnaireId);
            } else {
              reject(patientQuestionnaireId)
            }
          })
          .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
    })
  }

  function submitQuestionnaire() {
    //send API
    navigation.navigate("Questionari");

  }

  useEffect(() => {

    // Controllare che il template del questionario non sia già stato compilato dal paziente
    // a quel punto chiamare il patientQuestionnaire e caricare le risposte date dal paziente
    // setCompilato(true)
    //Se il questionario non è stato compilato allora inizializzo il vettore con le possibili risposte

    if(!compilato) {

      let _questionAnswers = domande_e_risposte.map((el,i) => {

        let questionAnswer = new QuestionAnswer(undefined,el.id,null);

        return questionAnswer;
      })

      setQuestionAnswers(_questionAnswers);
    }

  },[])



    return (
    <View style={s.container}>
      <Text style={s.header(2,"bold")}>{nomequestionario}</Text>
      <View style={{flex:1, flexDirection: "row", alignItems:"center",justifyContent:"space-around", width:"80%"}}>
        {domande_e_risposte.map((_,i)=> (
           <View key={i} style={n_domanda >= i ? s.progress_rectangle_active : s.progress_rectangle}></View>
        ))}
       
      </View>  
      <View style={{flex:5, width: "80%",marginBottom:40}}>
       <Domanda questionAnswers = {questionAnswers} handlequestionAnswern_domanda={n_domanda} testo={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].text : ""} risposte={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].possibleQuestionAnswer : ""}></Domanda>
      </View>  
      <View style={{flex:1, flexDirection:"row", width: "80%", justifyContent: "space-around"}}>
      {n_domanda > 0 && (
        <CustomButton button="second" onPress={()=> setNumeroDomanda(n_domanda - 1)} text="Precedente" fontSize="medium"/> )}
      {n_domanda + 1 === domande_e_risposte.length ? <CustomButton onPress={()=> submitQuestionnaire()} fontSize="medium" text="Concludi"></CustomButton> :
        <CustomButton onPress={()=> setNumeroDomanda(n_domanda + 1)} text="Prossima" fontSize="medium"/>}
      </View>
    </View>
  );
}
