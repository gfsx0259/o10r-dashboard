import { createRouter, createWebHistory } from 'vue-router'
import MethodsPage from "@/views/MethodsPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import {useMethodStore} from "@/stores/method.ts";

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
  ],
})

export default router
