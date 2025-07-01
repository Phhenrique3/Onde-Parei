import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuSreen from "./home/MenuScrenn";
import VagaSreen from "./home/VagaScreen";
import MapaSreen from "./home/MapaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuSreen} />
        <Stack.Screen name="salvaVaga" component={VagaSreen} />
        <Stack.Screen name="LimparVaga" component={VagaSreen} />
        <Stack.Screen name="VerVaga" component={VagaSreen} />
        <Stack.Screen name="Mapa" component={MapaSreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
