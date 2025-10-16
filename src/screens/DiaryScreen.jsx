import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setHumor,
  setDificuldade,
  setDesejo,
  setImagem,
} from "../store/diarySlice";
import MoodButton from "../components/MoodButton";
import OrangeButton from "../components/OrangeButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";


// ✅ Schema de validação
const diarySchema = z.object({
  humor: z.enum(["Ruim", "Bom", "Excelente"], {
    required_error: "Selecione o humor na refeição",
  }),
  dificuldade: z.boolean({
    required_error: "Informe se teve dificuldade na refeição",
  }),
  Dificuldade: z
    .string()
    .min(3, "Descreva brevemente sua dificuldade")
    .optional(),
  desejo: z.boolean({
    required_error: "Informe se teve desejo por alimentos específicos",
  }),
  imagem: z.string().optional(),
});

export default function DiaryScreen({ navigation }) {
  const dispatch = useDispatch();
  const { humor, dificuldade, desejo, imagem } = useSelector((state) => state.diario);
  // const storedData = useSelector((state) => state.anthropometry);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(diarySchema),
    defaultValues: {
      humor,
      dificuldade,
      desejo,
      Dificuldade: "",
      imagem,
    },
  });

  const handleImageUpload = async () => {
  if (Platform.OS === "web") {
    // Web: usar input HTML
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const uri = URL.createObjectURL(file);
        dispatch(setImagem(uri));
      }
    };
    input.click();
  } else {
    // Mobile: usar expo-image-picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setImagem(result.assets[0].uri));
    }
  }
};

  const onSubmit = (data) => {
    console.log("Dados validados:", data);
    Alert.alert("Diário salvo com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Header title="Diário de Nutrição" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Preencha o seu Diário de Nutrição</Text>

          {/* Humor */}
          <Text style={styles.label}>Humor na refeição</Text>
          <View style={styles.row}>
            <MoodButton label="Ruim" active={humor === "Ruim"} onPress={() => dispatch(setHumor("Ruim"))} color="#F08080" />
            <MoodButton label="Bom" active={humor === "Bom"} onPress={() => dispatch(setHumor("Bom"))} color="#FFD700" />
            <MoodButton label="Excelente" active={humor === "Excelente"} onPress={() => dispatch(setHumor("Excelente"))} color="#4ADE80" />
          </View>
          {errors.humor && <Text style={styles.error}>{errors.humor.message}</Text>}

          {/* Dificuldade */}
          <Text style={styles.label}>Teve dificuldade em alguma refeição?</Text>
          <View style={styles.row}>
            <MoodButton label="Sim" active={dificuldade === true} onPress={() => dispatch(setDificuldade(true))} />
            <MoodButton label="Não" active={dificuldade === false} onPress={() => dispatch(setDificuldade(false))} color="#F08080" />
          </View>
          {errors.dificuldade && <Text style={styles.error}>{errors.dificuldade.message}</Text>}

          {/* Campo texto */}
          { dificuldade === true && (
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
                    placeholder="Descreva a dificuldade (opcional)"
                  />
                )}
              />
              {errors.Dificuldade && <Text style={styles.error}>{errors.Dificuldade.message}</Text>}
            </View>
          )}
          {/* Desejo */}
          <Text style={styles.label}>Desejo por alimentos específicos?</Text>
          <View style={styles.row}>
            <MoodButton label="Sim" active={desejo === true} onPress={() => dispatch(setDesejo(true))} />
            <MoodButton label="Não" active={desejo === false} onPress={() => dispatch(setDesejo(false))} color="#F08080" />
          </View>
          {errors.desejo && <Text style={styles.error}>{errors.desejo.message}</Text>}

          {/* Campo texto */}
          {desejo === true && (  
            <View style={styles.fieldContainer}>
              <Controller
                control={control}
                name="Desejo"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Quais alimentos teve desejo?"
                  />
                )}
              />
              {errors.Dificuldade && <Text style={styles.error}>{errors.Dificuldade.message}</Text>}
            </View>
          )}
          {/* Imagem */}
          {imagem && <Image source={{ uri: imagem }} style={styles.image} />}
          <TouchableOpacity style={styles.uploadBtn} onPress={handleImageUpload}>
            <Text style={styles.label}>Upload de imagem da refeição</Text>
          </TouchableOpacity>

          {/* Botão Salvar */}
          <OrangeButton title="Salvar Diário" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
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
    backgroundColor: "orange",
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

DiaryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
