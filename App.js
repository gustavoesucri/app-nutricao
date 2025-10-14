import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import { View, Text, Button } from "react-native";
import AnthropometryScreen from "./src/screens/AnthropometryScreen";
import DailyScreen from "./src/screens/DailyScreen";
import MealsScreen from "./src/screens/MealsScreen";



const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>📄 Tela de Detalhes</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // desativa o header nativo em todas as telas
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Daily" component={DailyScreen} />
          <Stack.Screen
            name="Anthropometry"
            component={AnthropometryScreen}
            options={{ title: "Physical Assessment" }}
          />
          <Stack.Screen name="Meals" component={MealsScreen} />
        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  );
}
