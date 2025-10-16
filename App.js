import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";

import HomeScreen from "./src/screens/HomeScreen";
import AnthropometryScreen from "./src/screens/AnthropometryScreen";
import DiaryScreen from "./src/screens/DiaryScreen";
import MealsScreen from "./src/screens/MealsScreen";
import SupplementsScreen from "./src/screens/SupplementsScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import StoreScreen from "./src/screens/StoreScreen";
import MenuScreen from "./src/screens/MenuScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Meals" component={MealsScreen} />
          <Stack.Screen name="Diary" component={DiaryScreen} />
          <Stack.Screen
            name="Anthropometry"
            component={AnthropometryScreen}
            options={{ title: "Physical Assessment" }}
          />
          <Stack.Screen name="Supplements" component={SupplementsScreen} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
