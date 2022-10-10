import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class FitbitForm extends Component {
    render() {
        return <WebView source={{ uri: 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=238S2T&scope=activity%20cardio_fitness%20heartrate%20location%20nutrition%20oxygen_saturation%20profile%20respiratory_rate%20settings%20sleep%20social%20temperature%20weight' }} />;
    }
}
export default FitbitForm;