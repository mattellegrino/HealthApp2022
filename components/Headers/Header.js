import React from "react";
import { Text } from "react-native";
const s = require("../../core/styles");

export default function Header(props) {
  if (props.type === "h1 bold") {
    return <Text style={s.headerbold} {...props} />;
  }
  if (props.type === "h2") {
    return <Text style={s.header2bold} {...props} />;
  } else {
    return <Text style={s.header3bold} {...props} />;
  }
}
