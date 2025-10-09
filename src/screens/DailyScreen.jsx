import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  setHumor,
  setDificuldade,
  setDesejo,
  setImagem,
} from "../store/dailySlice";
import MoodButton from "../components/MoodButton";
import OrangeButton from "../components/OrangeButton"; // Importando o novo componente
import Header from "../components/Header";
import { Alert } from "react-native";
import { ScrollView } from "react-native-web";

export default function DailyScreen() {
  const dispatch = useDispatch();
  const { humor, dificuldade, desejo, imagem } = useSelector((state) => state.diario);

  const { handleSubmit } = useForm();

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setImagem(result.assets[0].uri));
    }
  };

  const onSubmit = () => {
    Alert.alert("Diário salvo com sucesso!");
  };

  return (
    <View style={styles.container}>
        <Header title="Diário de Nutrição" navigation={navigation} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                <Text style={styles.title}>Preencha o seu Diário de Nutrição</Text>

                <Text style={styles.label}>Humor na refeição</Text>
                <View style={styles.row}>
                    <MoodButton label="Ruim" active={humor === "Ruim"} onPress={() => dispatch(setHumor("Ruim"))} color="#F08080"/>
                    <MoodButton label="Bom" active={humor === "Bom"} onPress={() => dispatch(setHumor("Bom"))} color="#FFD700"/>
                    <MoodButton label="Excelente" active={humor === "Excelente"} onPress={() => dispatch(setHumor("Excelente"))} color="#4ADE80" />
                </View>
            

                <Text style={styles.label}>Teve dificuldade em alguma refeição?</Text>
                <View style={styles.row}>
                    <MoodButton label="Sim" active={dificuldade === true} onPress={() => dispatch(setDificuldade(true))}/>
                    <MoodButton label="Não" active={dificuldade === false} onPress={() => dispatch(setDificuldade(false))} color="#F08080" />
                </View>

                <View style={styles.fieldContainer}>
                <Controller
                    control={control}
                    name="Dificuldade"
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={`Digite a sua dificuldade.`}
                    />
                    )}
                />
                </View>

                <Text style={styles.label}>Desejo por alimentos específicos?</Text>
                <View style={styles.row}>
                    <MoodButton label="Sim" active={desejo === true} onPress={() => dispatch(setDesejo(true))}/>
                    <MoodButton label="Não" active={desejo === false} onPress={() => dispatch(setDesejo(false))} color="#F08080" />
                </View>
            

                {imagem && (
                    <Image source={{ uri: imagem }} style={styles.image} />
                )}

                <TouchableOpacity style={styles.uploadBtn} onPress={handleImageUpload}>
                    <Text style={styles.label}>Upload de imagem da refeição</Text>
                </TouchableOpacity>

                <OrangeButton title="Salvar Diário" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
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