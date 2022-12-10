import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage_s from "../../components/pages/HomePage/HomePage_s";
import Questionari from "../../components/pages/Questionari/Questionari";
import Impostazioni from '../pages/Impostazioni/Impostazioni';
import Sonno_s from '../pages/Sonno/Sonno_s';
import { Ionicons } from '@expo/vector-icons';
import Attività_fisica_s from '../pages/Attività fisica/Attività_fisica_s';
import { FontAwesome5 } from "@expo/vector-icons";

const Tabs = ({ navigation, route }) => {


    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='HomePage_'>

    <Tab.Screen name="Alimentazione" component={Questionari} options={{
                    headerShadowVisible: true,
                    headerBackTitleVisible: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: 'Alimentazione',
                    tabBarIcon: () => (
                        <Ionicons name="nutrition-sharp" color={"black"} size={20} />
                    ),
                }}/>
        <Tab.Screen name="Attività fisica" component={Attività_fisica_s} options={{
                    headerShadowVisible: true,
                    headerBackTitleVisible: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: 'Attività fisica',
                    tabBarIcon: () => (
                        <FontAwesome5 name="running" size={20} color="black"/>
                    ),
                }}/>
                
       <Tab.Screen
                    name="HomePage_"  options={{
                        title: "Homepage",
                        headerBackTitleVisible: false,
                        headerShown: false,
                        tabBarLabel: 'Homepage',
                        tabBarIcon: () => (
                          <Ionicons name="home" color={"black"} size={30} />
                        ),
                    }}>
                    {(props) => <HomePage_s username={route.params.username}/>}
        </Tab.Screen>

       
       <Tab.Screen name="Impostazioni" component={Impostazioni} options={{
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: 'Impostazioni',
                    tabBarIcon: () => (
                     <Ionicons name="settings-outline" color={"black"} size={20} />
                    ),
                }}/>
       <Tab.Screen name="Sonno_s" component={Sonno_s} options={{
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    title: "Sonno",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: 'Sonno',
                        tabBarIcon: () => (
                          <Ionicons name="moon-sharp" color={"black"} size={20} />
                    ),
                }}/>         
    </Tab.Navigator>
  )
}

export default Tabs