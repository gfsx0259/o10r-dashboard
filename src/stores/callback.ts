import {ref} from 'vue'
import { defineStore } from 'pinia'
import {useGateway} from "@/compositions/useApi.ts";
import type {Callback, CallbackStore} from "@/types/callback.ts";

export const useCallbackStore = defineStore('callback', () => {
  const data = ref<CallbackStore>({ isInitialized: false, callbacks: [] })

  const fetchCallback = async () => {
    try {
      data.value.callbacks = (await useGateway.getCallback()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistCallback = async (callback: Callback) => {
    if (callback.id) {
        await useGateway.updateCallback(callback);
        const index = data.value.callbacks.findIndex(s => s.id === callback.id);
        if (index !== -1) {
            data.value.callbacks[index] = callback;
        }
    } else {
        const savedCallback = (await useGateway.createCallback(callback)).data;
        data.value.callbacks.push(savedCallback);
    }
  }

  const deleteCallback = async (id: number) => {
      await useGateway.deleteCallback(id);
      data.value.callbacks = data.value.callbacks.filter((callback: Callback) => callback.id !== id);
  }

  return { data, fetchCallback, persistCallback, deleteCallback }
})
