package com.example.companymanager.controller;


import com.example.companymanager.dto.CompanyWebsiteDTO;
import com.example.companymanager.service.CompanyWebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RequestMapping(path = "/api/v1/company/website")
@RestController
public class CompanyWebsiteController {

    private CompanyWebsiteService companyWebsiteService;

    @Autowired
    public CompanyWebsiteController(CompanyWebsiteService companyWebsiteService){
        this.companyWebsiteService = companyWebsiteService;
    }



    @PostMapping
    public ResponseEntity<HashMap<String, String>> SaveCompanyWebsite(
            @RequestBody CompanyWebsiteDTO websiteDTO

    ){
        HashMap<String, String> result = new HashMap<>();
        try{
            companyWebsiteService.SaveCompanyWebsite(websiteDTO);

            result.put("success", "Successfully set the website");
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            result.put("error", "Something went wrong");
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
}
