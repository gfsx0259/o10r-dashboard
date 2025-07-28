<template>
  <div>
    <div class="max-w-3xl mx-auto p-6 space-y-8">
      <h1 class="text-2xl font-bold mb-4">Methods</h1>
      <ul class="space-y-4" v-if="methods">
        <li v-for="method in methods" :key="method.id" class="flex justify-between items-center bg-white p-4 rounded shadow">
          <div>
            <p class="font-medium">{{ method.code }}</p>
            <p class="text-sm text-gray-500">{{ method.title }}</p>
            <p class="text-sm text-gray-500">{{ method.description }}</p>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                :checked="useProjectStore().current?.methods.includes(method.id)"
                @change="toggleMethod(method.id)" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition"></div>
          </label>
        </li>
      </ul>

    <button
        @click="replaceMethods"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Save
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useMethodStore } from '@/stores/method'
import { useProjectStore } from '@/stores/project'

const methods = useMethodStore().data.methods;

function toggleMethod(id: number) {
  if (!useProjectStore().current) {
    return;
  }

  const index = useProjectStore().current?.methods.indexOf(id);
  if (index === -1) {
    useProjectStore().current?.methods.push(id)
  } else {
    useProjectStore().current?.methods.splice(index, 1)
  }
}

const replaceMethods = async () => {
  if (!useProjectStore().current) {
    return;
  }

  await useProjectStore().replaceMethods();
}
</script>
