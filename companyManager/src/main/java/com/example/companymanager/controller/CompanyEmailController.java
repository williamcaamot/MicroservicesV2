package com.example.companymanager.controller;


import com.example.companymanager.dto.CompanyEmailDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.service.CompanyEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping(path = "/api/v1/company/email")
public class CompanyEmailController {

    CompanyEmailService companyEmailService;

    @Autowired
    public CompanyEmailController(CompanyEmailService companyEmailService) {
        this.companyEmailService = companyEmailService;
    }


    @PostMapping
    public ResponseEntity<HashMap<String, ArrayList<String>>> SaveEmails(
            @RequestBody CompanyEmailDTO companyEmailDTO
            ){
        HashMap<String, ArrayList<String>> result = new HashMap<>();

        System.out.println("Getting request to save email");



        Company updatedCompany = companyEmailService.saveCompanyEmail(companyEmailDTO);
        result.put("Emails", (ArrayList<String>) updatedCompany.getEmailAddresses());


        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
