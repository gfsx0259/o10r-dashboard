import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useMethod} from "@/compositions/useApi.ts";
import type {Method, MethodStore} from "@/types/method.ts";
import type {ApiResponse} from "@/types/api.ts";

export const useMethodStore = defineStore('method', () => {
  const data = ref<MethodStore>({ isInitialized: false, methods: [] })

  const fetchMethod = async () => {
    try {
      data.value.methods = (await useMethod.get<ApiResponse<Method[]>>()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  return { data, fetchMethod }
})
