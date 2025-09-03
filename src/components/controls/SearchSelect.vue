<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Scenario</label>
    <div class="relative">
      <input
          v-model="query"
          @focus="focused = true"
          @blur="hide"
          type="text"
          placeholder="Search..."
          class="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div
          v-if="focused && filtered.length"
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow"
      >
        <button
            v-for="option in filtered"
            :key="option.value"
            @click="select(option)"
            class="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-gray-50"
        >
          <div class="text-sm font-medium text-gray-900">{{ option.title }}</div>
        </button>
      </div>
    </div>

    <div v-if="modelValue" class="flex items-center gap-2 text-sm">
      <span class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
        Selected: {{ modelValue.title }}
      </span>
      <button type="button" @click="clear" class="text-gray-500 hover:text-gray-700">
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Option {
  title: string,
  value: string,
}

const props = defineProps<{
  options: Option[];
  modelValue: Option | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | null): void;
}>();

const query = ref('');
const focused = ref<boolean>(false);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();

  if (!q) return props.options.slice(0, 8);

  return props.options.filter(option => option.title.toLowerCase().includes(q));
});

function select(option: Option) {
  emit('update:modelValue', option);
  query.value = option.title;
}

function clear() {
  emit('update:modelValue', null);
  query.value = '';
}

function hide() {
  setTimeout(() => focused.value = false, 200);
}
</script>
