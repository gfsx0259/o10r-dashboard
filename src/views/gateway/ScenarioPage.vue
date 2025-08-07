<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Scenarios</h1>
      <div class="flex space-x-2">
        <button
            class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
            @click="goBack"
        >
          Back to routes
        </button>
        <button
            class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
            @click="() => open({ title: '', conditions: ''})"
        >
          Create
        </button>
      </div>
    </div>
    <div class="space-y-4">
      <div
          v-for="scenario in filteredScenarios"
          :key="scenario.id"
          class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-lg">
            {{ scenario.title }}
          </h2>
          <div class="flex space-x-2">
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => open(scenario)"
            >
              Edit
            </button>
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => remove(scenario)"
            >
              Delete
            </button>

            <RouterLink :to="{ path: `/gateway/routes/${parseInt(<string>route.params.routeId)}/scenario/${scenario.id}`}">
              <button
                  class="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-3 py-1.5 rounded text-sm"
              >
                Callbacks
              </button>
            </RouterLink>
          </div>
        </div>
        <div class="bg-gray-100 rounded p-3 text-sm font-mono overflow-x-auto" v-html="highlight(scenario.conditions, languages.json, 'json')"></div>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl space-y-4">
          <h2 class="text-xl font-bold">
            {{ modalMode === 'create' ? 'Add Scenario' : 'Edit Scenario' }}
          </h2>
          <label class="block">
            <span class="text-sm font-medium">Title</span>
            <input
                v-model="currentScenario.title"
                class="w-full p-2 border rounded font-mono text-sm mt-1"
            />
          </label>
          <label class="block">
            <span class="text-sm font-medium">Conditions</span>
            <JsonEditorControl
                v-model="currentScenario.conditions"
                class="w-full p-2 border rounded font-mono text-sm mt-1"
            />
          </label>
          <div class="flex justify-end space-x-2 pt-2">
            <button
                class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                @click="() => isModalOpen = false"
            >
              Cancel
            </button>
            <button
                class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                @click="close"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {computed, type Ref, ref} from "vue";
import JsonEditorControl from "@/components/controls/JsonEditorControl.vue";
import {highlight, languages} from "prismjs";
import {useScenarioStore} from "@/stores/scenario.ts";
import type {Scenario} from "@/types/scenario.ts";
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const goBack = () => router.back()

const isModalOpen = ref(false)
const modalMode: Ref<"create" | "edit"> = ref ("create")

const filteredScenarios = computed(() =>
    useScenarioStore().data.scenarios.filter((scenario: Scenario) => <number>(scenario.route_id as unknown) === parseInt(<string>route.params.routeId))
)

const currentScenario = ref();

function open(scenario: Scenario) {
  if (scenario.id) {
    modalMode.value = "edit"
    currentScenario.value = { ...scenario }
  } else {
    modalMode.value = "create"
    currentScenario.value = {
      title: '',
      conditions: '',
      route_id: parseInt(<string>route.params.routeId),
    }
  }
  isModalOpen.value = true
}

function remove(scenario: Scenario) {
  if (confirm('Are you sure?')) {
    useScenarioStore().deleteScenario(<number>scenario.id);
  }
}

async function close() {
  await useScenarioStore().persistScenario(currentScenario.value)
  isModalOpen.value = false;
}
</script>
