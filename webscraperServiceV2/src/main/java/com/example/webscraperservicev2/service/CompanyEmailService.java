package com.example.webscraperservicev2.service;


import com.example.webscraperservicev2.dto.GetAndSaveEmailsDTO;
import org.htmlunit.ScriptResult;
import org.htmlunit.html.HtmlBody;
import org.htmlunit.html.HtmlElement;
import org.htmlunit.html.HtmlPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class CompanyEmailService {

    private EmailScraperService emailScraperService;
    private WebClient.Builder webClientBuilder;

    @Autowired
    public CompanyEmailService(EmailScraperService emailScraperService, WebClient.Builder webClientBuilder){
        this.emailScraperService = emailScraperService;
        this.webClientBuilder = webClientBuilder;
    }


    public ArrayList<String> getEmails(String website){
        ArrayList<String> result = emailScraperService.getEmails(website);
        return result;
    }

    public ArrayList<String> getAndSaveEmails(GetAndSaveEmailsDTO getAndSaveEmailsDTO){
        System.out.println("Getting and saving emails in scraper service");
        ArrayList<String> result = emailScraperService.getEmails(getAndSaveEmailsDTO.getWebsite());

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


        return result;
    }



}
