package com.example.gateway;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {

    private final AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("CompanyManagerWorkspace", r -> r.path("/api/v1/workspace/**")
                        .filters(f -> f.filter(filter) // Ensure this line is present
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE)
                                        .setMethods(HttpMethod.GET, HttpMethod.DELETE)))
                        .uri("lb://CompanyManager"))
                .route("CompanyManagerCommunication", r -> r.path("/api/v1/communication/**")
                        .filters(f -> f.filter(filter) // Ensure this line is present
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE)
                                        .setMethods(HttpMethod.GET, HttpMethod.DELETE)))
                        .uri("lb://CompanyManager"))
                .route("CompanyManagerCompany", r -> r.path("/api/v1/company/**")
                        .filters(f -> f.filter(filter)
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE).allMethods()))
                        .uri("lb://CompanyManager"))
                .route("Authentication", r -> r.path("/api/v1/auth/**")
                        .filters(f -> f.filter(filter)
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE).allMethods()))
                        .uri("lb://Authentication"))
                .route("WebscraperService", r -> r.path("/api/v1/webscraper/**")
                        .filters(f -> f.filter(filter)
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE).allMethods()))
                        .uri("lb://WebscraperService"))
                .route("AIService", r -> r.path("/api/v1/salespitch/**")
                        .filters(f -> f.filter(filter)
                                .retry(config -> config.setRetries(3)
                                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE).allMethods()))
                        .uri("lb://AIService"))
                .build();
    }
}