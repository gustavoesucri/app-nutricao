import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function StoreScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Header title="Loje" navigation={navigation} />
      <Text style={styles.text}>🛒 Store Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22 },
});
