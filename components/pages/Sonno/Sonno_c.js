import { View, Text } from "react-native";
import React,{useState} from "react";
import CustomNavbar from "../../CustomNavbar/CustomNavbar";

export default function Sonno_c() {

  var selezioni = ["Giorno","Settimana","Mese"];

  const [isSelected,setIsSelected] = useState("Giorno");
  
  const handleselection = (selected) => {
    setIsSelected(selected);
  }

  return (
    <View style={{flex:1}}>
    <CustomNavbar type={"sonno"} isSelected={isSelected} selezioni={selezioni} handleselection={handleselection}></CustomNavbar>
  </View>
  );
}
