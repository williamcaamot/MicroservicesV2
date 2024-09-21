package com.example.companymanager.controller;


import com.example.companymanager.entity.Company;
import com.example.companymanager.service.CompanyService;
import org.springframework.beans.CachedIntrospectionResults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/workspace/{workspaceId}/company")
public class CompanyController {


    private CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping(path = "")
    public ResponseEntity<Company> saveCompany(@RequestBody Company company) {
        System.out.println("Saving new company");
        return ResponseEntity.status(HttpStatus.CREATED).body(companyService.saveCompany(company));
    }

    @GetMapping(path = "")
    public ResponseEntity<List<Company>> getCompanies() {
        return ResponseEntity.status(HttpStatus.OK).body(companyService.getAllCompanies());
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<Company> getCompanyById(Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(companyService.getCompanyById(id));
    }


    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


}
