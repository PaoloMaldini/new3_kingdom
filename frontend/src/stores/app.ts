import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const title = ref(import.meta.env.VITE_APP_TITLE)
  const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL)

  const shortEnvironmentLabel = computed(() =>
    apiBaseUrl.value.startsWith('/api') ? 'Nginx / Proxy Ready' : 'Custom API Base',
  )

  return {
    title,
    apiBaseUrl,
    shortEnvironmentLabel,
  }
})
