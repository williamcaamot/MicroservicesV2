package com.example.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIChatGPTService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String API_KEY = "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";

    private final WebClient webClient;

    @Autowired
    public OpenAIChatGPTService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl(OPENAI_API_URL)
                .defaultHeader("Authorization", "Bearer " + API_KEY)
                .build();
    }


    public String getChatResponse(String prompt) {
        try {



            System.out.println("Sending request to openai");
            String response = webClient.post()
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
