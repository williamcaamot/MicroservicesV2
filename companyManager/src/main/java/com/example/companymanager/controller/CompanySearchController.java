package com.example.companymanager.controller;


import com.example.companymanager.service.CompanySearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/v1/company/search")
public class CompanySearchController {

    private final CompanySearchService companySearchService;

    @Autowired
    public CompanySearchController(CompanySearchService companySearchService){
        this.companySearchService = companySearchService;
    }


    @GetMapping
    public Object searchCompanies(@RequestParam String navn){
        return companySearchService.searchExternalAPI(navn);
    }


}
