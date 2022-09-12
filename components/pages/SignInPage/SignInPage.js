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
import * as Network from "expo-network";
import publicIP from 'react-native-public-ip';
import User from "../../../classes/User";
import Doctor from "../../../classes/Doctor";
import Patient from "../../../classes/Patient";
const styles = require("../../../core/styles");

const SignInPage = ({ navigation }) =>  {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    let   [loggedUser, setLoggedUser] = useState(undefined),result_login,logged=false
    const [authenticationError, setAuthenticationError] = useState(false);
    let user,role,ip_add

    const doLogin = async () => {
        try{
            /*
            try {
                ip_add = await Network.getIpAddressAsync();
                console.log(ip_add)
            }
            catch ( err)
            {
                setAuthenticationError(true)
            }
             */

            //indirizzo ip locale, da capire meglio quale ip usare quando i docker del backend saranno pronti.

                ip_add = global.enrico
                //ip_add = global.matteo

                loggedUser = await login(username, password,ip_add);
                console.log(loggedUser);
                role = loggedUser.roles[0].authority.split("_")[1]
                console.log(role)
                user = await getUser(username, role);
                console.log(user);
                setLoggedUser(loggedUser);
                logged=true
                localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        } catch (err) {
            setAuthenticationError(true);
        }
    }

    async function getUser(username, type) {
        if (type === "ADMIN"){
            return undefined
        }
        const response = await fetch(`http://${ip_add}:8080/api/users/${username}?userType=${type}`);
        const userJson = await response.json();
        if (response.ok){
            switch (type){
                default:
                    return User.from(userJson);
                case "DOCTOR":
                    return Doctor.from(userJson);
                case "PATIENT":
                    return Patient.from(userJson);
            }
        } else {
            throw userJson;
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
                            ip_add:ip_add,user:user
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
            .catch(err => { reject ({'error': 'Cannot communicate with the server'})})
    })
}



export default SignInPage
