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


    private CompanyEmailService companyEmailService;

    @Autowired
    public CompanyEmailController(CompanyEmailService companyEmailService) {
        this.companyEmailService = companyEmailService;
    }


    @GetMapping()
    public ResponseEntity<ArrayList<String>> getEmail(@RequestParam String companyWebsite) {
        ArrayList<String> result = companyEmailService.getEmails(companyWebsite);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


    @PostMapping
    public ResponseEntity<ArrayList<String>> getAndSaveEmails(@RequestBody GetAndSaveEmailsDTO getAndSaveEmailsDTO) {
        ArrayList<String> result = companyEmailService.getAndSaveEmails(getAndSaveEmailsDTO);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
