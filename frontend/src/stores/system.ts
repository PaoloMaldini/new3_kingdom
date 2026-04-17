import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchHealthStatus, fetchSystemInfo } from '@/api/system'
import type { HealthStatusPayload, SystemInfoPayload } from '@/types/system'

export const useSystemStore = defineStore('system', () => {
  const health = ref<HealthStatusPayload | null>(null)
  const info = ref<SystemInfoPayload | null>(null)
  const loading = ref(false)
  const errorMessage = ref('')

  async function loadSystemSnapshot() {
    loading.value = true
    errorMessage.value = ''

    try {
      const [healthResponse, infoResponse] = await Promise.all([
        fetchHealthStatus(),
        fetchSystemInfo(),
      ])

      health.value = healthResponse.data
      info.value = infoResponse.data
    } catch (error) {
      health.value = null
      info.value = null
      errorMessage.value = error instanceof Error ? error.message : '系统状态获取失败'
    } finally {
      loading.value = false
    }
  }

  return {
    health,
    info,
    loading,
    errorMessage,
    loadSystemSnapshot,
  }
})
