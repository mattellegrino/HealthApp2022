import { View, Text } from 'react-native'
import React from 'react'

export default function InserisciAlimento(props) {

    const [isSelected,setIsSelected] = useState("Tutti");
  
    const handleselection = (selected) => {
  
      setIsSelected(selected);
  
    }


  return (
    <View>
      <Text>InserisciAlimento</Text>
      <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Tutti","Compilare","Compilati"]} handleselection={handleselection}/>

    </View>
  )
}