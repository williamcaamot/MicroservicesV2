package com.example.webscraperservicev2.controller;

import com.example.webscraperservicev2.dto.GetAndSaveEmailsDTO;
import com.example.webscraperservicev2.dto.GetAndSavePhonenumberDTO;
import com.example.webscraperservicev2.service.CompanyPhonenumberService;
import com.example.webscraperservicev2.service.CompanyWebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/v1/webscraper/companyphonenumber")
public class CompanyPhonenumberController {



    private CompanyPhonenumberService companyPhonenumberService;

    @Autowired
    public CompanyPhonenumberController(CompanyPhonenumberService companyWebsiteService){
        this.companyPhonenumberService = companyWebsiteService;
    }


    @PostMapping
    public ResponseEntity<ArrayList<String>> getAndSaveEmails(
            @RequestBody GetAndSavePhonenumberDTO getAndSavePhonenumberDTO,
            @RequestHeader("accountid") Long accountId
    ) {
        getAndSavePhonenumberDTO.setAccountId(accountId);
        ArrayList<String> result = companyPhonenumberService.getAndSavePhonenumbers(getAndSavePhonenumberDTO);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }





}
