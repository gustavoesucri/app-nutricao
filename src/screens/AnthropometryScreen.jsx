import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setAnthropometry } from "../store/anthropometrySlice";
import Header from "../components/Header";
import OrangeButton from "../components/OrangeButton";
import { saveAnthropometryLocal, syncAnthropometryWithServer } from "../api/anthropometryApi";
import { loadAnthropometryLocal } from "../api/anthropometryApi";

const schema = z.object({
  neck: z.string().optional(),
  shoulders: z.string().optional(),
  chest: z.string().optional(),
  armRelaxed: z.string().optional(),
  armContracted: z.string().optional(),
  forearm: z.string().optional(),
  waist: z.string().optional(),
  hip: z.string().optional(),
  thigh: z.string().optional(),
  calf: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bmi: z.string().optional(),
});

export default function AnthropometryScreen({ navigation }) {
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // recalcula IMC quando peso ou altura mudam
  const height = watch("height");
  const weight = watch("weight");

  useEffect(() => {
    const h = parseFloat(height?.replace(",", "."));
    const w = parseFloat(weight?.replace(",", "."));
    if (h && w && h > 0) {
      const imc = (w / (h / 100) ** 2).toFixed(2);
      setValue("bmi", imc.toString());
    } else {
      setValue("bmi", "");
    }
  }, [height, weight]);

  useEffect(() => {
    (async () => {
      const saved = await loadAnthropometryLocal();
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => setValue(key, value));
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      await saveAnthropometryLocal(data);
      dispatch(setAnthropometry(data));

      const synced = await syncAnthropometryWithServer();
      if (synced) {
        console.log("Dados enviados para servidor com sucesso!");
      } else {
        console.log("Sem conexão. Dados mantidos localmente.");
      }
    } catch (err) {
      console.error("Erro ao salvar avaliação:", err);
    }
  };

  const sections = [
    {
      title: "Superior (tronco e braços)",
      fields: [
        { name: "neck", label: "Pescoço", unit: "cm" },
        { name: "shoulders", label: "Ombros", unit: "cm" },
        { name: "chest", label: "Peito/Tórax", unit: "cm" },
        { name: "armRelaxed", label: "Braço (relaxado)", unit: "cm" },
        { name: "armContracted", label: "Braço (contraído)", unit: "cm" },
        { name: "forearm", label: "Antebraço", unit: "cm" },
      ],
    },
    {
      title: "Tronco",
      fields: [
        { name: "waist", label: "Cintura", unit: "cm" },
        { name: "hip", label: "Quadril/Glúteos", unit: "cm" },
      ],
    },
    {
      title: "Inferior (pernas)",
      fields: [
        { name: "thigh", label: "Coxa", unit: "cm" },
        { name: "calf", label: "Panturrilha", unit: "cm" },
      ],
    },
    {
      title: "Geral / Outros",
      fields: [
        { name: "height", label: "Altura", unit: "cm" },
        { name: "weight", label: "Peso", unit: "kg" },
        { name: "bmi", label: "IMC calculado", unit: "" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Avaliação Física" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          {sections.map((section) => (
            <View key={section.title}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.fields.map(({ name, label, unit }) => (
                <View key={name} style={styles.fieldRow}>
                  <Text style={styles.label}>{label}</Text>
                  <View style={styles.inputGroup}>
                    <Controller
                      control={control}
                      name={name}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.inputSmall}
                          keyboardType="numeric"
                          editable={name !== "bmi"} // IMC só leitura
                          value={value}
                          onChangeText={(text) => {
                            // permite apenas números e vírgula/ponto
                            let formatted = text.replace(/[^0-9.,]/g, "");

                            // substitui ponto por vírgula
                            formatted = formatted.replace(",", ".");

                            // impede mais de uma vírgula
                            const parts = formatted.split(".");
                            if (parts.length > 2) formatted = parts[0] + "." + parts[1];

                            // limita 3 antes e 2 depois da vírgula
                            formatted = formatted.replace(/^(\d{0,3})(\.\d{0,2})?.*$/, "$1$2");

                            onChange(formatted);
                          }}
                        />
                      )}
                    />
                    <Text style={styles.unit}>{unit}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
          <OrangeButton title="Salvar Avaliação" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange"
  },

  scroll: {
    padding: 20
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8
  },

  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },

  label: {
    paddingLeft: 20,
    fontSize: 14,
    color: "#333",
    flex: 1
  },

  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 100
  },

  inputSmall: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    textAlign: "center",
    backgroundColor: "#fff"
  },

  unit: {
    width: 24,
    textAlign: "left",
    fontSize: 14,
    color: "#333",
    marginLeft: 5
  },
});

