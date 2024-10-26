package com.example.companymanager.service;


import com.example.companymanager.dto.CompanyEmailDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class CompanyEmailService {


    private CompanyRepository companyRepository;

    @Autowired
    public CompanyEmailService(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    public Company saveCompanyEmail(CompanyEmailDTO companyEmailDTO){



        return new Company();
    }


}
