package com.example.companymanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CompanySearchService {

    private final RestTemplate restTemplate;

    @Autowired
    public CompanySearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchExternalAPI(String searchTerm) {
        String url = "https://data.brreg.no/enhetsregisteret/api/enheter?navn=" + searchTerm;
        return restTemplate.getForObject(url, String.class); // Returns the JSON response as a String
    }

}
