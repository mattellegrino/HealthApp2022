import React from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    ScrollView,
  } from "react-native";

export default function LabelComponent() {
  return (
    <View
          style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
          }}>
          <Text style={{color: 'white'}}>410</Text>
          </View>
  )
}
