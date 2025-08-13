<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <div class="items-center">
      <h1 class="text-2xl font-bold mb-8">Hello, I am {{mode}} dummy page provided by enthusiast mock</h1>
      <div class="bg-white px-4 py-2 rounded">
        <pre>
          {{params}}
        </pre>
      </div>
      <button
          class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          @click="confirm"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useGateway } from "@/compositions/useApi.ts";

const route = useRoute()

const mode = ref(route.params.mode);
const params = ref(route.query);

const confirm = async () => {
  try {
    await useGateway.post('/complete', params.value);
  } catch (error) {
    alert('Confirmed')
  }
}
</script>
