import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";

const icons = {
  "fork-knife": require("../../assets/fork-knife.png"),
  sup: require("../../assets/sup.png"),
  metric: require("../../assets/metric.png"),
  workout: require("../../assets/workout.png"),
  cart: require("../../assets/cart.png"),
  gift: require("../../assets/gift.png"),
};

export default function HomeScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const isScrollable = height <= 653;

  const buttons = [
    { icon: "fork-knife", screen: "Menu", imageSize: 0.78 },
    { icon: "sup", screen: "Supplements", imageSize: 0.9 },
    { icon: "metric", screen: "Anthropometry", imageSize: 0.87 },
    { icon: "workout", screen: "Workout", imageSize: 0.92 },
    { icon: "cart", screen: "Store", imageSize: 0.825, imageOffsetX: -18, paddingLeft: 10 },
    { icon: "gift", screen: "Gift", imageSize: 1.39 },
  ];

  // duplicar os itens várias vezes para scroll infinito
  const loopedButtons = [...buttons, ...buttons, ...buttons];

  let flatListRef;

  const renderButton = ({ item }) => (
    <View style= {styles.homeButton}>
    <HomeButton
      iconSource={icons[item.icon]}
      onPress={() => navigation.navigate(item.screen)}
      imageSize={item.imageSize}
      imageOffsetX={item.imageOffsetX}
      paddingLeft={item.paddingLeft}
    />
    </View>
  );

  const handleScroll = ({ nativeEvent }) => {
    const yOffset = nativeEvent.contentOffset.y;
    const contentHeight = nativeEvent.contentSize.height;
    const layoutHeight = nativeEvent.layoutMeasurement.height;

    // se chegar próximo do final, reposiciona para o meio para efeito infinito
    if (yOffset + layoutHeight >= contentHeight - 20 && flatListRef) {
      flatListRef.scrollToOffset({ offset: contentHeight / 3, animated: false });
    }

    // opcional: se quiser também reiniciar para o início no topo
    if (yOffset <= 0 && flatListRef) {
      flatListRef.scrollToOffset({ offset: contentHeight / 3, animated: false });
    }
  };

  return (
    <View style={styles.container}>

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
  container: { flex: 1, backgroundColor: "orange" },
  cardWrapper: { flex: 1, padding: 20, paddingBottom: 80 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 20, maxHeight: 460 },
  scroll: { paddingBottom: 40, justifyContent: "center" },
  row: {
    justifyContent: "space-evenly",
  },
  homeButton: {
    marginBottom: 16,
  }
});
