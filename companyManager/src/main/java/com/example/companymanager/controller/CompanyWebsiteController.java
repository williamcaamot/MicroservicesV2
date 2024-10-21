package com.example.companymanager.controller;


import com.example.companymanager.dto.CompanyWebsiteDTO;
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



    @PostMapping
    public ResponseEntity<HashMap<String, String>> SaveCompanyWebsite(@RequestBody CompanyWebsiteDTO websiteDTO){
        HashMap<String, String> result = new HashMap<>();
        try{
            System.out.println(websiteDTO.getCompanyWebsite());
            System.out.println(websiteDTO.getWorkspaceId());
            System.out.println(websiteDTO.getAccountId());

            result.put("success", "Successfully set the website");
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            result.put("error", "Something went wrong");
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }



        //TODO Should call service from this controller- That does not happen now!
        //After the request comes here we assume it is OK.
    }


}
