package com.example.webscraperservicev2.service;


import com.example.webscraperservicev2.dto.CompanyWebsiteDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RefreshScope
public class CompanyWebsiteService {


    @Value("${google.api_key:}") // Default to an empty string if not set
    private String API_KEY;

    @Value("${google.cx:}") // Default to an empty string if not set
    private String CX;


    private final WebClient.Builder webClientBuilder;

    @Autowired
    public CompanyWebsiteService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }


    public List<String> getWebsite(String companyName) {
        if ((API_KEY == null || API_KEY.isBlank()) || (CX == null || CX.isBlank())) {
            StringBuilder errorMessage = new StringBuilder("Error:");
            if (API_KEY == null || API_KEY.isBlank()) {
                errorMessage.append(" Google API key (API_KEY) is missing.");
            }
            if (CX == null || CX.isBlank()) {
                errorMessage.append(" Google CX key is missing.");
            }
            return List.of(errorMessage.toString());
        }
        try {
            String encodedCompanyName = URLEncoder.encode(companyName, StandardCharsets.UTF_8);
            String apiUrl = "https://www.googleapis.com/customsearch/v1?q=" + encodedCompanyName + "&key=" + API_KEY + "&cx=" + CX + "&num=10";

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            //System.out.println(response.body());

            return extractWebsiteUrl(response.body());

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private List<String> extractWebsiteUrl(String jsonResponse) {
        try {

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode items = root.get("items");

            if (items != null && items.isArray()) {
                List<String> result = new ArrayList<>();


                for (JsonNode item : items) {
                    String link = item.get("link").asText();
                    result.add(link);
                }
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }


    public String saveWebsite(CompanyWebsiteDTO websiteDTO, Long accountId) {
        Map<String, Object> request = new HashMap<>();
        request.put("workspaceId", websiteDTO.getWorkspaceId());
        request.put("companyWebsite", websiteDTO.getCompanyWebsite());
        request.put("accountId", accountId);
        request.put("companyId", websiteDTO.getCompanyId());

        String companyManagerUrl = "http://CompanyManager/api/v1/company/website";

        String response = webClientBuilder.build()
                .post()
                .uri(companyManagerUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }

}