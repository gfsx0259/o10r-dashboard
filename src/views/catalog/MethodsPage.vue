<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Methods</h1>
      <button
          class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          @click="() => open({ code: '', title: '', description: ''})"
      >
        Create
      </button>
    </div>
    <div class="space-y-4">
      <div
          v-for="method in useMethodStore().data.methods"
          :key="method.id"
          class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-lg">
            {{ method.title }}
          </h2>
          <div class="flex space-x-2">
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => open(method)"
            >
              Edit
            </button>
            <button
                class="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded text-sm"
                @click="() => remove(method)"
            >
              Delete
            </button>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-500">{{ method.code }}</p>
          <p class="text-sm text-gray-500">{{ method.description }}</p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl space-y-4">
          <h2 class="text-xl font-bold">
            {{ modalMode === 'create' ? 'Add Method' : 'Edit Method' }}
          </h2>
          <label class="block">
            <span class="text-sm font-medium">Code</span>
            <input
                v-model="currentMethod.code"
                class="w-full p-2 border rounded font-mono text-sm mt-1"
            />
          </label>
          <label class="block">
            <span class="text-sm font-medium">Title</span>
            <input
                v-model="currentMethod.title"
                class="w-full p-2 border rounded font-mono text-sm mt-1"
            />
          </label>
          <label class="block">
            <span class="text-sm font-medium">Description</span>
            <input
                v-model="currentMethod.description"
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
import { useMethodStore } from '@/stores/method'
import {type Ref, ref} from "vue";
import type {Method} from "@/types/method.ts";

const isModalOpen = ref(false)
const modalMode: Ref<"create" | "edit"> = ref ("create")

const currentMethod = ref();

function open(method: Method) {
  if (method.id) {
    modalMode.value = "edit"
    currentMethod.value = { ...method }
  } else {
    modalMode.value = "create"
    currentMethod.value = {
      id: undefined,
      code: '',
      title: '',
      description: ''
    }
  }
  isModalOpen.value = true
}

function remove(method: Method) {
  if (confirm('Are you sure?')) {
    useMethodStore().deleteMethod(<number>method.id);
  }
}

async function close() {
  await useMethodStore().persistMethod(currentMethod.value)
  isModalOpen.value = false;
}
</script>
