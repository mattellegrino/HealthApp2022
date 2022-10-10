import React, {Component, useEffect, useState} from 'react'
import {
    View,
    useWindowDimensions,
    SafeAreaView,
    ImageBackground,
    ActivityIndicator,
    Alert,
    BackHandler, Keyboard
} from 'react-native'

import CustomInput from  '../../CustomInput'
import CustomButton from "../../CustomButton";
import Header from "../../Headers/Header";
import Patient from "../../../classes/Patient";
const styles = require("../../../core/styles");
import { WebView } from 'react-native-webview';

const SignInPage = ({ navigation }) =>  {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    let   [loggedUser, setLoggedUser] = useState(undefined),result_login
    const [authenticationError, setAuthenticationError] = useState(false);
    const [errors, setErrors] = React.useState({});
    let fullUser;
    let user,role,ip_add
    let token_exists;
    let fitbit_flag=false;


    const doLogin = async () => {
        try{
            //indirizzo ip locale, da capire meglio quale ip usare quando i docker del backend saranno pronti.
                ip_add = global.enrico
                //ip_add = global.matteo
                const authUser = await login(username,password,ip_add);
                console.log(authUser);
                token_exists = authUser.tokenExists
                if(!token_exists)
                {
                    fitbit_flag=true;
                }
                console.log(token_exists)
                role = authUser.roles[0].authority.split("_")[1]
                console.log(role)
                user = await getUser(username, role);
                global.id = user.id;
                console.log(user);
                fullUser = { authUser : authUser, user : user};
                localStorage.setItem("loggedUser", JSON.stringify(fullUser));

        } catch (err) {
            setAuthenticationError(true);
        }
    }

    async function getUser(username, type) {

        const response = await fetch(`http://${ip_add}:8080/api/users/${username}?userType=${type}`);
        const userJson = await response.json();
        if (response.ok){
            switch (type){
                case "PATIENT":
                    return Patient.from(userJson);
                default:
                    console.log("Login non autorizzato nell'app.")
                    throw userJson;
            }
        } else {
            throw userJson;
        }
    }


    /*
    async function doLogout(){
        console.log("Logout")
        setLoggedUser(undefined);
        localStorage.clear()
        await API.logout()
    }
     */


    const checkAuth =  () => {

    }


    const check_userdata_and_login = async () => {
        setIsLoading(false)
        //checkAuth()
        if(!loggedUser)
        {
            //loggati
              await doLogin()

            if (!authenticationError) {

                // login andato a buon fine.
                setIsLoading(true);
                if(!fitbit_flag)
                {
                    navigation.navigate('FitbitForm')
                }
                else
                {
                    navigation.navigate('HomePage',{ username:username,
                        ip_add:ip_add,user:user
                    } )
                }

            } else {
                Alert.alert("Errore di autenticazione, riprovare")
                setIsLoading(true)
            }
        }
        else
        {
            //vai direttamente homepage
            navigation.navigate('HomePage',{ username:username,
                ip_add:ip_add,user:user
            } )
        }
    };

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!username) {
            handleError('Per favore inserisci un username', 'username');
            isValid = false;
        }
        if (!password) {
            handleError('Per favore inserisci una password', 'password');
            isValid = false;
        }
        if (isValid) {
            await check_userdata_and_login()
        }
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };



    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.container_header}>
                <Header type="h1"> HealthApp </Header>
            </View>
            <View style={styles.root}>
                <CustomInput placeholder="Username"  value={username} setValue={setUsername}  onFocus={() => handleError(null, 'username')} error={errors.username}  />
                <CustomInput placeholder="Password"  value={password} setValue={setPassword} secureTextEntry={true}  onFocus={() => handleError(null, 'password')} error={errors.password} />
                <CustomButton  onPress={
                    validate
                } button={"first"} text={isLoading ? "Accedi" :
                    (loggedUser?"Loggato":<ActivityIndicator/>)
                }
                />
            </View>
        </SafeAreaView>
    );
};

 async function login(username, password,ip_add){
    const formData  = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    console.log(`http://${ip_add}:8080/login`)
     return new Promise ((resolve, reject) => {
        fetch(`http://${ip_add}:8080/login`, {
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
            .catch(err => { reject ({'error': 'Cannot communicate with the server'})
                                throw err;
            })
    })
}

export default SignInPage
