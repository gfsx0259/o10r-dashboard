<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Methods</h1>
    </div>
    <ul class="space-y-4" v-if="methods">
      <li v-for="method in methods" :key="method.id" class="flex justify-between items-center bg-white p-4 rounded shadow">
        <div>
          <p class="font-medium">{{ method.code }}</p>
          <p class="text-sm text-gray-500">{{ method.title }}</p>
          <p class="text-sm text-gray-500">{{ method.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMethodStore } from '@/stores/method'

const methods = useMethodStore().data.methods;
</script>
