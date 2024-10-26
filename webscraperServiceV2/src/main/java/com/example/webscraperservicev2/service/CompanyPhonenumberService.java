package com.example.webscraperservicev2.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyPhonenumberService {

    private ScraperService scraperService;

    @Autowired
    public CompanyPhonenumberService(ScraperService scraperService){
        this.scraperService = scraperService;
    }






}
