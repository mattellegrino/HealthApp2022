import { View, Text } from "react-native";
import React, {useState} from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";

export default function Attivitàfisica() {

  var selezioni = ["Giorno","Settimana","Mese"];

  const [isSelected,setIsSelected] = useState("Giorno");
  
  const handleselection = (selected) => {

    setIsSelected(selected);

  }

  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <CustomNavbar type={"attività"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
    </View>
  );
}
