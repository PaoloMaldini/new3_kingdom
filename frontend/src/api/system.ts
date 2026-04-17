import { http } from '@/api/http'
import type { ApiResponse, HealthStatusPayload, SystemInfoPayload } from '@/types/system'

export function fetchHealthStatus() {
  return http.get<ApiResponse<HealthStatusPayload>>('/health').then((response) => response.data)
}

export function fetchSystemInfo() {
  return http.get<ApiResponse<SystemInfoPayload>>('/system/info').then((response) => response.data)
}
