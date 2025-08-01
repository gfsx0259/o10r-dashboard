<template>
  <PrismEditor
      v-model="code"
      class="code-editor"
      :highlight="highlighter"
      lineNumbers
  />
</template>

<script setup lang="ts">
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";
import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs";
import 'prismjs/components/prism-json'
import { computed } from "vue";

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const code = computed({
  get: () => props.modelValue ?? '{}',
  set: (value: string) => {
    try {
      emit('update:modelValue', value)
    } catch {}
  }
})

function highlighter(code: string) {
  return highlight(code, languages.json, 'json')
}
</script>

<style>
.code-editor {
  color: black;
  font-size: 0.875rem;
  padding: 10px 0;
  border-radius: 4px;
  min-height: 200px;
}

.code-editor textarea {
  outline: none;
  caret-color: #808080;
}

.code-editor .prism-editor__line-numbers {
  font-weight: 400;
}
</style>