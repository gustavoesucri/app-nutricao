import Storage, { KEYS } from "./storage";
import { createAnthropometry } from "./anthropometryApi";
import NetInfo from "@react-native-community/netinfo";

// 🔹 Adiciona item à fila
export const addToQueue = async (item) => {
  try {
    const queueJson = await Storage.getItem(KEYS.QUEUE);
    const queue = queueJson ? JSON.parse(queueJson) : [];
    queue.push(item);
    await Storage.setItem(KEYS.QUEUE, JSON.stringify(queue));
    trySync();
  } catch (err) {
    console.error("Erro ao adicionar à fila:", err);
  }
};

// 🔹 Tenta sincronizar a fila se houver internet
export const trySync = async () => {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;

    const queueJson = await Storage.getItem(KEYS.QUEUE);
    const queue = queueJson ? JSON.parse(queueJson) : [];
    if (queue.length === 0) return;

    const failed = [];
    for (const item of queue) {
      try {
        await createAnthropometry(item); // usa função universal da API
      } catch (err) {
        console.error("Falha ao enviar item:", err);
        failed.push(item);
      }
    }
    await Storage.setItem(KEYS.QUEUE, JSON.stringify(failed));
    if (failed.length === 0) console.log("Fila sincronizada com sucesso!");
    else console.warn(`${failed.length} item(s) não foram sincronizados.`);
  } catch (err) {
    console.error("Erro ao sincronizar fila:", err);
  }
};

// 🔹 Carrega fila (opcional, para debug ou histórico)
export const loadQueue = async () => {
  try {
    const queueJson = await Storage.getItem(KEYS.QUEUE);
    return queueJson ? JSON.parse(queueJson) : [];
  } catch (err) {
    console.error("Erro ao carregar fila:", err);
    return [];
  }
};

// 🔹 Limpa a fila
export const clearQueue = async () => {
  try {
    await Storage.removeItem(KEYS.QUEUE);
  } catch (err) {
    console.error("Erro ao limpar fila:", err);
  }
};
