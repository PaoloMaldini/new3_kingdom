package com.wangquan.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class WangquanBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(WangquanBackendApplication.class, args);
  }
}
