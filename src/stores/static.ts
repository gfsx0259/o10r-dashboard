import {ref} from 'vue'
import { defineStore } from 'pinia'
import {useGateway} from "@/compositions/useApi.ts";
import type {StaticRoute, StaticStore} from "@/types/static.ts";

export const useStaticStore = defineStore('static', () => {
  const data = ref<StaticStore>({ isInitialized: false, routes: [] })

  const fetchStatic = async () => {
    try {
      data.value.routes = (await useGateway.getStaticRoute()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistStatic = async (route: StaticRoute) => {
    if (route.id) {
        await useGateway.updateStaticRoute(route);
        const index = data.value.routes.findIndex(s => s.id === route.id);
        if (index !== -1) {
            data.value.routes[index] = route;
        }
    } else {
        const savedRoute = (await useGateway.createStaticRoute(route)).data;
        data.value.routes.push(savedRoute);
    }
  }

  const deleteStatic = async (id: number) => {
      await useGateway.deleteStaticRoute(id);
      data.value.routes = data.value.routes.filter((route: StaticRoute) => route.id !== id);
  }

  return { data, fetchStatic, persistStatic, deleteStatic }
})
