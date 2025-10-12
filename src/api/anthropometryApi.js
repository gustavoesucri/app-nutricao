import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Para Android Emulator use 10.0.2.2
// Para celular real no Expo, troque por seu IP local
const API = axios.create({ baseURL: "http://10.0.2.2:3001" });
const STORAGE_KEY = "@anthropometry_data";

export async function saveAnthropometryLocal(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log("Dados salvos localmente.");
  } catch (err) {
    console.error("Erro ao salvar local:", err);
  }
}

export async function loadAnthropometryLocal() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error("Erro ao carregar local:", err);
    return null;
  }
}

export async function syncAnthropometryWithServer() {
  try {
    const local = await loadAnthropometryLocal();
    if (!local) return null;

    const res = await API.post("/anthropometries", local);
    console.log("Sincronizado com servidor:", res.data);
    return res.data;
  } catch (err) {
    console.warn("Falha ao sincronizar com servidor:", err.message);
    return null;
  }
}

export async function fetchAnthropometryFromServer(userId = 1) {
  try {
    const res = await API.get("/anthropometries", { params: { userId } });
    return res.data;
  } catch (err) {
    console.error("Erro ao buscar do servidor:", err);
    return [];
  }
}
