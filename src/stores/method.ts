import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useCatalog} from "@/compositions/useApi.ts";
import type { MethodStore} from "@/types/method.ts";

export const useMethodStore = defineStore('method', () => {
  const data = ref<MethodStore>({ isInitialized: false, methods: [] })

  const fetchMethod = async () => {
    try {
      data.value.methods = (await useCatalog.getMethods()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  return { data, fetchMethod }
})
