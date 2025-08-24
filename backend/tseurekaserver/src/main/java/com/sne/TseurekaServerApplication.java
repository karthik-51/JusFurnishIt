package com.sne;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class TseurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(TseurekaServerApplication.class, args);
    }
}
