import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import {
    ProgressChart,
  } from "react-native-chart-kit";
const s = require("../../../core/styles");

export default function ValoriNutrizionaliBox(props) {
  return (
    <View style={styles.container}>
        <ProgressChart
                      data={[0.8]}
                      width={Dimensions.get("screen").width/9}
                      height={Dimensions.get("screen").height/20}
                      strokeWidth={5}
                      radius={16}
                      hideLegend={true}
                      chartConfig={{
                        backgroundColor: "#FFF",
                        backgroundGradientFrom: "#FFF",
                        backgroundGradientTo: "#FFF",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(249, 168, 37, ${opacity})`,
                        style: {
                          
                          borderRadius: 16,
                          position: "relative",
                        },
                      }}
                    />
      <View sytle={styles.textcontainer}>
        <Text style={s.smalltext("medium")}>{props.nome}</Text>
        <Text style={s.smalltext("regular")}>22g rimasti </Text>
      </View>                                
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        height:"80%",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"

    },

    textcontainer: {
        flex:1,
        alignItems: "center",
    }

})