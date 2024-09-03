package com.example.ecommerce.configurations;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.net.InetAddress;

@Component
public class CustomHealthCheck implements HealthIndicator {

    @Override
    public Health health() {
        try{
            String computerName = InetAddress.getLocalHost().getHostName();
            return Health.up().withDetail("ComputerName", computerName).build();
        }
        catch (Exception e){
            return Health.down().withDetail("Error", e.getMessage()).build();
        }
    }
}
