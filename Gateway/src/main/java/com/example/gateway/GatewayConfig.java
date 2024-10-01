package com.example.gateway;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {

    private final AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("CompanyManager", r -> r.path("/api/v1/workspace/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://CompanyManager"))
                .route("Authentication", r -> r.path("/api/v1/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://Authentication"))
                .route("WebscraperService", r -> r.path("/api/v1/webscraper/companywebsite")
                        .filters(f -> f.filter(filter))
                        .uri("lb://WebscraperService"))
                .build();
    }

}