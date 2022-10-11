import React, {Component, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {useNavigation} from "@react-navigation/native";
// uri: 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238S2T&scope=activity%20cardio_fitness%20heartrate%20location%20nutrition%20oxygen_saturation%20profile%20respiratory_rate%20settings%20sleep%20social%20temperature%20weight'

const WEBVIEW_REF = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238S2T&scope=activity%20cardio_fitness%20heartrate%20location%20nutrition%20oxygen_saturation%20profile%20respiratory_rate%20settings%20sleep%20social%20temperature%20weight'
const INTERCEPT_URL ='http://localhost:8080/api/oauth-callback';
const MY_URL ='http://192.168.1.53:8080/api/oauth-callback';


let webViewRef ;
let navigation ;
let value;

const onShouldStartLoadWithRequest = (navigator) => {
    console.log("Navigator.url fuori" + navigator.url)

    if (navigator.url.indexOf(INTERCEPT_URL) === -1) {
        value =true;
        return value;
    } else {
        console.log("Navigator.url dentro" + navigator.url)
        const new_URL = MY_URL + navigator.url.substring(40,navigator.url.length+1)
        console.log("New url   "+ new_URL)
        webViewRef.uri=new_URL;
        value=false;
        return value;
    }
}



const FitbitForm = ({ route })  =>  {
    webViewRef = useRef();
    navigation = useNavigation();

    let {cookie} = route.params;

    console.log(cookie);

        return (
            <WebView
                ref={webViewRef}
            source={{
                uri: WEBVIEW_REF,
                headers: {
                    Cookie: cookie,
                },

            }}
             onShouldStartLoadWithRequest={ onShouldStartLoadWithRequest}
            onNavigationStateChange ={onShouldStartLoadWithRequest } //for Android
            sharedCookiesEnabled={true}
        />
        );
};
export default FitbitForm;