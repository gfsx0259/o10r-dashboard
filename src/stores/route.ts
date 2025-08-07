import {ref} from 'vue'
import { defineStore } from 'pinia'

import {useGateway} from "@/compositions/useApi.ts";
import type {Route, RouteStore} from "@/types/route.ts";

export const useRouteStore = defineStore('route', () => {
  const data = ref<RouteStore>({ isInitialized: false, routes: [] })

  const fetchRoute = async () => {
    try {
      data.value.routes = (await useGateway.getRoute()).data;
    } finally {
      data.value.isInitialized = true;
    }
  }

  const persistRoute = async (route: Route) => {
    if (route.id) {
        await useGateway.updateRoute(route);
        const index = data.value.routes.findIndex(s => s.id === route.id);
        if (index !== -1) {
            data.value.routes[index] = route;
        }
    } else {
        const savedRoute = (await useGateway.createRoute(route)).data;
        data.value.routes.push(savedRoute);
    }
  }

  const deleteRoute = async (id: number) => {
      await useGateway.deleteRoute(id);
      data.value.routes = data.value.routes.filter((route: Route) => route.id !== id);
  }

  return { data, fetchRoute, persistRoute, deleteRoute }
})
