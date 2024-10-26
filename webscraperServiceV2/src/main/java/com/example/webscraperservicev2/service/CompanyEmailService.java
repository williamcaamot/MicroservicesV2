package com.example.webscraperservicev2.service;


import org.htmlunit.ScriptResult;
import org.htmlunit.WebClient;
import org.htmlunit.html.HtmlBody;
import org.htmlunit.html.HtmlElement;
import org.htmlunit.html.HtmlPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyEmailService {


    private EmailScraperService emailScraperService;


    @Autowired
    public CompanyEmailService(EmailScraperService emailScraperService){
        this.emailScraperService = emailScraperService;
    }


    public ArrayList<String> getEmails(String website){
        // TODO Communication with company manager service
        return emailScraperService.getEmails(website);
    }

}
