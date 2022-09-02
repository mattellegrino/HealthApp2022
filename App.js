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
        options={{ title: "Welcome to HealthApp" }}
      />
      <Stack.Screen name="Impostazioni" component={Impostazioni} />
      <Stack.Screen name="Questionari" component={Questionari} />
      <Stack.Screen name="Questionario" component={Questionario} />
      <Stack.Screen name="Sonno" component={Sonno} />
      <Stack.Screen name="Peso" component={Peso} />
      <Stack.Screen name="Attività fisica" component={Attivitàfisica} />
      <Stack.Screen name="Progressi" component={Progressi} />
      <Stack.Screen name="ServerData" component={ServerData} />
      <Stack.Screen name="SleepChart" component={SleepChart} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default App;
