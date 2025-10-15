import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function WorkoutScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Header title="Exercícios" navigation={navigation} />
      <Text style={styles.text}>🏋️ Workout Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22 },
});
