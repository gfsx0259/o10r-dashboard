import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useCatalog} from "@/compositions/useApi.ts";
import type {Schema, SchemaStore} from "@/types/schema.ts";

export const useSchemaStore = defineStore('schema', () => {
  const data = ref<SchemaStore>({ isInitialized: false, schemas: [] })

  const fetchSchema = async () => {
    try {
      data.value.schemas = (await useCatalog.getSchemas()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistSchema = async (schema: Schema) => {
    return schema.id
        ? await useCatalog.updateSchema(schema)
        : await useCatalog.createSchema(schema);
  }

  return { data, fetchSchema, persistSchema }
})
