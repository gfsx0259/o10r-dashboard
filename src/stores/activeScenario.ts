import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useGateway} from "@/compositions/useApi.ts";
import type {ActiveScenarioStore, ActiveScenario} from "@/types/activeScenario.ts";

export const useActiveScenarioStore = defineStore('ActiveScenario', () => {
  const data = ref<ActiveScenarioStore>({ isInitialized: false })

  const fetchMode = async () => {
    try {
      data.value.activeScenario = (await useGateway.getActiveScenario()).data;
    } catch {
      data.value.activeScenario = undefined;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistMode = async (scenario: ActiveScenario) => {
    await useGateway.setActiveScenario(scenario);

    data.value.activeScenario = scenario;
  }

  return { data, fetchMode, persistMode }
})
