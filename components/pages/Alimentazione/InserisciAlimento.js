import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, {useState} from 'react'
import CustomNavbar from '../../CustomNavbar/CustomNavbar';
import CiboCard from './CiboCard';

export default function InserisciAlimento(props) {

    const [isSelected,setIsSelected] = useState("Tutti");
  
    const handleselection = (selected) => {
  
      setIsSelected(selected);
  
    }

    const DATA = [
      {
        id: 'Lat-Arb',
        porzione: 'ml',
        quantita: '100', 
        title: 'Latte intero arborea',
      },
      {
        id: 'Fet-bisc',
        porzione: 'fetta(7g)',
        quantita: '1', 
        title: 'Fette biscottate',
      },
      {
        id: 'Biscotti',
        porzione:'biscotto(13g)',
        quantita:'2',
        title: 'Biscotti',
      },
      {
        id: 'Caffè',
        porzione:'tazzina(20ml)',
        quantita:'1',
        title: 'Caffè amaro',
      }
    ];

    const renderItem = ({ item }) => (
      <CiboCard id={item.id} porzione={item.porzione} quantita={item.quantita} title={item.title}/>
    );
    
    const Item = ({ title }) => (
      <CiboCard/>
    );

  return (
    <View style={{flex:1}}>
        <View style={styles.container_searchbox}>
          <View style={styles.searchbox}> 
            <Text>Cerca alimento...</Text>
          </View>
        </View>  

      <View style={{flex:2}}>
        <CustomNavbar type={"questionari"} isSelected={isSelected} selezioni={["Tutti","Preferiti","La mia colazione"]} handleselection={handleselection}/>
      </View>
    
     <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    </View>
  )
}

const styles = StyleSheet.create({

container_searchbox: {
  flex:0.5,
  justifyContent: 'center',
  borderBottomWidth:1,
  borderBottomColor: "lightgrey"
},

searchbox: {
  flex:0,
  padding:10,
  margin:15,
  borderWidth:1,
  borderRadius:20,
}


})
