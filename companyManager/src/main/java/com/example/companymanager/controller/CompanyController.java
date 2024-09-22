package com.example.companymanager.controller;

import com.example.companymanager.entity.Company;
import com.example.companymanager.service.CompanyService;
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
    public ResponseEntity<Company> saveCompany(@PathVariable Long workspaceId, @RequestBody Company company) {

        company.setWorkspaceId(workspaceId);
        return ResponseEntity.status(HttpStatus.CREATED).body(companyService.saveCompany(company));
    }

    @GetMapping(path = "")
    public ResponseEntity<List<Company>> getCompanies(@PathVariable Long workspaceId) {
        System.out.println("Workspace ID");
        System.out.println(workspaceId);

        return ResponseEntity.status(HttpStatus.OK).body(companyService.getAllCompanies(workspaceId));
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(companyService.getCompanyById(id));
    }


    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
