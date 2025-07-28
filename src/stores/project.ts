import {ref} from 'vue'
import { defineStore } from 'pinia'
import type {Project, ProjectStore, Setting} from "@/types/project.ts";
import {useProject} from "@/compositions/useApi.ts";

export const useProjectStore = defineStore('project', () => {
  const current = ref<Project | null>(null);
  const data = ref<ProjectStore>({ isInitialized: false, projects: [] })

  const fetchProject = async () => {
    try {
      data.value.projects = (await useProject.getProjects()).data;
    } finally {
      if (!current.value && data.value?.projects.length > 0) {
        current.value = data.value.projects[0];
      }
      data.value.isInitialized = true;
    }
  }

  const replaceMethods = async () => {
    if (!current.value) {
      return;
    }
    return await useProject.replaceMethods(current.value.id, current.value.methods)
  }

  const updateSettings = async (settings: Setting[]) => {
    if (!current.value) {
      return;
    }

    current.value.settings = settings;

    return await useProject.updateSettings(current.value.id, settings)
  }

  return { data, current, fetchProject, replaceMethods, updateSettings }
})
