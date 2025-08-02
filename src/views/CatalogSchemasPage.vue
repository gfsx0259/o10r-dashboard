<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Schemas</h1>
      <button
          class="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          @click="() => open({ fields: '' })"
      >
        Create
      </button>
    </div>
    <div class="space-y-4">
      <div
          v-for="schema in useSchemaStore().data.schemas"
          :key="schema.id"
          class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-lg">
            <span class="text-blue-600 font-bold">
              {{ useMethodStore().data.methods.find(m => m.id === schema.method_id)?.title }}
            </span>
          </h2>
          <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
              @click="() => open(schema)"
          >
            Edit
          </button>
        </div>
        <pre class="bg-gray-100 rounded p-3 text-sm font-mono overflow-x-auto">
<code class="json">{{ schema.fields }}</code></pre>
      </div>
    </div>
    <transition name="fade">
      <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl space-y-4">
          <h2 class="text-xl font-bold">
            {{ modalMode === 'create' ? 'Add Schema' : 'Edit Schema' }}
          </h2>

          <label class="block">
            <span class="text-sm font-medium">Method</span>
            <select
                v-model="currentMethodId"
                class="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
            >
              <option disabled :value="undefined">Select method</option>
              <option
                  v-for="method in useMethodStore().data.methods"
                  :key="method.id"
                  :value="method.id"
              >
                {{ method.title }}
              </option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-medium">Fields</span>
            <JsonEditorControl
                v-model="currentFields"
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
                @click="save"
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
import { useSchemaStore } from '@/stores/schema'
import { useMethodStore } from '@/stores/method'
import {type Ref, ref} from "vue";

import JsonEditorControl from "@/components/controls/JsonEditorControl.vue";
import type {Schema} from "@/types/schema.ts";

const isModalOpen = ref(false)
const modalMode: Ref<"create" | "edit"> = ref ("create")

const currentId: Ref<number | undefined> = ref();
const currentMethodId = ref<number | undefined>()
const currentFields = ref("")

function open(schema: Schema) {
  if (schema.id) {
    modalMode.value = "edit"

    currentId.value = schema.id;
    currentMethodId.value = <number>schema.method_id;
    currentFields.value = <string>schema.fields;
  } else {
    modalMode.value = "create"

    currentId.value = undefined;
    currentMethodId.value = undefined;
    currentFields.value = '';
  }

  isModalOpen.value = true
}

async function save() {
  await useSchemaStore().persistSchema({
    id: currentId.value,
    method_id: currentMethodId.value,
    fields: currentFields.value,
  })
  await useSchemaStore().fetchSchema();

  isModalOpen.value = false;
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>