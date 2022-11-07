import { View, Text } from "react-native";
import React, {useState, useEffect} from "react";
import Domanda from "./Domanda";
import CustomButton from "../../CustomButton";
import { RadioButton } from 'react-native-paper';
import PatientQuestionnaire from "../../../classes/PatientQuestionnaire";
import QuestionAnswer from "../../../classes/QuestionAnswer";
import zocial from "react-native-vector-icons/Zocial";
const s = require("../../../core/styles");

export default function Questionario({route,navigation},props) {

  const {nomequestionario,domande_e_risposte,questionnaireTemplateId} = route.params;
  const [n_domanda,setNumeroDomanda] = useState(0);
  const [patient, setPatient] = useState();
  const [questionAnswers,setQuestionAnswers] = useState([]);
  const [compilato,setCompilato] = useState(false);
  const [changed,setChanged] = useState(false);

  let getQuestsById,getPatientById,patientQuestionnaire;
  /* backend part */


  async function postPatientQuestionnaire() {

    // check all AnalisiInput has values
    //if yes, try to post in the backend
    //if not, repeat

    let date = new Date()
    let questionAnswersForAPI = questionAnswers.map((el, i) => {
      let questionAnswer = {questionId: el.question, possibleQuestionAnswerId: el.id};
      console.log(questionAnswer)
      return questionAnswer;
    })

    console.log("NOStro vettore")
    console.log(questionAnswersForAPI)

    return new Promise ((resolve, reject) => {
      fetch(`http://${global.enrico}:8080/api/patients/${global.id}/questionnaires`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body:
            {
           "description": "Descrizione",
           "submissionDate": date,
          "questionAnswers": questionAnswersForAPI,
          "questionnaireTemplateId": questionnaireTemplateId
            }
      })
          .then((response) => {
            if(response.ok)
            {
                //setFinished(true);
                // go to main page
                navigation.navigate("Questionari")
            }
            else console.log(response)
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
          })
    })
  }

  async function submitQuestionnaire() {

    await postPatientQuestionnaire();

  }

  function editQuestionAnswers(questionAnswer) {
  let index = questionAnswers.indexOf((_questionAnswer) => _questionAnswer.question === questionAnswer.question);
  let _questionAnswers = questionAnswers;
  _questionAnswers[index] = questionAnswer;
  setQuestionAnswers(_questionAnswers);
  setChanged(!changed);
  }

  useEffect(() => {

    // Controllare che il template del questionario non sia già stato compilato dal paziente
    // a quel punto chiamare il patientQuestionnaire e caricare le risposte date dal paziente
    // setCompilato(true)
    //Se il questionario non è stato compilato allora inizializzo il vettore con le possibili risposte

    if(!compilato) {

      let _questionAnswers = domande_e_risposte.map((el,i) => {
        let questionAnswer = {id:el.possibleQuestionAnswer[0], question:el.id, chosenAnswer: {id:-1,text:""}};
        return questionAnswer;
      })
      setQuestionAnswers(_questionAnswers);
    }

  },[])



    return (
    <View style={s.container}>
      <Text style={s.header(2,"bold")}>{nomequestionario}</Text>
      <View style={{flex:1, flexDirection: "row", alignItems:"center",justifyContent:"space-between", width:"100%"}}>
        {questionAnswers.map((_,i)=> (
          <View style={{flex:1,flexDirection: "column"}}>
          <View style={i === n_domanda && s.pointer}/>
           <View key={i} style={questionAnswers[i].chosenAnswer.id>=0 ? s.progress_rectangle_active : s.progress_rectangle}>
           </View>
           </View>
        ))}
       
      </View>  
      <View style={{flex:5, width: "80%",marginBottom:40}}>
        {questionAnswers &&
       <Domanda changed={changed} editQuestionAnswers = {editQuestionAnswers} questionAnswers={questionAnswers} questionAnswer={questionAnswers[n_domanda]} n_domanda={n_domanda} testo={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].text : ""} risposte={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].possibleQuestionAnswer : ""}></Domanda>
        }
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
