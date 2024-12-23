package com.example.webscraperservicev2.controller;


import com.example.webscraperservicev2.dto.CompanyWebsiteDTO;
import com.example.webscraperservicev2.service.CompanyWebsiteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<String> saveCompanyWebsite(
            @RequestBody CompanyWebsiteDTO websiteDTO,
            @RequestHeader("accountid") Long accountId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(companyWebsiteService.saveWebsite(websiteDTO, accountId));
    }


}
