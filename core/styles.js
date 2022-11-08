"use strict";
import { StyleSheet } from "react-native";
import { theme } from "./theme";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  container_header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container_homecard: {
    borderWidth: 1,
  },
  input_num: {
    width: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

    header: (type,weight,fontColor) => ({

    fontSize: type==1 ? 34 : type==2 ? 28 : type==3? 22: 18,
    color: fontColor? fontColor : theme.colors.text,
    fontWeight: weight == "bold" ? "700" : weight == "medium" ? "500" : weight == "regular" ? "400" : "300" 

  }),
 
  body: (weight,fontColor)=> ({

    fontSize: 14,
    color: fontColor ? fontColor : theme.colors.text,
    fontWeight: weight == "bold" ? "700" : weight == "medium" ? "500" : weight == "regular" ? "400" : "300" 

  }),

  text: (weight,fontColor) => ({

    fontSize: 13,
    color: fontColor ? fontColor : theme.colors.text,
    fontWeight: weight == "bold" ? "700" : weight == "medium" ? "500" : weight == "regular" ? "400" : "300" 

  }),

  smalltext: (weight,fontColor) => ({

    fontSize: 12,
    color: fontColor ? fontColor : theme.colors.text,
    fontWeight: weight == "bold" ? "700" : weight == "medium" ? "500" : weight == "regular" ? "400" : "300" 

  }),

  link: (weight,fontColor) => ({

    fontSize: 13,
    textDecorationLine: "underline",
    color: fontColor ? fontColor : theme.colors.text,
    fontWeight: weight == "bold" ? "700" : weight == "medium" ? "500" : weight == "regular" ? "400" : "300" 

  }),

  progress_rectangle: {

    height: 10,
    margin:10,
    backgroundColor: "white",
    borderWidth:1
  },
  progress_rectangle_active: {
    margin:10,
    height: 10,
    backgroundColor: "#F9A825",
    borderWidth:1
  },

  pointer: {
    height:10,
    width:10,
    backgroundColor: "black",
    alignSelf: "center",
    borderWidth:1,
    borderRadius: 50
  },

  root: {
    flex: 2,
    width: "80%",
  },
  input_container: {
    width: "100%",
    padding: 30,
  },

  primary_button: {
    backgroundColor: "#4E67EB",
    borderRadius: 10,
  },
  secondary_button: {
    backgroundColor: "#fff",
    borderColor: "#4E67EB",
    borderRadius: 10,
  },
  tertiary_button: {
    backgroundColor: "#F9A825",
    borderRadius: 10,
    borderColor: "#F9A825"
  },

  multichoicebutton_selected : type => ({
   backgroundColor: type == "questionari" ? "#FFF9C4" : type == "attività" ? "#000" : "#1565C0",
   borderRadius:20, 
   padding:10,
   paddingLeft:20,
   paddingRight:20
  }),

  multichoicebutton_notselected: {
    borderRadius:10,
    padding:10,
    paddingLeft:20,
    paddingRight:20
  },

  text_selected : type =>  ({
    fontWeight: "500",
    color: type == "questionari" ? "#BB530B" : type == "attività" ? "#fff" : "#fff",
  }),

  primary_button_text : size => ({

    padding: 8,
    paddingHorizontal: 20,
    fontSize: size=="medium" ? 15 : size=="big" ? 20 : 10,
    color: "white"

  }),

  secondary_button_text : size => ({

    padding: 8,
    paddingHorizontal: 20,
    fontSize: size=="medium" ? 15 : size=="big" ? 20 : 10,
    color: "#4E67EB"

  }),

  tertiary_button_text : size => ({

    padding: 8,
    paddingHorizontal: 20,
    fontSize: size=="medium" ? 15 : size=="big" ? 20 : 10,
    color: "#FFF"

  }),


  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    width: "100%",
    height: 50,
    marginBottom: 30,
    paddingLeft: 10,
  },

  copertina_questionario: {
    width: 100,
    height:100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },

  circle: {

    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    width: 20,
    height: 20

  }
});