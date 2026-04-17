export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: string
}

export interface HealthStatusPayload {
  status: string
  service: string
  time: string
}

export interface SystemInfoPayload {
  appName: string
  version: string
  environment: string
  javaVersion: string
}
