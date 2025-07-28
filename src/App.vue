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
import {onMounted, type Ref, ref, watch} from 'vue'
import { RouterView } from 'vue-router'
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import type {Project} from "@/types/project.ts";
import { useProjectStore } from '@/stores/project'
import {useUserStore} from "@/stores/user.ts";

const projectStore = useProjectStore();
const userStore = useUserStore();

onMounted(async () => {
  await projectStore.fetchProject();
  await userStore.fetchAuth();

  if (!userStore.data.isAuthenticated) {
    window.location.href = 'https://ory.o10r.io';
  }
});
//
// const activeProject: Ref<Project | null> = ref(null)
//
// watch(
//     () => projectStore.data.projects,
//     (projects: Project[] | null) => {
//         if (projects?.length && !activeProject.value) {
//           activeProject.value = projects[0]
//         }
//     },
//     { immediate: true })
</script>

<style>
:root {
  --radius-lg: 2rem;
}
</style>