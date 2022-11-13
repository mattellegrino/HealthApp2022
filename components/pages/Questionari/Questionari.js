import {View, ScrollView, Text, Pressable, StyleSheet, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import Navbar from "../../CustomNavbar/CustomNavbar";
import CustomButton from "../../CustomButton/CustomButton";
import CopertinaQuestionario from "./CopertinaQuestionario";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import PatientQuestionnaire from "../../../classes/PatientQuestionnaire";
import Question from "../../../classes/Question";
import QuestionnaireTemplate from "../../../classes/QuestionnaireTemplate";
import QuestionnaireAnswered from "../../../classes/QuestionnaireAnswered";
const s = require("../../../core/styles");



export default function Questionari({navigation,route}) {

  const [isSelected,setIsSelected] = useState("Compilare");
  const [isLoadingQuests, setLoadingQuests] = useState(true);
  const [quests, setQuests] = useState([]);
  const [allQuests, setAllQuests] = useState([]);
  const [questsTodo, setQuestsTodo] = useState([]);
  const [questsCompilati, setQuestsCompilati] = useState([]);

  let getQuestionnairesCompiled,getQuestionnairesAvailable;

  const handleselection = (selected) => {

    switch (selected) {

        case "Tutti":
            setQuests(allQuests);
            break;
        case "Compilare":
            setQuests(questsTodo);
            break;
        case "Compilati":
            setQuests(questsCompilati);
            break;

    }


    setIsSelected(selected);
  }

    function formatDate() {
        let d = new Date(),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    }

    function filterDaCompilare(quest,questionari_compilati){

      let trovato = 0;

      questionari_compilati.forEach((quest_compilato) => {
        if(quest_compilato.questionnaireTemplate.id == quest.id)
          trovato = 1;
      })

      if(trovato == 1)
      return false;

      else
      return true;

    }
  
    getQuestionnairesCompiled = (AllQuestionnaireTemplate) => {
        fetch(`http://${global.enrico}:8080/api/patients/${global.id}/questionnaires`)
            .then((response) => response.json())
            .then((json) =>{
                let questionari_compilati = json.map(json => QuestionnaireAnswered.from(json));
                setQuestsCompilati(json.map(json => QuestionnaireAnswered.from(json)))
                let questionari_da_compilare = AllQuestionnaireTemplate.filter((quest) => filterDaCompilare(quest,questionari_compilati));      
                setQuestsTodo(questionari_da_compilare);
                setQuests(questionari_da_compilare);
            })
            .catch((error) => { console.error(error)})
            .finally(() => setLoadingQuests(false));
    }


    getQuestionnairesAvailable = () => {
        fetch(`http://${global.enrico}:8080/api/questionnaires/templates`)
            .then((response) => response.json())
            .then((json) =>{
                let AllQuestionnaireTemplate = json.map(json => QuestionnaireTemplate.from(json));
                setAllQuests(json.map(json => QuestionnaireTemplate.from(json)));
                getQuestionnairesCompiled(AllQuestionnaireTemplate);
            })
            .catch((error) => { console.error(error)})
            .finally(() => setLoadingQuests(false));
    }



    useEffect( () => {
        getQuestionnairesAvailable();
        setIsSelected("Compilare");
        console.log("aggiorno");
    }, [route.params]);
    useEffect( () => {
      getQuestionnairesAvailable();
  }, []);


  return (
    <ScrollView style={{ flex:8,padding:10, width:"100%", backgroundColor:"#FFFFFF"}}>
         
       <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Compilare","Compilati"]} handleselection={handleselection}/>

    
      <View style={{flex: 8
        , flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>


      {isLoadingQuests ? <ActivityIndicator/> : quests.length == 0 &&
      
      <View style={styles.scrittaquestionari}>
        <Text style={s.header(3,"bold")}> Nessun questionario {isSelected == "Compilare" ? "da compilare" : "compilato"}</Text>
      </View>
      
      }  

      {isLoadingQuests ? <ActivityIndicator/> : 
      quests.map((quest,i) => (
        <CopertinaQuestionario submissionDate={ questsCompilati.find((el) => el.name === quest.name) !== undefined ? formatDate() : "error" }
                               compilato={questsCompilati.find((el) => el.name === quest.name)}
                               compiledAnswers={(questsCompilati.find((el) => el.name === quest.name)!== undefined) ? quest.questionAnswers : "error"}
                               key={i} titolo={quest.name}
                               domande_e_risposte={isSelected === "Compilati" ? quest.questionnaireTemplate.questions : quest.questions}
                               questionnaireTemplateId={quest.id}></CopertinaQuestionario>

        ))}       
           
                  
           {/*{isLoadingQuests ? <ActivityIndicator/> :
              (<CopertinaQuestionario titolo={quests_todo[0].questions[3].questionSection.name.substring(0, 6)} domande_e_risposte ={[{testo: quests_todo[0].questions[3].text,risposte:[quests_todo[0].questions[3].possibleQuestionAnswer[0].text,quests_todo[0].questions[3].possibleQuestionAnswer[1].text,quests_todo[0].questions[3].possibleQuestionAnswer[2].text]},
                      {testo: quests_todo[0].questions[4].text,risposte:[quests_todo[0].questions[4].possibleQuestionAnswer[0].text,quests_todo[0].questions[4].possibleQuestionAnswer[1].text,quests_todo[0].questions[4].possibleQuestionAnswer[2].text]}
                  ]}
                  ></CopertinaQuestionario>
              )}

          {isLoadingQuests ? <ActivityIndicator/> :
              (<CopertinaQuestionario titolo={quests_todo[0].questions[6].questionSection.name.substring(0, 8)} domande_e_risposte ={[{testo: quests_todo[0].questions[6].text,risposte:[quests_todo[0].questions[6].possibleQuestionAnswer[0].text,quests_todo[0].questions[6].possibleQuestionAnswer[1].text,quests_todo[0].questions[6].possibleQuestionAnswer[2].text]},
                      {testo: quests_todo[0].questions[7].text,risposte:[quests_todo[0].questions[7].possibleQuestionAnswer[0].text,quests_todo[0].questions[7].possibleQuestionAnswer[1].text,quests_todo[0].questions[7].possibleQuestionAnswer[2].text]}
                  ]}
                  ></CopertinaQuestionario>
              )}
          {isLoadingQuests ? <ActivityIndicator/> :
              (<CopertinaQuestionario titolo={"SPMSQ"} domande_e_risposte ={["",""]}>
                  </CopertinaQuestionario>
                )} */}
      </View>

        <View style={{flex: 3, alignItems:"center", justifyContent:"center"}}>
            <View style={{flex:1,borderTopColor:"#000",borderTopWidth:2,width:"100%",alignItems: "center",padding:15}}>
                <Text style={s.header(2,"bold")}> I consigli della settimana </Text>
                <Text style={[s.header(4,"regular"),{textAlign: "center", color:"#000",padding:45}]}> Completa almeno un questionario per vedere i consigli della settimana </Text>
            </View>
            <View>

            </View>
        </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

scrittaquestionari: {
  padding:10,
  height:100,
  justifyContent: "center",
}


})