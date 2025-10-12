import { View, Text, Button, StyleSheet } from "react-native";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Início" navigation={navigation} />
      <View style={styles.card}>
        <HomeButton iconSource={require("../../assets/metric.png")} onPress={() => {}} />

      </View>

      <Text style={styles.title}>🏠 Home</Text>
      <Text style={styles.subtitle}>Bem-vindo ao app!</Text>
      <Text style={styles.subtitle}>OBS: Nesta tela deverá ter os botões que levam às outras telas.</Text>
      <Text style={styles.subtitle}>Exemplo: O botão azul Avaliação Física será um botão grande com imagem/ícone somente. Assim como todos os outros.</Text>

      <Button
        title="Ir para detalhes"
        onPress={() => navigation.navigate("Details")}
      />

      <View style={{ height: 12 }} />

      <Button
        title="Ir para Avaliação Física"
        onPress={() => navigation.navigate("Anthropometry")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange"
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
});
