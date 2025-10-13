import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Início" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.row}>
            <HomeButton
              iconSource={require("../../assets/fork-knife.png")}
              onPress={() => {}}
              imageSize={0.78}
              imageOffsetX={0}
              imageOffsetY={0}
            />
            <HomeButton
              iconSource={require("../../assets/sup.png")}
              onPress={() => {}}
              imageSize={0.9}
              imageOffsetX={0}
              imageOffsetY={0}
            />
          </View>
          <View style={styles.row}>
            <HomeButton
              iconSource={require("../../assets/metric.png")}
              onPress={() => {}}
              imageSize={0.87}
              imageOffsetX={0}
              imageOffsetY={0}
            />
            <HomeButton
              iconSource={require("../../assets/workout.png")}
              onPress={() => {}}
              imageSize={0.92}
              imageOffsetX={0}
              imageOffsetY={0}
            />
          </View>
          <View style={styles.row}>
            <HomeButton
              iconSource={require("../../assets/cart.png")}
              onPress={() => {}}
              imageSize={0.825}
              imageOffsetX={-18}
              imageOffsetY={0}
              paddingLeft={10}
            />
            <HomeButton
              iconSource={require("../../assets/gift.png")}
              onPress={() => {}}
              imageSize={1.39}
              imageOffsetX={0}
              imageOffsetY={0}
              />
              </View>
        </View>

        <Text style={styles.title}>🏠 Home</Text>
        <Text style={styles.subtitle}>Bem-vindo ao app!</Text>
        <Text style={styles.subtitle}>
          OBS: Nesta tela deverá ter os botões que levam às outras telas.
        </Text>
        <Text style={styles.subtitle}>
          Exemplo: O botão azul Avaliação Física será um botão grande com
          imagem/ícone somente. Assim como todos os outros.
        </Text>

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
    paddingBottom: 20,
  },
});
