package com.example.webscraperservicev2.controller;


import com.example.webscraperservicev2.dto.GetAndSaveEmailsDTO;
import com.example.webscraperservicev2.service.CompanyEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping(path = "/api/v1/webscraper/companyemail")
public class CompanyEmailController {


    private final CompanyEmailService companyEmailService;

    @Autowired
    public CompanyEmailController(CompanyEmailService companyEmailService) {
        this.companyEmailService = companyEmailService;
    }


    @PostMapping
    public ResponseEntity<ArrayList<String>> getAndSaveEmails(
            @RequestBody GetAndSaveEmailsDTO getAndSaveEmailsDTO,
            @RequestHeader("accountid") Long accountId
    ) {
        getAndSaveEmailsDTO.setAccountId(accountId);
        ArrayList<String> result = companyEmailService.getAndSaveEmails(getAndSaveEmailsDTO);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
