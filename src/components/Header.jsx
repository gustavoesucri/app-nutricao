import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Appbar } from 'react-native-paper';

export default function Header({ title, navigation }) {

  const isHome = title === "Início"; // identifica se é a Home

  return (
    <View style={styles.container}>
      {/* Botão esquerdo de voltar */}
      {!isHome && navigation ? ( // só mostra se não for Home
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
           <Appbar.BackAction onPress={() => navigation.goBack()} />
        </TouchableOpacity>
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
