package com.example.apigateway.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/hotel-service")
    public Mono<ResponseEntity<Map<String, Object>>> hotelServiceFallback() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hotel service is currently unavailable. Please try again later.");
        response.put("status", "SERVICE_UNAVAILABLE");
        response.put("timestamp", System.currentTimeMillis());
        
        return Mono.just(ResponseEntity.status(503).body(response));
    }
} 