import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = axios.create({ baseURL: "http://10.0.2.2:3001" });
const STORAGE_KEY = "@anthropometry_data";

// 🔹 LOCAL STORAGE
export async function saveAnthropometryLocal(data) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function loadAnthropometryLocal() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : null;
}

// 🔹 API SERVER (json-server)
export async function getAnthropometries() {
  const res = await API.get("/anthropometries");
  return res.data;
}

export async function createAnthropometry(data) {
  const res = await API.post("/anthropometries", data);
  return res.data;
}

export async function updateAnthropometry(id, data) {
  const res = await API.put(`/anthropometries/${id}`, data);
  return res.data;
}

export async function deleteAnthropometry(id) {
  const res = await API.delete(`/anthropometries/${id}`);
  return res.data;
}

// 🔹 SYNC LOCAL ↔ SERVER
export async function syncAnthropometryWithServer() {
  const local = await loadAnthropometryLocal();
  if (!local) return null;

  try {
    const synced = await createAnthropometry(local);
    return synced;
  } catch {
    console.warn("Falha ao sincronizar com servidor");
    return null;
  }
}
