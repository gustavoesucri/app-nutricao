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
    // Usando NetInfo para verificar se há conexão com a internet
    const state = await NetInfo.fetch();
    const isConnected = state.isConnected;

    if (!isConnected) return;

    const queueJson = await Storage.getItem(KEYS.QUEUE);
    const queue = queueJson ? JSON.parse(queueJson) : [];
    if (queue.length === 0) return;

    const failed = [];
    for (const item of queue) {
      try {
        await createAnthropometry(item); // usa função universal da API
      } catch (err) {
        if (err.response && err.response.status === 500) {
          // Exemplo de erro do servidor, pode ajustar conforme a necessidade
          console.error("Servidor fora do ar");
        } else {
          console.error("Falha ao enviar item:", err);
          console.error("json-server fora do ar");
        }
        failed.push(item);
      }
    }

    // Atualiza a fila com os itens falhados
    await Storage.setItem(KEYS.QUEUE, JSON.stringify(failed));

    if (failed.length === 0) {
      console.log("Fila sincronizada com sucesso!");
    } else {
      console.warn(`${failed.length} item(s) não foram sincronizados.`);
    }
  } catch (err) {
    console.error("Erro ao sincronizar fila:", err);
  }
};
