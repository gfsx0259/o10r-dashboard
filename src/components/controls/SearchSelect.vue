<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
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

    <div v-if="Array.isArray(modelValue) ? modelValue.length : modelValue" class="flex items-center gap-2 text-sm">
      <template v-if="Array.isArray(modelValue)">
        <span v-for="option of modelValue" class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
          {{ option.title }}
        </span>
      </template>
      <span v-else class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700">
        {{ modelValue.title }}
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
  label: string,
  options: Option[];
  modelValue: Option | Option[] | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | Option[] | null): void;
}>();

const query = ref('');
const focused = ref<boolean>(false);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  const alreadySelected: string[] = [];

  if (Array.isArray(props.modelValue)) {
    props.modelValue.forEach(o => alreadySelected.push(o.value));
  } else if (props.modelValue) {
    alreadySelected.push(props.modelValue.value);
  }

  const filteredOptions = props.options.filter(option => !alreadySelected.includes(option.value));

  if (!q) return filteredOptions.slice(0, 8);

  return filteredOptions.filter(option => option.title.toLowerCase().includes(q));
});

function select(option: Option) {
  if (Array.isArray(props.modelValue)) {
    const alreadySelected: string[] = props.modelValue.map(o => o.value);

    if (!alreadySelected.includes(option.value)) {
      emit('update:modelValue', [...props.modelValue, option]);
    }
  } else {
    emit('update:modelValue', option);
  }
}

function clear() {
  if (Array.isArray(props.modelValue)) {
    emit('update:modelValue', []);
  } else {
    emit('update:modelValue', null);
  }

  query.value = '';
}

function hide() {
  setTimeout(() => focused.value = false, 200);
}
</script>
