import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from "../../components/pages/HomePage/HomePage";
import Questionari from "../../components/pages/Questionari/Questionari";
import Impostazioni from '../pages/Impostazioni/Impostazioni';
import Sonno_s from '../pages/Sonno/Sonno_s';
import { Ionicons } from '@expo/vector-icons';
import Attività_fisica_s from '../pages/Attività fisica/Attività_fisica_s';

const Tabs = ({ route }) => {


    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator 
        initialRouteName='HomePage_'
        backBehavior='initialRoute'
        screenOptions={{
            tabBarStyle: { height: 55,backgroundColor: "#1565C0"},
          }}>

        <Tab.Screen name="Alimentazione" component={Questionari} 
                    options={{
                    headerShadowVisible: true,
                    headerBackTitleVisible: true,
                    tabBarLabelPosition: "below-icon",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: ({focused}) => (
                        <Text style={focused ? styles.selectedTab : styles.notselectedTab}>Alimentazione</Text>
                    ),
                    tabBarLabelStyle: {fontSize: 10, color: 'white'},
                    tabBarIcon: ({focused}) => (
                        <Ionicons name= {focused ? "nutrition" : "nutrition-outline"} color={"white"} size={focused ? 20 : 14}/>
                    ),
                }}/>
        <Tab.Screen name="Attività fisica" component={Attività_fisica_s} options={{
                    headerShadowVisible: true,
                    headerBackTitleVisible: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: ({focused}) => (
                        <Text style={focused ? styles.selectedTab : styles.notselectedTab}>Attività fisica</Text>
                        ),
                    tabBarLabelStyle: {fontSize: 10, color: 'white'},
                    tabBarIcon: ({focused}) => (
                        <Ionicons name= {focused ? "heart" : "heart-outline" } color='white' size={focused ? 20 : 14}></Ionicons>                    ),
                }}/>
                
        <Tab.Screen name="HomePage_"  options={{
                        title: "Homepage",
                        headerBackTitleVisible: false,
                        headerShown: false,
                        tabBarLabel: ({focused}) => (
                            <Text style={focused ? styles.selectedTab : styles.notselectedTab}>Home</Text>
                        ),
                        tabBarLabelStyle: {fontSize: 10, color: 'white'},
                        tabBarIcon: ({focused}) => (
                            <Ionicons name= { focused ? "home" : "home-outline"} color={"white"} size={focused ? 20 : 14} />
                           ),
                    }}>
                    {(props) => <HomePage username={route.params.username}/>}
        </Tab.Screen>
  
       <Tab.Screen name="Impostazioni" component={Impostazioni} options={{
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: ({focused}) => (
                        <Text style={focused ? styles.selectedTab : styles.notselectedTab}>Impostazioni</Text>
                    ),
                    tabBarLabelStyle: {fontSize: 10},
                    tabBarIcon: ({focused}) => (
                     <Ionicons name= { focused ? "settings" : "settings-outline"} color={"white"} size={focused ? 20 : 14} />
                    ),
                }}/>
       <Tab.Screen name="Sonno_s" component={Sonno_s} options={{
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    title: "Sonno",
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    tabBarLabel: ({focused}) => (
                        <Text style={focused ? styles.selectedTab : styles.notselectedTab}>Sonno</Text>
                    ),
                    tabBarLabelStyle: {fontSize: 10, color: 'white'},
                        tabBarIcon: ({focused}) => (
                          <Ionicons name={ focused ? "moon" : "moon-outline"} color={"white"} size={focused ? 20 : 18} />
                    ),
                }}/>         
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

    selectedTab: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
    },
    notselectedTab: {
        display: "none",
        fontSize: 10,
        color: "grey"
    }


})

export default Tabs