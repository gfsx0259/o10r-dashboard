import { createRouter, createWebHistory } from 'vue-router'
import MethodsPage from "@/views/MethodsPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import {useMethodStore} from "@/stores/method.ts";
import {useSchemaStore} from "@/stores/schema.ts";
import CatalogSchemasPage from "@/views/CatalogSchemasPage.vue";
import CatalogMethodsPage from "@/views/CatalogMethodsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/methods',
    },
    {
      path: '/methods',
      component: MethodsPage,
      beforeEnter: async () => {
        const methodStore = useMethodStore();
        if (!methodStore.data.isInitialized) {
          await methodStore.fetchMethod();
        }
      },
    },
    {
      path: '/profile',
      component: ProfilePage,
    },
    {
      path: '/settings',
      component: SettingsPage,
    },
    {
      path: '/catalog/methods',
      component: CatalogMethodsPage,
      beforeEnter: async () => {
        const methodStore = useMethodStore();
        if (!methodStore.data.isInitialized) {
          await methodStore.fetchMethod();
        }
      },
    },
    {
      path: '/catalog/schemas',
      component: CatalogSchemasPage,
      beforeEnter: async () => {
        const schemaStore = useSchemaStore();
        if (!schemaStore.data.isInitialized) {
          await schemaStore.fetchSchema();
        }

        const methodStore = useMethodStore();
        if (!methodStore.data.isInitialized) {
          await methodStore.fetchMethod();
        }
      },
    },
  ],
})

export default router
