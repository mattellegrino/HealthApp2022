import { View, Text, Pressable } from "react-native";
import React, {useState} from "react";
import Navbar from "../../CustomNavbar/CustomNavbar";
import CustomButton from "../../CustomButton/CustomButton";
import CopertinaQuestionario from "./CopertinaQuestionario";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "react-native-shadow-cards";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";
const s = require("../../../core/styles");

export default function Questionari({navigation}) {

  const [isSelected,setIsSelected] = useState("Tutti");
  
  const handleselection = (selected) => {

    setIsSelected(selected);

  }

  let domande_e_risposte = 
  [{argomento: "Cereali", testo:"Quante volte a settimana consumi cereali raffinati (Pasta, riso bianco, pane)?",risposte:["Meno di una","Una","Due","Tre o più"]}, 
   {argomento: "Cereali", testo:"Quante volte a settimana consumi cereali integrali (Pasta, riso bianco, pane)?",risposte:["Meno di una","Una","Due","Tre o più"]},
   {argomento: "Medas", testo:"Quante porzioni di verdura consumi al giorno?",risposte:["Meno di una","Una","Due","Tre o più"]},
   {argomento: "Medas", testo:"Usi l'olio di oliva come grasso da condimento principale?",risposte:["Sì","No"]}]
  
  return (
    <View style={{ flex:8, width:"100%", backgroundColor:"#FFFFFF"}}>
         
       <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Tutti","Compilare","Compilati"]} handleselection={handleselection}/>

      <View style={{flex: 4, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <CopertinaQuestionario titolo={"Cereali"} domande_e_risposte ={domande_e_risposte.filter((element) => element.argomento=="Cereali")}></CopertinaQuestionario>
        {/*<CopertinaQuestionario titolo={"Insomnia"}domande_e_risposte ={domande_e_risposte.filter((element) => element.argomento=="Insomnia")}></CopertinaQuestionario> */}
        <CopertinaQuestionario titolo={"Medas"} domande_e_risposte ={domande_e_risposte.filter((element) => element.argomento=="Medas")}></CopertinaQuestionario>
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
}
