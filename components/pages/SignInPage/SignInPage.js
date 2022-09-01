import React, {useEffect, useState} from 'react'
import {
    View,
    useWindowDimensions,
    SafeAreaView,
    ImageBackground,
    ActivityIndicator,
    Alert,
    BackHandler
} from 'react-native'
import CustomInput from  '../../CustomInput'
import CustomButton from "../../CustomButton";
import Header from "../../Headers/Header";
import { styles } from "../../../core/styles";


const SignInPage = ({ navigation }) =>  {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    let   [loggedUser, setLoggedUser] = useState(undefined),result_login,logged=false
    const [authenticationError, setAuthenticationError] = useState(false);

    const doLogin = async () => {
        try{
            loggedUser = await login(username, password);
            console.log(loggedUser)
            setLoggedUser(loggedUser);
            logged=true
        } catch (err) {
            setAuthenticationError(true);
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.container_header}>
                <Header type="h1"> HealthApp </Header>
            </View>
            <View style={styles.root}>
                <CustomInput placeholder="Username"  value={username} setValue={setUsername}  />
                <CustomInput placeholder="Password"  value={password} setValue={setPassword} secureTextEntry={true}  />
                <CustomButton  onPress={async () => {
                    setIsLoading(false)
                    result_login = await doLogin()
                    if (logged) {
                        // go to main page
                        navigation.navigate('HomePage',{ username:username,
                            password:password
                        } )

                    } else {
                        Alert.alert("Errore di autenticazione, riprovare")
                        setIsLoading(true)
                        logged = false
                    }
                }
                }  button={"first"} text={isLoading ? "Accedi" :
                    (loggedUser?"Loggato":<ActivityIndicator/>)
                }/>
            </View>

        </SafeAreaView>
    );
};

 async function login(username, password){
    const formData  = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return new Promise ((resolve, reject) => {
        fetch(`http://${global.matteo}:8080/login`, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                const user = response.json()
                if (response.ok){
                    resolve(user);
                } else {
                    reject(user)
                }
            })
            .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
    })
}



export default SignInPage
