import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import imagem1 from "../../assets/gift.png";
import PropTypes from "prop-types";

export default function StoreScreen({ navigation }) {
  const produtos = [
    {
      id: "1",
      nome: "Whey Protein",
      descricao: "Proteína concentrada para ganho de massa muscular.",
      preco: 129.90,
      imagem: imagem1,
    },
    {
      id: "2",
      nome: "Creatina",
      descricao: "Suplemento para força e desempenho nos treinos.",
      preco: 89.90,
      imagem: imagem1,
    },
    {
      id: "3",
      nome: "Barrinha de Proteína",
      descricao: "Snack saudável e rico em proteínas.",
      preco: 8.50,
      imagem: imagem1,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Loja" navigation={navigation} />
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "orange" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 12,
  },
});

StoreScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
