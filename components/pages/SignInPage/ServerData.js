import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, BackHandler} from 'react-native';

const ServerData = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [isLoadingPatient, setLoadingPatient] = useState(false);
    const [users, setUsers] = useState([]);
    const [patient, setPatient] = useState();
    /* */
    const { username, ip_add ,user} = route.params;
    let getUsers,getPatientById


    /*
 async function logout(){
     console.log("LOGGING OUT")
     return await fetch(`http://192.168.1.196:8080/logout`);
 }

 async function doLogout(){
     console.log("DO LOGOUT")
     setLoggedUser(undefined);
     response_logout= await logout()
 }
*/

    getPatientById = () => {
        fetch(`http://${ip_add}:8080/api/patients/1`)
            .then((response) => response.json())
            .then((json) =>{ setPatient(json) ; console.log(json)})
            .catch((error) => { console.error(error)})
            .finally(() => setLoadingPatient(false));
    }

    getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    /*login backend mohamed */


    useEffect(() => {
        getUsers();
        getPatientById()
    }, []);

    return(
        <View style={{ padding: 20 }}>
            <Text style={{fontWeight: 'bold'}}>Il server esterno ha risposto con questo contenuto:</Text>
            {isLoading ? <ActivityIndicator/> :
                (
                    <FlatList
                        data={users}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => <Text>{item.name}  </Text>}
                    />
                )}
            <Text style={{fontWeight: 'bold'}}>Il server interno ha risposto con questo contenuto (JSON FILE):</Text>
            {isLoadingPatient ? <ActivityIndicator/> :
                (
                    <Text>{JSON.stringify(user)}</Text>
                )}
        </View>
    );
};
export default ServerData;
