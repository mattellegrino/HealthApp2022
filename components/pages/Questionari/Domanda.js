import { View, Text } from 'react-native'
import React from 'react'

export default function Domanda(props) {
  return (
    <View>
      <Text>Domanda n° {props.n_domanda} </Text>
    </View>
  )
}