import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { setAnthropometry } from "../store/anthropometrySlice";
import Header from "../components/Header";
import OrangeButton from "../components/OrangeButton"; // Importando o novo componente

// Validação com Zod
const anthropometrySchema = z.object({
  weight: z.string().min(1, "Peso obrigatório"),
  height: z.string().min(1, "Altura obrigatória"),
  waist: z.string().optional(),
  biceps: z.string().optional(),
  hip: z.string().optional(),
});

export default function AnthropometryScreen({ navigation }) {
  const dispatch = useDispatch();
  const storedData = useSelector((state) => state.anthropometry);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(anthropometrySchema),
    defaultValues: storedData,
  });

  const onSubmit = (data) => {
    dispatch(setAnthropometry(data));
    Alert.alert("Salvo!", "Dados da avaliação física salvos com sucesso.");
  };

  return (
    <View style={styles.container}>
      <Header title="Avaliação Física" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>📏 Medidas Corporais</Text>

          {["weight", "height", "waist", "biceps", "hip"].map((field) => (
            <View key={field} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
              <Controller
                control={control}
                name={field}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={`Enter ${field}`}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors[field] && <Text style={styles.error}>{errors[field]?.message}</Text>}
            </View>
          ))}

          {/* Usando o OrangeButton customizado */}
          <OrangeButton title="Salvar Avaliação" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange", // fundo da tela
  },
  scrollContent: {
    padding: 20,
  },
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fieldContainer: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 4, color: "#333" },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  error: { color: "red", marginTop: 4 },
});
