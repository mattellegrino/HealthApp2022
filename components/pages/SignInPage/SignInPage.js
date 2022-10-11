import React, { useEffect, useRef, useState} from 'react'
import {
    View,
    SafeAreaView,
    ActivityIndicator,
    Alert, Keyboard
} from 'react-native'

import CustomInput from  '../../CustomInput'
import CustomButton from "../../CustomButton";
import Header from "../../Headers/Header";
import Patient from "../../../classes/Patient";
const styles = require("../../../core/styles");
import * as SecureStore from 'expo-secure-store';

const SignInPage = ({ navigation }) =>  {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = React.useState({});
    let authenticationError= useRef(false);
    let   loggedUser = useRef(undefined)
    let   fitbit_flag = useRef(false);


    //indirizzo ip locale, da capire meglio quale ip usare quando i docker del backend saranno pronti.
    let ip_add = global.enrico
    //ip_add = global.matteo


    const doLogin = async () => {
        try{

                let authUser = await login(username,password,ip_add);
                console.log(authUser);

                let token_exists = authUser.tokenExists
                console.log(token_exists)

                if(token_exists===false)
                    fitbit_flag=true;

                let role = authUser.roles[0].authority.split("_")[1]
                console.log(role)

                let _user = await getUser(username, role);
                global.id = _user.id;
                console.log(_user);

                let fullUser = { authUser : authUser, user : _user};
                loggedUser=fullUser
                console.log(fullUser);

                await SecureStore.setItemAsync(
                'loggedUser',
                JSON.stringify(fullUser)
                );

        } catch (err) {
            console.log(err)
            authenticationError=true;
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


    const checkAuth = async () => {

        try {
            const value = await SecureStore.getItemAsync('cookie');
            if (value !== null) {
                // We have data!!
                console.log("Data inside cookie " + value);

                const user_storage = await SecureStore.getItemAsync(
                    'loggedUser'
                );
                console.log("Userstorage " + user_storage);

                const user_obj = JSON.parse(user_storage);
                loggedUser=user_obj

                //vai direttamente homepage
                console.log("Attraverso il cookie direttamente homepage");
                console.log("COOKIE :" + value)
                ip_add = global.enrico
                let username= user_obj.authUser.username;
                console.log("Userobj username: " +username)
                let _user = user_obj.user
                console.log("Userobj user: " +_user)

                global.id = _user.id;
                navigation.navigate('HomePage', {
                    username: username,
                    ip_add: ip_add
                })
            }
        } catch (error) {
            // Error retrieving data
            // user need to relogin
            console.log("error async storage");
            throw error;
        }

    }

    useEffect(  () => {
       checkAuth().then();
    },[]);

    const check_userdata_and_login = async () => {
        setIsLoading(false)
            //loggato
              await doLogin()
        console.log("Errore di autenticazione= ",authenticationError);
            if (authenticationError.current===false) {
                // login andato a buon fine.
                setIsLoading(true);
                console.log("Fitbit flag value= ",fitbit_flag)
                if(fitbit_flag.current===true)
                {
                    try {
                        const value = await SecureStore.getItemAsync('cookie');
                        if (value !== null) {
                            // We have data!!
                            console.log("Data inside cookie fitbitflag " + value);
                            navigation.navigate('FitbitForm', { cookie: value })
                        }
                    }
                    catch (err)
                    {
                        console.log(err);
                    }
                }
                else
                {
                    console.log("DATA: "+ loggedUser)
                    navigation.navigate('HomePage',{ username:loggedUser.authUser.username,
                        ip_add:ip_add,user:loggedUser.user
                    } )
                }

            } else {
                Alert.alert("Errore di autenticazione, riprovare")
                setIsLoading(true)
                authenticationError=false;
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
            .then(async (response) => {
                const user = response.json()
                if (response.ok) {
                    resolve(user);
                    let cookie = response.headers.get('set-cookie').split(";")[0].split("=").pop(); //JSESSIONID=.... split prende il valore finale
                    console.log(cookie)
                    try {
                        await SecureStore.setItemAsync(
                            'cookie',
                            cookie
                        );
                    } catch (error) {
                        // Error saving data
                        reject(error)
                    }
                } else {
                    reject(user)
                }
            })
            .catch(error => { reject ({'error': 'Cannot communicate with the server or cookie error'})
            })
    })
}

export default SignInPage
