import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./components/pages/SignInPage/SignInPage";
import SleepChart from "./components/graphs/SleepChart";
import ServerData from "./components/pages/SignInPage/ServerData";
import Impostazioni from "./components/pages/Impostazioni/Impostazioni";
import Questionari from "./components/pages/Questionari/Questionari";
import Progressi from "./components/pages/Progressi/Progressi";
import Peso from "./components/pages/Peso/Peso";
import Questionario from "./components/pages/Questionari/Questionario";
import Profilo from "./components/pages/Profilo/Profilo";
import Recommendation from "./components/pages/Recommendation";
import Alimentazione from "./components/pages/Alimentazione/Alimentazione";
import InserisciAlimento from "./components/pages/Alimentazione/InserisciAlimento";
import HomePage_s from "./components/pages/HomePage/HomePage_s";
import HomePage_c from "./components/pages/HomePage/HomePage_c";
import Sonno_c from "./components/pages/Sonno/Sonno_c";
import Sonno_s from "./components/pages/Sonno/Sonno_s";
import Attività_fisica_s from "./components/pages/Attività fisica/Attività_fisica_s";
import Attività_fisica_c from "./components/pages/Attività fisica/Attività_fisica_c";
import Analisi from "./components/pages/Analisi/Analisi";
import FitbitForm from "./components/pages/SignInPage/FitbitForm";
import AnalisiOutput from "./components/pages/Analisi/AnalisiOutput";

global.matteo = "192.168.1.127";
global.enrico = "192.168.1.53";

const Stack = createNativeStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="HomePage_s"
        component={HomePage_s}
        options={{
          title: "Benvenuto",
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomePage_c"
        component={HomePage_c}
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
      <Stack.Screen name="Sonno_c" component={Sonno_c} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         title:"Sonno",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />

<Stack.Screen name="Sonno_s" component={Sonno_s} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         title:"Sonno",
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
      <Stack.Screen name="Attività_fisica_s" component={Attività_fisica_s} options={{
         headerShadowVisible: false,
         headerTitleAlign: "center",
         title: "Attività fisica",
         headerTitleStyle: {
          fontSize: 16
         }
  }} />
   <Stack.Screen name="Attività_fisica_c" component={Attività_fisica_c} options={{
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
        <Stack.Screen name="Analisi" component={Analisi}  options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontSize: 16
            }
        }}/>

        <Stack.Screen name="AnalisiOutput" component={AnalisiOutput}  options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontSize: 16
            }
        }}/>


        <Stack.Screen name="FitbitForm" component={FitbitForm}  options={{
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
