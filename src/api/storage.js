import { Platform } from "react-native";

// 🔹 Storage universal: localStorage no web, AsyncStorage no mobile
const Storage = Platform.select({
  web: {
    getItem: async (key) => {
      const item = localStorage.getItem(key);
      return item ? item : null;
    },
    setItem: async (key, value) => {
      localStorage.setItem(key, value);
    },
    removeItem: async (key) => {
      localStorage.removeItem(key);
    },
  },
  default: require("@react-native-async-storage/async-storage").default, // android / ios
});

export default Storage;

// 🔹 Keys
export const KEYS = {
  ANTHROPOMETRY: "@anthropometry_data",
  QUEUE: "@syncQueue",
};

// 🔹 Funções para avaliação física
export const saveAnthropometry = async (data) => {
  try {
    await Storage.setItem(KEYS.ANTHROPOMETRY, JSON.stringify(data));
    console.log("Dados da avaliação salvos localmente.");
  } catch (err) {
    console.error("Erro ao salvar avaliação local:", err);
  }
};

export const loadAnthropometry = async () => {
  try {
    const json = await Storage.getItem(KEYS.ANTHROPOMETRY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error("Erro ao carregar avaliação local:", err);
    return null;
  }
};

export const removeAnthropometry = async () => {
  try {
    await Storage.removeItem(KEYS.ANTHROPOMETRY);
  } catch (err) {
    console.error("Erro ao remover avaliação local:", err);
  }
};

// 🔹 Funções para fila de sincronização
export const addToQueue = async (item) => {
  try {
    const queueJson = await Storage.getItem(KEYS.QUEUE);
    const queue = queueJson ? JSON.parse(queueJson) : [];
    queue.push(item);
    await Storage.setItem(KEYS.QUEUE, JSON.stringify(queue));
  } catch (err) {
    console.error("Erro ao adicionar à fila:", err);
  }
};

export const loadQueue = async () => {
  try {
    const queueJson = await Storage.getItem(KEYS.QUEUE);
    return queueJson ? JSON.parse(queueJson) : [];
  } catch (err) {
    console.error("Erro ao carregar fila:", err);
    return [];
  }
};

export const clearQueue = async () => {
  try {
    await Storage.removeItem(KEYS.QUEUE);
  } catch (err) {
    console.error("Erro ao limpar fila:", err);
  }
};
