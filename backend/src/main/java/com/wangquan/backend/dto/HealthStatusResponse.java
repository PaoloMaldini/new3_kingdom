package com.wangquan.backend.dto;

import java.time.Instant;

public record HealthStatusResponse(String status, String service, Instant time) {
}
