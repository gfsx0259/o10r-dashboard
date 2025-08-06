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
    if (schema.id) {
      await useCatalog.updateSchema(schema);
      const index = data.value.schemas.findIndex(s => s.id === schema.id);
      if (index !== -1) {
        data.value.schemas[index] = schema;
      }
    } else {
      const savedSchema = (await useCatalog.createSchema(schema)).data;
      data.value.schemas.push(savedSchema);
    }
  }

  const deleteSchema = async (id: number) => {
    await useCatalog.deleteSchema(id);
    data.value.schemas = data.value.schemas.filter((schema: Schema) => schema.id !== id);
  }

  return { data, fetchSchema, persistSchema, deleteSchema }
})
