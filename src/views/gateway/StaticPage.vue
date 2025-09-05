<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Static</h1>
      <div class="flex space-x-2">
        <button
            class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
            @click="goBack"
        >
          Back to routes
        </button>
        <button
            class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
            @click="() => open({ order: 0, body: ''})"
        >
          Create
        </button>
      </div>
    </div>
    <div class="space-y-4">
      <div
          v-for="staticRoute in filteredStaticRoutes"
          :key="staticRoute.id"
          class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center mb-3">
          <div class="flex space-x-2">
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => open(staticRoute)"
            >
              Edit
            </button>
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => remove(staticRoute)"
            >
              Delete
            </button>
          </div>
        </div>
        <div class="mb-3"><b>Path:</b> {{ staticRoute.path }}</div>
        <div class="bg-gray-100 rounded p-3 text-sm font-mono overflow-x-auto" v-html="highlight(staticRoute.body, languages.json, 'json')"></div>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl space-y-4">
          <h2 class="text-xl font-bold">
            {{ modalMode === 'create' ? 'Add Static Route' : 'Edit Static Route' }}
          </h2>
          <label class="block">
            <span class="text-sm font-medium">Path</span>
            <input
                class="w-full p-2 border rounded font-mono text-sm mt-1"
                type="text"
                name="path"
                v-model="currentStaticRoute.path"
            >
          </label>
          <label class="block">
            <span class="text-sm font-medium">Body</span>
            <JsonEditorControl
                v-model="currentStaticRoute.body"
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
import { useRouter, useRoute } from 'vue-router'
import {useCallbackStore} from "@/stores/callback.ts";
import type {Callback} from "@/types/callback.ts";
import {useStaticStore} from "@/stores/static.ts";
import type {StaticRoute} from "@/types/static.ts";

const route = useRoute()
const router = useRouter()
const goBack = () => router.back()

const isModalOpen = ref(false)
const modalMode: Ref<"create" | "edit"> = ref ("create")

const filteredStaticRoutes = computed(() =>
    useStaticStore().data.routes.filter((r: StaticRoute) => <number>(r.scenario_id as unknown) === parseInt(<string>route.params.scenarioId))
)

const currentStaticRoute = ref();

function open(r: StaticRoute) {
  if (r.id) {
    modalMode.value = "edit"
    currentStaticRoute.value = { ...r }
  } else {
    modalMode.value = "create"
    currentStaticRoute.value = {
      path: '',
      body: '',
      scenario_id: parseInt(<string>route.params.scenarioId),
    }
  }
  isModalOpen.value = true
}

function remove(r: StaticRoute) {
  if (confirm('Are you sure?')) {
    useStaticStore().deleteStatic(<number>r.id);
  }
}

async function close() {
  await useStaticStore().persistStatic(currentStaticRoute.value)
  isModalOpen.value = false;
}
</script>
