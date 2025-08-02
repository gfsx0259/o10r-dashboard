<template>
  <header
      class="absolute top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 px-6 py-4 flex justify-between items-center"
  >
    <h1 class="text-xl font-semibold text-gray-800">O10R Dashboard</h1>

    <div class="flex items-center gap-6">
      <select
          v-model="selectedProject"
          class="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 bg-white shadow-sm"
      >
        <option
            v-for="project in projects?.projects"
            :key="project.id"
            :value="project"
        >
          {{ project.code }}
        </option>
      </select>

      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-700">{{ user?.email }}</span>
        <img
            :src="avatarUrl"
            alt="User avatar"
            class="w-9 h-9 rounded-full border border-gray-300 object-cover"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ProjectStore, Project } from '@/types/project'
import type { UserStore } from '@/types/auth'
import {computed} from "vue";

const props = defineProps<{
  projects?: ProjectStore
  user?: UserStore
}>()

const selectedProject = defineModel<Project>('activeProject')

const avatarUrl = computed(() => {
  const email = props.user?.email || 'user'
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`
})
</script>
