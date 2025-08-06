import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useCatalog} from "@/compositions/useApi.ts";
import type {Method, MethodStore} from "@/types/method.ts";

export const useMethodStore = defineStore('method', () => {
  const data = ref<MethodStore>({ isInitialized: false, methods: [] })

  const fetchMethod = async () => {
    try {
      data.value.methods = (await useCatalog.getMethods()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

    const persistMethod = async (method: Method) => {
        if (method.id) {
            await useCatalog.updateMethod(method);
            const index = data.value.methods.findIndex(s => s.id === method.id);
            if (index !== -1) {
                data.value.methods[index] = method;
            }
        } else {
            const savedMethod = (await useCatalog.createMethod(method)).data;
            data.value.methods.push(savedMethod);
        }
    }

    const deleteMethod = async (id: number) => {
        await useCatalog.deleteMethod(id);
        data.value.methods = data.value.methods.filter((method: Method) => method.id !== id);
    }

  return { data, fetchMethod, persistMethod, deleteMethod }
})
