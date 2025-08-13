<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Routes</h1>
      <button
          class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          @click="() => open({ conditions: ''})"
      >
        Create
      </button>
    </div>
    <div class="space-y-4">
      <div
          v-for="route in useRouteStore().data.routes"
          :key="route.id"
          class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-lg">
            {{ useMethodStore().data.methods.find(m => m.id === route.method_id)?.title }}
          </h2>
          <div class="flex space-x-2">
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => open(route)"
            >
              Edit
            </button>
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => remove(route)"
            >
              Delete
            </button>

            <RouterLink :to="{ path: `/gateway/routes/${route.id}`}">
              <button
                  class="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-3 py-1.5 rounded text-sm"
              >
                Scenarios
              </button>
            </RouterLink>
          </div>
        </div>
        <div class="bg-gray-100 rounded p-3 text-sm font-mono overflow-x-auto" v-html="highlight(route.conditions, languages.json, 'json')"></div>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl space-y-4">
          <h2 class="text-xl font-bold">
            {{ modalMode === 'create' ? 'Add Route' : 'Edit Route' }}
          </h2>
          <label class="block">
            <span class="text-sm font-medium">Method</span>
            <select
                v-model="currentRoute.method_id"
                class="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
            >
              <option disabled :value="undefined">Select method</option>
              <option
                  v-for="method in useMethodStore().data.methods"
                  :key="method.id"
                  :value="method.id"
              >
                {{ method.title }} ({{ method.code }})
              </option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-medium">Conditions</span>
            <JsonEditorControl
                v-model="currentRoute.conditions"
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
import { useRouteStore } from '@/stores/route.ts'
import {type Ref, ref} from "vue";
import type {Route} from "@/types/route.ts";
import {useMethodStore} from "@/stores/method.ts";
import JsonEditorControl from "@/components/controls/JsonEditorControl.vue";
import {highlight, languages} from "prismjs";

const isModalOpen = ref(false)
const modalMode: Ref<"create" | "edit"> = ref ("create")

const currentRoute = ref();

function open(route: Route) {
  if (route.id) {
    modalMode.value = "edit"
    currentRoute.value = { ...route }
  } else {
    modalMode.value = "create"
    currentRoute.value = {
      id: undefined,
      method_id: null,
      conditions: '',
    }
  }
  isModalOpen.value = true
}

function remove(route: Route) {
  if (confirm('Are you sure?')) {
    useRouteStore().deleteRoute(<number>route.id);
  }
}

async function close() {
  await useRouteStore().persistRoute(currentRoute.value)
  isModalOpen.value = false;
}
</script>
