package com.example.webscraperservicev2.service;


import com.example.webscraperservicev2.dto.GetAndSaveEmailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class CompanyPhonenumberService {

    private final ScraperService scraperService;
    private final WebClient.Builder webClientBuilder;

    @Autowired
    public CompanyPhonenumberService(ScraperService scraperService, WebClient.Builder webClientBuilder){
        this.scraperService = scraperService;
        this.webClientBuilder = webClientBuilder;
    }
    public ArrayList<String> getAndSavePhonenumbers(GetAndSaveEmailsDTO getAndSaveEmailsDTO){
        ArrayList<String> result = scraperService.getPhonenumbers(getAndSaveEmailsDTO.getWebsite());
        if (result.size() > 1){ // No need to call service to store if cannot find any emails
            return result;
        }

        Map<String, Object> request = new HashMap<>();
        request.put("accountId", getAndSaveEmailsDTO.getAccountId());
        request.put("workspaceId", getAndSaveEmailsDTO.getWorkspaceId());
        request.put("companyId", getAndSaveEmailsDTO.getCompanyId());
        request.put("phonenumbers", result);

        String companyManagerUrl = "http://CompanyManager/api/v1/company/phonenumber";

        String response = webClientBuilder.build()
                .post()
                .uri(companyManagerUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // Blocking call for simplicity


        return result;
    }






}
