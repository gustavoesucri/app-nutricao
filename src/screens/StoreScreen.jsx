import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import whey from "../../assets/products/whey.png";
import barrinha from "../../assets/products/barrinha.png";
import creatina from "../../assets/products/creatina.png";
import bcaa from "../../assets/products/bcaa.png";
import PropTypes from "prop-types";


export default function StoreScreen({ navigation }) {
  const produtos = [
    {
      id: "1",
      nome: "Whey Protein",
      descricao: "Proteína concentrada para ganho de massa muscular.",
      preco: 129.9,
      imagem: whey,
    },
    {
      id: "2",
      nome: "Creatina",
      descricao: "Suplemento para força e desempenho nos treinos.",
      preco: 89.9,
      imagem: creatina,
    },
    {
      id: "3",
      nome: "Barrinha de Proteína",
      descricao: "Snack saudável e rico em proteínas.",
      preco: 8.5,
      imagem: barrinha,
    },
    {
      id: "4",
      nome: "BCAA",
      descricao: "Aminoácidos essenciais para recuperação muscular.",
      preco: 59.9,
      imagem: bcaa,
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Loja" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Produtos</Text>

          {/* Container com imagens lado a lado e quebra de linha */}
          <View style={styles.produtosContainer}>
            {produtos.map((item) => (
              <View key={item.id} style={styles.item}>
                <Image source={item.imagem} style={styles.imagem} />
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  scroll: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  produtosContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // 👉 faz quebrar linha quando não couber
    justifyContent: "space-between",
  },
  item: {
    width: "47%", // duas colunas por linha com espaçamento
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    padding: 10,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  preco: {
    fontSize: 15,
    color: "#2e7d32",
    fontWeight: "600",
  },
});

StoreScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
