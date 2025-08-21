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

const route = useRoute()

const mode = ref(route.params.mode);
const params = ref(route.query);

const confirm = async () => {
  try {
    debugger;
    if (mode.value === 'acs') {
      await submitForm(route.query.term_url, {
        'MD': route.query.md,
        'PaRes': 'pares for' + route.query.pa_req
      });
    } else {
      await submitForm(route.query.termination_url, route.query);
    }
  } catch (error) {
    alert('Something went wrong, you should not see this alert')
  }
}

const submitForm = (termUrl: string, payload: Record<string, string>) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = termUrl;
  form.target = '_self';

  Object.entries(payload).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

</script>

<style>
pre {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>