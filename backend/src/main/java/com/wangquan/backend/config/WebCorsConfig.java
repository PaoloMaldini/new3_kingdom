package com.wangquan.backend.config;

import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {

  private final AppProperties appProperties;

  public WebCorsConfig(AppProperties appProperties) {
    this.appProperties = appProperties;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    List<String> allowedOrigins = appProperties.getCors().getAllowedOrigins();
    var registration = registry.addMapping("/api/**")
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);

    if (allowedOrigins == null || allowedOrigins.isEmpty()) {
      registration.allowedOriginPatterns("*");
      return;
    }

    registration.allowedOrigins(allowedOrigins.toArray(String[]::new));
  }
}
