import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { postAnthropometry } from "./api";

const QUEUE_KEY = "@syncQueue";

// Adiciona item à fila
export const addToQueue = async (item) => {
  const queue = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY)) || [];
  queue.push(item);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  trySync();
};

// Tenta sincronizar a fila se tiver internet
export const trySync = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) return;

  const queue = JSON.parse(await AsyncStorage.getItem(QUEUE_KEY)) || [];
  if (queue.length === 0) return;

  const failed = [];
  for (const item of queue) {
    try {
      await postAnthropometry(item);
    } catch (e) {
      failed.push(item);
    }
  }
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(failed));
};

// Carrega fila (opcional, para debug ou histórico)
export const loadQueue = async () => {
  return JSON.parse(await AsyncStorage.getItem(QUEUE_KEY)) || [];
};
