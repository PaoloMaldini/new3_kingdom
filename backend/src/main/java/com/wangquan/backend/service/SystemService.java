package com.wangquan.backend.service;

import com.wangquan.backend.config.AppProperties;
import com.wangquan.backend.dto.HealthStatusResponse;
import com.wangquan.backend.dto.SystemInfoResponse;
import java.time.Instant;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class SystemService {

  private final AppProperties appProperties;
  private final Environment environment;

  public SystemService(AppProperties appProperties, Environment environment) {
    this.appProperties = appProperties;
    this.environment = environment;
  }

  public HealthStatusResponse getHealthStatus() {
    return new HealthStatusResponse("UP", appProperties.getName(), Instant.now());
  }

  public SystemInfoResponse getSystemInfo() {
    String activeProfile = environment.getActiveProfiles().length > 0
        ? environment.getActiveProfiles()[0]
        : "default";

    return new SystemInfoResponse(
        appProperties.getName(),
        appProperties.getVersion(),
        activeProfile,
        System.getProperty("java.version")
    );
  }
}
