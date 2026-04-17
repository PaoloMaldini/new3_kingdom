package com.wangquan.backend.controller;

import com.wangquan.backend.common.ApiResponse;
import com.wangquan.backend.dto.HealthStatusResponse;
import com.wangquan.backend.dto.SystemInfoResponse;
import com.wangquan.backend.service.SystemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SystemController {

  private final SystemService systemService;

  public SystemController(SystemService systemService) {
    this.systemService = systemService;
  }

  @GetMapping("/health")
  public ApiResponse<HealthStatusResponse> health() {
    return ApiResponse.success("success", systemService.getHealthStatus());
  }

  @GetMapping("/system/info")
  public ApiResponse<SystemInfoResponse> systemInfo() {
    return ApiResponse.success("success", systemService.getSystemInfo());
  }
}
