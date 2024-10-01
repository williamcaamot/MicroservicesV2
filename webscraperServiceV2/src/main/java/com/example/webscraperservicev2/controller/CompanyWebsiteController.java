package com.example.webscraperservicev2.controller;


import com.example.webscraperservicev2.service.CompanyWebsiteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/v1/webscraper/companywebsite")
public class CompanyWebsiteController {


    private CompanyWebsiteService companyWebsiteService;

    public CompanyWebsiteController(CompanyWebsiteService companyWebsiteService) {
        this.companyWebsiteService = companyWebsiteService;
    }


    @GetMapping
    public ResponseEntity<ArrayList<String>> getCompanyWebsite(@RequestParam String companyName) {
        ArrayList<String> result = (ArrayList<String>) companyWebsiteService.getWebsite(companyName);

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }
}
