import { createRouter, createWebHistory } from 'vue-router'
import MethodsPage from "@/views/MethodsPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import {useMethodStore} from "@/stores/method.ts";
import {useSchemaStore} from "@/stores/schema.ts";
import CatalogSchemasPage from "@/views/catalog/SchemasPage.vue";
import CatalogMethodsPage from "@/views/catalog/MethodsPage.vue";
import RoutesPage from "@/views/gateway/RoutesPage.vue";
import {useRouteStore} from "@/stores/route.ts";
import {useScenarioStore} from "@/stores/scenario.ts";
import ScenarioPage from "@/views/gateway/ScenarioPage.vue";
import CallbackPage from "@/views/gateway/CallbackPage.vue";
import {useCallbackStore} from "@/stores/callback.ts";

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
    {
      path: '/gateway/routes',
      component: RoutesPage,
      beforeEnter: async () => {
          const routeStore = useRouteStore();
          if (!routeStore.data.isInitialized) {
              await routeStore.fetchRoute();
          }
          const methodStore = useMethodStore();
          if (!methodStore.data.isInitialized) {
              await methodStore.fetchMethod();
          }
      },
    },
    {
      path: '/gateway/routes/:routeId',
      component: ScenarioPage,
      beforeEnter: async () => {
          const scenarioStore = useScenarioStore();
          if (!scenarioStore.data.isInitialized) {
              await scenarioStore.fetchScenario();
          }
      },
    },
    {
      path: '/gateway/routes/:routeId/scenario/:scenarioId',
      component: CallbackPage,
      beforeEnter: async () => {
          const callbackStore = useCallbackStore();
          if (!callbackStore.data.isInitialized) {
              await callbackStore.fetchCallback();
          }
      },
    },
  ],
})

export default router
