import {View, Text, Pressable, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import Navbar from "../../CustomNavbar/CustomNavbar";
import CustomButton from "../../CustomButton/CustomButton";
import CopertinaQuestionario from "./CopertinaQuestionario";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
import PatientQuestionnaire from "../../../classes/PatientQuestionnaire";
import Question from "../../../classes/Question";
import QuestionnaireTemplate from "../../../classes/QuestionnaireTemplate";
const s = require("../../../core/styles");



export default function Questionari({navigation}) {

  const [isSelected,setIsSelected] = useState("Tutti");
  const [isLoadingQuests, setLoadingQuests] = useState(true);
  const [quests, setQuests] = useState();
  const [quests_todo, setQuests_todo] = useState([])
  let getQuestionnairesByPatientId,getQuestionnairesAvailable;

  const handleselection = (selected) => {
    setIsSelected(selected);
  }



    getQuestionnairesAvailable  = () => {
        fetch(`http://${global.enrico}:8080/api/questionnaires/templates`)
            .then((response) => response.json())
            .then((json) =>{
                setQuests_todo(json.map(json => QuestionnaireTemplate.from(json)))
            })
            .catch((error) => { console.error(error)})
            .finally(() => setLoadingQuests(false));
    }


    useEffect( () => {
       getQuestionnairesAvailable()
    }, []);


  return (
    <View style={{ flex:8,padding:10, width:"100%", backgroundColor:"#FFFFFF"}}>
         
       <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Tutti","Compilare","Compilati"]} handleselection={handleselection}/>

    
      <View style={{flex: 4, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
           
      {quests_todo.map((quest) => {


        <CopertinaQuestionario titolo={quest.name} domande_e_risposte={quest.questions}></CopertinaQuestionario> 


        })}       
           
                  
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

        <View style={{flex: 3, alignItems:"center", justifyContent:"center"}}>
            <View style={{flex:1,borderTopColor:"#000",borderTopWidth:2,width:"100%",alignItems: "center",padding:15}}>
                <Text style={s.header(2,"bold")}> I consigli della settimana </Text>
                <Text style={[s.header(4,"regular"),{textAlign: "center", color:"#000",padding:45}]}> Completa almeno un questionario per vedere i consigli della settimana </Text>
            </View>
            <View>

            </View>
        </View>

    </View>
  );
}
