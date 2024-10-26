package com.example.companymanager.controller;

import com.example.companymanager.dto.CompanyPhonenumberDTO;
import com.example.companymanager.service.CompanyPhonenumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RequestMapping(path = "/api/v1/company/phonenumber")
@RestController
public class CompanyPhonenumberController {

    private CompanyPhonenumberService companyPhonenumberService;

    @Autowired CompanyPhonenumberController(CompanyPhonenumberService companyPhonenumberService){
        this.companyPhonenumberService = companyPhonenumberService;
    }


    @PostMapping
    public ResponseEntity<HashMap<String, ArrayList<String>>> SavePhonenumbers(
            @RequestBody CompanyPhonenumberDTO companyPhonenumberDTO
            ){
        HashMap<String, ArrayList<String>> result = new HashMap<>();
    }



}
