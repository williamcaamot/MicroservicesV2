package com.example.webscraperservicev2.service;


import com.example.webscraperservicev2.dto.GetAndSaveEmailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class CompanyEmailService {

    private ScraperService emailScraperService;
    private WebClient.Builder webClientBuilder;

    @Autowired
    public CompanyEmailService(ScraperService emailScraperService, WebClient.Builder webClientBuilder){
        this.emailScraperService = emailScraperService;
        this.webClientBuilder = webClientBuilder;
    }

    public ArrayList<String> getAndSaveEmails(GetAndSaveEmailsDTO getAndSaveEmailsDTO){
        ArrayList<String> result = emailScraperService.getEmails(getAndSaveEmailsDTO.getWebsite());

        System.out.println("Reaching getandsave emails method");

        if (result.isEmpty()){ // No need to call service to store if cannot find any emails

            return result;
        }

        Map<String, Object> request = new HashMap<>();
        request.put("accountId", getAndSaveEmailsDTO.getAccountId());
        request.put("workspaceId", getAndSaveEmailsDTO.getWorkspaceId());
        request.put("companyId", getAndSaveEmailsDTO.getCompanyId());
        request.put("emails", result);

        String companyManagerUrl = "http://CompanyManager/api/v1/company/email";

        String response = webClientBuilder.build()
                .post()
                .uri(companyManagerUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // Blocking call for simplicity

        System.out.println(response);


        return result;
    }



}
