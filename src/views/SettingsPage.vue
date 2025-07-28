<template>
  <div class="max-w-3xl mx-auto p-6 space-y-8">
    <h1 class="text-2xl font-bold text-gray-800">Settings</h1>
    <div class="mx-auto bg-white p-4 rounded shadow">
      <v-form>
        <vjsf v-if="schema"  :key="formKey" v-model="model" :schema="schema"/>
      </v-form>
    </div>
    <button
        @click="saveSettings"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import Vjsf from '@koumoul/vjsf'
import { VForm } from 'vuetify/components'
import {onMounted, ref, watch} from "vue";
import type {Setting} from "@/types/project.ts";

import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore();

const schema = ref({});
const model = ref({});
const formKey = ref(0);

onMounted(async () => {
  const response = await fetch('/settings.schema.json');
  schema.value = await response.json();
  model.value = fromFlat(projectStore.current?.settings || [])
})

watch(
    () => projectStore?.current?.settings,
    (settings) => {
      if (!settings) {
        return;
      }
      model.value = fromFlat(<Setting[]>settings);
      formKey.value++;
    },
    {immediate: true}
)

const saveSettings = async () => {
    await projectStore.updateSettings(toFlat(model.value));
}

function fromFlat(flat: { code: string; group: string; value: any }[]): Record<string, Record<string, any>> {
  const result: Record<string, Record<string, any>> = {};

  for (const { code, group, value } of flat) {
    if (!result[group]) {
      result[group] = {};
    }
    result[group][code] = value;
  }

  return result;
}

function toFlat(groups: object): Setting[] {
  return Object.entries(groups).flatMap(([group, fields]) =>
      Object.entries(fields).map(([code, value]) => ({
        code,
        group,
        value,
      }))
  );
}
</script>

<style scoped>
:deep(.text-h3) {
  margin-bottom: 20px;
}
:deep(.v-input__details) {
  display: none !important;
}
:deep(.v-input) {
  background-color: #fff !important;
  padding: 0 !important;
  box-shadow: none;
  border-radius: 6px !important;
  min-height: unset !important;
}
:deep(.v-input__control) {
  margin: 0 !important;
}
:deep(.vjsf-field-wrapper) {
  margin-bottom: 0 !important;
}
:deep(.v-field) {
  min-height: 32px !important;
  padding: 12px 0 !important;
}
:deep(.v-field__field),
:deep(.v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 14px !important;
  line-height: 1.2 !important;
  min-height: unset !important;
}
:deep(.v-label) {
  font-size: 13px;
}
</style>
