package com.example.webscraperservicev2.service;


import com.example.webscraperservicev2.dto.SaveCompanyWebsiteDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

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
public class CompanyWebsiteService {

    private static final String API_KEY = "AIzaSyDjUBYwYTQ1vs143c3qO-Eiep8UVDt7dow";  // Replace with your API key
    private static final String CX = "178c48d27a6b145d9";  // Replace with your Custom Search Engine ID

    public List<String> getWebsite(String companyName) {
        try {
            // Formulate the search query
            String encodedCompanyName = URLEncoder.encode(companyName, StandardCharsets.UTF_8);
            String apiUrl = "https://www.googleapis.com/customsearch/v1?q=" + encodedCompanyName + "&key=" + API_KEY + "&cx=" + CX + "&num=10";

            // Create an HTTP client and request
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .build();

            // Send the request and get the response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            //System.out.println(response.body());

            // Parse the response and extract the first website URL
            return extractWebsiteUrl(response.body());

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Function to extract the website URL from the JSON response
    private List<String> extractWebsiteUrl(String jsonResponse) {
        try {

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode items = root.get("items");

            if (items != null && items.isArray()) {
                List<String> result = new ArrayList<>();


                for (JsonNode item : items) {
                    // Get the first result's link
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


    public String saveWebsite(SaveCompanyWebsiteDTO websiteDTO, Long accountId){
        System.out.println("Workspace " + websiteDTO.getWorkspaceId());
        System.out.println("Website URL " + websiteDTO.getCompanyWebsite());
        System.out.println("Account ID " + accountId);
        return websiteDTO.getCompanyWebsite();
    }

}