import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useGateway} from "@/compositions/useApi.ts";
import type {MockModeStore, MockMode} from "@/types/mockMode.ts";

export const useMockModeStore = defineStore('mockMode', () => {
  const data = ref<MockModeStore>({ isInitialized: false })

  const fetchMode = async () => {
    try {
      data.value.mode = (await useGateway.getMockMode()).data;
    } catch {
      data.value.mode = undefined;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistMode = async (mode: MockMode) => {
    await useGateway.setMockMode(mode);

    data.value.mode = mode;
  }

  return { data, fetchMode, persistMode }
})
