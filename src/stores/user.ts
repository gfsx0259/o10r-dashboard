import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserStore } from "@/types/auth.ts";

export const useUserStore = defineStore('user', () => {
  const data = ref<UserStore>({ isAuthenticated: false, isInitialized: false })

  const fetchAuth = async () => {
    // const response = await fetch('https://dashboard.o10r.io/session', {
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })

    try {
      const response = await fetch('https://ory.o10r.io:4433/sessions/whoami', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const responseParsed = await response.json()
      data.value = {
        isInitialized: true,
        isAuthenticated: responseParsed.active,
        email: responseParsed.identity.traits.email,
        session: responseParsed,
      }
    } catch (error) {
      console.error(error)
      window.location.href = 'https://ory.o10r.io';
    }
  }
  return { data, fetchAuth }
})
