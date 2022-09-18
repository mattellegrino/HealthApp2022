import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import HomePage from "./components/pages/HomePage/HomePage";
import SleepChart from "./components/graphs/SleepChart";
import ServerData from "./components/pages/SignInPage/ServerData";
import Impostazioni from "./components/pages/Impostazioni/Impostazioni";
import Questionari from "./components/pages/Questionari/Questionari";
import Sonno from "./components/pages/Sonno/Sonno";
import Attivitàfisica from "./components/pages/Attività fisica/Attività fisica";
import Progressi from "./components/pages/Progressi/Progressi";
import Peso from "./components/pages/Peso/Peso";
import Questionario from "./components/pages/Questionari/Questionario";
import Profilo from "./components/pages/Profilo/Profilo";
import Recommendation from "./components/pages/Recommendation";
import Alimentazione from "./components/pages/Alimentazione/Alimentazione";
import InserisciAlimento from "./components/pages/Alimentazione/InserisciAlimento";

const Stack = createNativeStackNavigator();
global.matteo = "192.168.1.127";
global.enrico = "192.168.1.196";
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: "Benvenuto",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={SignInPage}
        options={{
          title: "Benvenuto in Health App!",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
           fontSize: 16
          }
   }}
      />
      <Stack.Screen name="Impostazioni" component={Impostazioni} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }}/>
      <Stack.Screen name="Profilo" component={Profilo} options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 16
            }
      }}/>
      <Stack.Screen name="Questionari" component={Questionari}  options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }}  />
      <Stack.Screen name="Questionario" component={Questionario} options={{
         headerShadowVisible: false,
         title:"",
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />
      <Stack.Screen name="Sonno" component={Sonno} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />
      <Stack.Screen name="Peso" component={Peso} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />
      <Stack.Screen name="Attività fisica" component={Attivitàfisica} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />
      <Stack.Screen name="Recommendation" component={Recommendation}  options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }}/>
  <Stack.Screen name="Alimentazione" component={Alimentazione}  options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }}/>
    <Stack.Screen name="Alimenti" component={InserisciAlimento}  options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         headerTitleStyle: {
          fontSize: 16
         }
  }}/>
      <Stack.Screen name="ServerData" component={ServerData} />
      <Stack.Screen name="SleepChart" component={SleepChart} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default App;
