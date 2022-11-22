import { View, Text, Modal, Alert} from "react-native";
import React, {useState, useEffect} from "react";
import Domanda from "./Domanda";
import CustomButton from "../../CustomButton";
import { RadioButton } from 'react-native-paper';
import PatientQuestionnaire from "../../../classes/PatientQuestionnaire";
import QuestionAnswer from "../../../classes/QuestionAnswer";
import zocial from "react-native-vector-icons/Zocial";
import { set } from "react-hook-form";
const s = require("../../../core/styles");

export default function Questionario({route,navigation},props) {

  const {nomequestionario,domande_e_risposte,update,compilato,compiledAnswers,questionnaireTemplateId} = route.params;
  const [n_domanda,setNumeroDomanda] = useState(0);
  const [patient, setPatient] = useState();
  const [questionAnswers,setQuestionAnswers] = useState([]);
  const [precedentementeCompilato,setPrecedentementeCompilato] = useState(false);
  const [questCompilato,setQuestCompilato] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [changed,setChanged] = useState(false);
  const [shadow,setShadow] = useState(true);
  const handleShadow = (value) => {
    setShadow(value);
  }

  let getQuestsById,getPatientById,patientQuestionnaire;
  /* backend part */


  async function postPatientQuestionnaire(body) {

    return new Promise ((resolve, reject) => {
      fetch(`http://${global.enrico}:8080/api/patients/${global.id}/questionnaires`, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(body)
      })
          .then((response) => {
            if(response.ok)
            {
              //setFinished(true);
              //console.log(JSON.stringify(response))
              // go to main page
              navigation.navigate('Questionari', {mandato:!update});
            }
            else console.log(JSON.stringify(response))

          })
          .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
    })

  }



  async function submitQuestionnaire() {

    let date = new Date()
    let questionAnswersForAPI = questionAnswers.map((el, i) => {
      let questionAnswer = {questionId: el.question, possibleQuestionAnswerId: el.id};
      return questionAnswer;
    })

    console.log(questionAnswersForAPI)

    let body = {
      "description": "Questionario_risposto_numero_"+questionnaireTemplateId,
      "submissionDate": date,
      "questionAnswers": questionAnswersForAPI,
      "questionnaireTemplateId": questionnaireTemplateId
    }

    console.log(body)
    await postPatientQuestionnaire(body);

  }

  function editQuestionAnswers(questionAnswer) {
  let index = questionAnswers.indexOf((_questionAnswer) => _questionAnswer.question === questionAnswer.question);
  let _questionAnswers = questionAnswers;
  _questionAnswers[index] = questionAnswer;
  setQuestionAnswers(_questionAnswers);
  setChanged(!changed);
  }

  function handleSubmitQuestionaire() {

    if(compilato===undefined) {

    if(questCompilato){
      submitQuestionnaire();
    }
    else{
      Alert.alert("Compilare tutte le domande");
       }
}

else
navigation.navigate('Alimentazione');
  }

  useEffect(() => {

    let compilato = 1;

    questionAnswers.forEach((questionAnswer) => {
      console.log(questionAnswer.chosenAnswer.id);
      if(questionAnswer.chosenAnswer.id < 0)
      compilato = 0;
      setQuestCompilato(false);
    })

    if(compilato == 1)
    setQuestCompilato(true);

  },[JSON.stringify(questionAnswers)])


  useEffect(() => {

    // Controllare che il template del questionario non sia già stato compilato dal paziente
    // a quel punto chiamare il patientQuestionnaire e caricare le risposte date dal paziente
    // setCompilato(true)
    //Se il questionario non è stato compilato allora inizializzo il vettore con le possibili risposte

    if(compilato === undefined) {

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
          <View key={i} style={{flex:1,flexDirection: "column"}}>
          <View style={i === n_domanda && s.pointer}/>
           <View style={questionAnswers[i].chosenAnswer.id>=0 ? s.progress_rectangle_active : s.progress_rectangle}>
           </View>
           </View>
        ))}
       
      </View>  
      <View style={{flex:5, width: "80%",marginBottom:40}}>
        {questionAnswers &&
       <Domanda compilato={compilato} compiledAnswers={compiledAnswers} changed={changed} editQuestionAnswers = {editQuestionAnswers} questionAnswers={questionAnswers} questionAnswer={questionAnswers[n_domanda]}
                compiledAnswer={compiledAnswers[n_domanda]}
                n_domanda={n_domanda} testo={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].text : ""}
                risposte={domande_e_risposte[n_domanda] ? domande_e_risposte[n_domanda].possibleQuestionAnswer : ""}></Domanda>
        }
       </View>  
      <View style={{flex:1, flexDirection:"row", width: "80%",justifyContent: "space-around"}}>
      {n_domanda > 0 && (
        <CustomButton button="second" onPress={()=> setNumeroDomanda(n_domanda - 1)} text="PRECEDENTE" fontSize="small"/> )}
      {n_domanda + 1 === domande_e_risposte.length ? 
        <CustomButton onPress={handleSubmitQuestionaire} fontSize="small" text={compilato ? "CHIUDI" : "CONCLUDI"}></CustomButton> :
        <CustomButton onPress={()=> setNumeroDomanda(n_domanda + 1)} text="PROSSIMA" fontSize="small"/>}
      </View>
    </View>
  );
}
