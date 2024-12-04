package com.example.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RefreshScope
public class OpenAIChatGPTService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";


    @Value("${openai.api-key:}") // Default to an empty string if not set
    private String API_KEY;

    private final WebClient webClient;

    @Autowired
    public OpenAIChatGPTService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(OPENAI_API_URL)
                .defaultHeader("Authorization", "Bearer " + API_KEY)
                .build();
    }


    public String getChatResponse(String prompt) {
        if (API_KEY == null || API_KEY.isEmpty()) {
            System.out.println("No API key provided... Please provide one in Consul Configuration!");
            return "No API key provided";
        }

        try {
            System.out.println("Sending request to OpenAI with API key");
            String response = webClient.post()
                    .uri(OPENAI_API_URL) // Replace with the actual API endpoint
                    .header("Authorization", "Bearer " + API_KEY)
                    .bodyValue(buildRequest(prompt)) // Build the request JSON
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseResponse(response);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get response from OpenAI", e);
        }
    }

    private Map<String, Object> buildRequest(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();

        // Create the "messages" array with the dynamic prompt
        List<Map<String, String>> messages = List.of(
                Map.of("role", "system", "content", prompt)
        );

        // Add the fields to the request body
        requestBody.put("messages", messages);
        requestBody.put("model", "gpt-4");

        return requestBody;
    }

    private String parseResponse(String response) {
        // Parse JSON to extract the reply content (simplified for illustration)
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse OpenAI response", e);
        }
    }
}
