import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MealsScreen({ navigation }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Lista de refeições com suas opções e detalhes
  const meals = [
    {
      name: "Café da manhã",
      time: "08:30 - Café da manhã",
      options: [
        {
          id: 1,
          title: "Opção 1",
          meal: "Pão integral com ovo mexido e suco de laranja",
          timePrep: "10 min",
          ingredients: [
            "2 fatias de pão integral",
            "2 ovos",
            "1 laranja",
          ],
          mode: "Bata os ovos, frite mexendo até firmar e sirva com o pão e o suco.",
        },
        {
          id: 2,
          title: "Opção 2",
          meal: "Iogurte com frutas e granola",
          timePrep: "5 min",
          ingredients: [
            "1 copo de iogurte natural",
            "1 banana picada",
            "2 colheres de granola",
          ],
          mode: "Misture tudo em uma tigela e sirva gelado.",
        },
      ],
    },
    {
      name: "Almoço",
      time: "12:30 - Almoço",
      options: [
        {
          id: 1,
          title: "Opção 1",
          meal: "Arroz, feijão, frango grelhado e salada",
          timePrep: "30 min",
          ingredients: [
            "1 xícara de arroz",
            "1 concha de feijão",
            "100g de frango",
            "salada a gosto",
          ],
          mode: "Prepare o arroz e o feijão, grelhe o frango e sirva com salada.",
        },
      ],
    },
    {
      name: "Lanche da Tarde",
      time: "16:30 - Lanche da tarde",
      options: [
        {
          id: 1,
          title: "Opção 1",
          meal: "Iogurte natural com frutas picadas",
          timePrep: "5 min",
          ingredients: [
            "1 copo de iogurte natural",
            "1/2 banana fatiada",
            "1 colher de granola",
          ],
          mode: "Misture o iogurte com as frutas e finalize com a granola por cima.",
        },
        {
          id: 2,
          title: "Opção 2",
          meal: "Pão integral com queijo branco e tomate",
          timePrep: "5 min",
          ingredients: [
            "2 fatias de pão integral",
            "2 fatias de queijo branco",
            "2 rodelas de tomate",
          ],
          mode: "Monte o sanduíche com pão, queijo e tomate. Sirva fresco.",
        },
        {
          id: 3,
          title: "Opção 3",
          meal: "Banana com pasta de amendoim",
          timePrep: "2 min",
          ingredients: [
            "1 banana média",
            "1 colher de sopa de pasta de amendoim",
          ],
          mode: "Corte a banana em rodelas e espalhe a pasta de amendoim por cima.",
        }
      ],
    },    
    {
      name: "Jantar",
      time: "19:30 - Jantar",
      options: [
        {
          id: 1,
          title: "Opção 1",
          meal: "Macarronada italiana",
          timePrep: "25 min",
          ingredients: [
            "200g de macarrão",
            "Molho de tomate",
            "Queijo ralado",
          ],
          mode: "Cozinhe o macarrão, aqueça o molho e misture. Sirva com queijo.",
        },
        {
          id: 2,
          title: "Opção 2",
          meal: "Sopa de legumes",
          timePrep: "20 min",
          ingredients: [
            "Batata, cenoura, chuchu e temperos",
          ],
          mode: "Cozinhe tudo até amolecer e bata no liquidificador.",
        },
      ],
    },
    {
      name: "Ceia",
      time: "21:00 - Ceia",
      options: [
        {
          id: 1,
          title: "Opção 1",
          meal: "Leite morno com aveia",
          timePrep: "5 min",
          ingredients: [
            "1 copo de leite ou bebida vegetal",
            "2 colheres de sopa de aveia",
            "1 colher de chá de mel (opcional)",
          ],
          mode: "Aqueça o leite, misture a aveia e, se quiser, adicione mel. Sirva morno.",
        },
        {
          id: 2,
          title: "Opção 2",
          meal: "Iogurte natural com sementes",
          timePrep: "3 min",
          ingredients: [
            "1 copo de iogurte natural",
            "1 colher de chá de chia ou linhaça",
            "1 colher de chá de mel (opcional)",
          ],
          mode: "Misture todos os ingredientes em uma tigela e sirva.",
        },
        {
          id: 3,
          title: "Opção 3",
          meal: "Chá de camomila com biscoitos integrais",
          timePrep: "5 min",
          ingredients: [
            "1 xícara de chá de camomila",
            "2 biscoitos integrais",
          ],
          mode: "Prepare o chá e sirva junto com os biscoitos.",
        },
      ],
    }
  ];

  const handleMealSelect = (mealName) => {
    setSelectedMeal(selectedMeal === mealName ? null : mealName);
    setSelectedOption(null); // reseta opção quando muda de refeição
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(selectedOption === optionId ? null : optionId);
  };

  return (
    <View style={styles.container}>
      <Header title="Refeições do Dia" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.card}>
        {meals.map((meal) => (  
            <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity
              style={[
                styles.mealButton,
                selectedMeal === meal.name && styles.mealButtonActive,
              ]}
              onPress={() => handleMealSelect(meal.name)}
            >
              <Text style={styles.mealTitle}>{meal.time}</Text>
            </TouchableOpacity>

            {selectedMeal === meal.name && (
              <View style={styles.optionsContainer}>
                {meal.options.map((opt) => (
                  <View key={opt.id}>
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        selectedOption === opt.id && styles.optionButtonActive,
                      ]}
                      onPress={() => handleOptionSelect(opt.id)}
                    >
                      <Text>{`${meal.time} - ${opt.title}`}</Text>
                    </TouchableOpacity>

                    {selectedOption === opt.id && (
                      <View style={styles.detailCard}>
                        <Text style={styles.detailTitle}>{opt.meal}</Text>
                        <Text style={styles.detailText}>⏱ Tempo de preparo: {opt.timePrep}</Text>
                        <Text style={styles.subTitle}>🍽 Ingredientes:</Text>
                        {opt.ingredients.map((ing, i) => (
                          <Text key={i} style={styles.detailText}>• {ing}</Text>
                        ))}
                        <Text style={styles.subTitle}>👨‍🍳 Modo de preparo:</Text>
                        <Text style={styles.detailText}>{opt.mode}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            </ScrollView> 
        ))}
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
    scroll: { padding: 20 },
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
    mealButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    mealButtonActive: {
        backgroundColor: "#FFB84D",
    },
    mealTitle: { 
        fontWeight: "bold",
        color: "#333", 
    },
    optionsContainer: { marginTop: 10 },
    optionButton: {
        backgroundColor: "#EEE",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 8,
        marginVertical: 5,
    },
    optionButtonActive: {
        backgroundColor: "#D6F5D6",
    },
    optionText: { fontSize: 14 },
    detailCard: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    detailTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
    detailText: { fontSize: 14, marginBottom: 4 },
    subTitle: { marginTop: 8, fontWeight: "bold", color: "#444" },
});
