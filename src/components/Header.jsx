import { View, Text, StyleSheet} from "react-native";
import { Appbar } from 'react-native-paper';

export default function Header({ title, navigation }) {

  const isHome = title === "Início"; // identifica se é a Home

  return (
    <View style={styles.container}>
      {/* Botão esquerdo de voltar */}
      {!isHome && navigation ? (
  <Appbar.BackAction
    onPress={() => navigation.goBack()}
    style={{ zIndex: 1 }} // Joga o botão para frente, para ficar completamente acessível ao toque. O título estava por cima de maneira invisível por ser absolute. Havia outras soluções, optei por esta.
  />
) : (
  <View style={styles.iconPlaceholder} />
)}

      {/* Título central */}
      <Text style={styles.title}>{title}</Text>

      {/* Botão direito com ícone de presente usando Paper */}
      <Appbar.Action
        icon="gift" // Usando o ícone de presente do Paper
        onPress={() => alert("clicou no ícone de presente")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // sombra no Android
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  iconButton: {
    padding: 5,
  },
  iconPlaceholder: {
    width: 24, // mantém o espaço se não houver botão de voltar
  },
});
