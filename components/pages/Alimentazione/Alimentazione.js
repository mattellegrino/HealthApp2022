import { View, SafeAreaView, Text, StyleSheet, FlatList, StatusBar } from 'react-native'
import React, {useState,useEffect} from 'react'
import PastoRow from './PastoRow';
import CustomNavbar from '../../CustomNavbar/CustomNavbar';
import Ionicons from "@expo/vector-icons/Ionicons";
import CaloriesBox from './CaloriesBox';
const s = require("../../../core/styles");
export default function Alimentazione({route}) {

    const [isSelected,setIsSelected] = useState("Giorno");
    const [range_time,setRangeTime] = useState("");
    const {data} = route.params;
    
    const handleselection = (selected) => {
    setIsSelected(selected);
    }

    useEffect(() => {

        switch (isSelected) {
    
          case "Giorno": 
          let range_giorno = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
          setRangeTime(range_giorno);
          break;
          
          case "Settimana": 
            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay() +1; // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6
            
            let firstday = new Date(curr.setDate(first));
            let lastday = new Date(curr.setDate(last));
            
            let firstday_string = (firstday.getDate() + "/" + firstday.getMonth() + "/" + firstday.getFullYear());
            let lastday_string = (lastday.getDate() + "/" + lastday.getMonth() + "/" + lastday.getFullYear());
            setRangeTime(firstday_string + " - " + lastday_string);
          break;
    
          case "Mese":
            setRangeTime(data.getMonth() + "/" + data.getFullYear());
            break;
           default: 
    
           var rangetime = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
           setRangeTime(rangetime);
        }
       
      },[isSelected])

    const DATA = [
        {
          id: 'Col',
          title: 'Colazione',
        },
        {
          id: 'Pra',
          title: 'Pranzo',
        },
        {
          id: 'Cen',
          title: 'Cena',
        },
        {
          id: 'Spu',
          title: 'Spuntini',
        }
      ];

      const renderItem = ({ item }) => (
        <PastoRow title={item.title}/>
      );
      
      const Item = ({ title }) => (
        <View style={styles.item}>
         <Text style={s.header(3,"medium")}>{title}</Text>
        </View>
      );


  return (
  <SafeAreaView style={styles.container}>
    <View style={{flex:0.8}}>
        <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Giorno","Settimana","Mese"]} handleselection={handleselection}/>
    </View>
   
    <View style={{flex:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
      <Ionicons name="chevron-back-outline" size={24} color="black"></Ionicons>
      <Text style={s.body("medium")}> {range_time} </Text>
      <Ionicons name="chevron-forward-outline" size={24} color="black"></Ionicons>
      </View>

    <CaloriesBox/>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
  </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#fff"
    },
    item: {
      backgroundColor: "#ccd3d8",
      padding: 20,
      borderRadius:20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });