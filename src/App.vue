<template>
  <div class="flex h-screen bg-gray-100">
    <TopBar :projects="projectStore.data" :user="userStore.data" v-model:activeProject="projectStore.current"/>
    <div class="flex flex-1 pt-[70px]">
      <SideBar class="w-64 bg-white shadow" />
      <main class="flex-1 p-4 overflow-auto">
        <RouterView/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useProjectStore } from '@/stores/project'
import { useUserStore } from "@/stores/user.ts";

const projectStore = useProjectStore();
const userStore = useUserStore();

onMounted(async () => {
  try {
    await Promise.all([projectStore.fetchProject(), userStore.fetchAuth()]);
    if (!userStore.data.isAuthenticated) {
      window.location.href = 'https://ory.o10r.io';
    }
  } catch(error) {
      window.location.href = 'https://ory.o10r.io';
  }
});
</script>

<style>
:root {
  --radius-lg: 0.25rem;
}
</style>