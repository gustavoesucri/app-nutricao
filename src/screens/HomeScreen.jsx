import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Header title="Início" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <View style={styles.row}>
              <HomeButton
                iconSource={require("../../assets/fork-knife.png")}
                onPress={() => navigation.navigate("Menu")} // Rota futura
                imageSize={0.78}
              />
              <HomeButton
                iconSource={require("../../assets/sup.png")}
                onPress={() => navigation.navigate("Supplements")} // Rota futura
                imageSize={0.9}
              />
            </View>
            <View style={styles.row}>
              <HomeButton
                iconSource={require("../../assets/metric.png")}
                onPress={() => navigation.navigate("Anthropometry")} // Já funciona
                imageSize={0.87}
              />
              <HomeButton
                iconSource={require("../../assets/workout.png")}
                onPress={() => navigation.navigate("Workout")} // Rota futura
                imageSize={0.92}
              />
            </View>
            <View style={styles.row}>
              <HomeButton
                iconSource={require("../../assets/cart.png")}
                onPress={() => navigation.navigate("Store")} // Rota futura
                imageSize={0.825}
                imageOffsetX={-18}
                paddingLeft={10}
              />
              <HomeButton
                iconSource={require("../../assets/gift.png")}
                onPress={() => navigation.navigate("Gift")} // Rota futura
                imageSize={1.39}
              />
            </View>
          </View>

          <Text style={styles.title}>🏠 Home</Text>
          <Text style={styles.subtitle}>Bem-vindo ao app!</Text>

          <Button
            title="Ir para detalhes"
            onPress={() => navigation.navigate("Details")}
          />

          <View style={{ height: 12 }} />

          <Button
            title="Ir para Avaliação Física"
            onPress={() => navigation.navigate("Anthropometry")}
          />
        </ScrollView>
      </View>
      <Footer navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 11,
  },
  scroll: {
    paddingBottom: 80,
  },
});
