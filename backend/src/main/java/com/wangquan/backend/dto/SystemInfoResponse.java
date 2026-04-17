package com.wangquan.backend.dto;

public record SystemInfoResponse(
    String appName,
    String version,
    String environment,
    String javaVersion
) {
}
