import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useGateway} from "@/compositions/useApi.ts";
import type {Scenario, ScenarioStore} from "@/types/scenario.ts";

export const useScenarioStore = defineStore('scenario', () => {
  const data = ref<ScenarioStore>({ isInitialized: false, scenarios: [] })

  const fetchScenario = async () => {
    try {
      data.value.scenarios = (await useGateway.getScenario()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistScenario = async (scenario: Scenario) => {
    if (scenario.id) {
        await useGateway.updateScenario(scenario);
        const index = data.value.scenarios.findIndex(s => s.id === scenario.id);
        if (index !== -1) {
            data.value.scenarios[index] = scenario;
        }
    } else {
        const savedScenario = (await useGateway.createScenario(scenario)).data;
        data.value.scenarios.push(savedScenario);
    }
  }

  const deleteScenario = async (id: number) => {
      await useGateway.deleteScenario(id);
      data.value.scenarios = data.value.scenarios.filter((scenario: Scenario) => scenario.id !== id);
  }

  return { data, fetchScenario, persistScenario, deleteScenario }
})
