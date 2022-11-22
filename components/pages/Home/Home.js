import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage_s from "../HomePage/HomePage_s";
import Questionari from "../Questionari/Questionari";
const Tab = createBottomTabNavigator();

export default function Home() {


  return (
    <Tab.Navigator>
       <Tab.Screen
                    name="HomePage_"
                    component={HomePage_s}
                    options={{
                        title: "Benvenuto",
                        headerBackTitleVisible: false,
                        headerShown: false,
                    }}
                />
       <Tab.Screen name="Questionari" component={Questionari} options={{
                    headerShadowVisible: false,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16
                    }
                }}/>
    </Tab.Navigator>
  )
}