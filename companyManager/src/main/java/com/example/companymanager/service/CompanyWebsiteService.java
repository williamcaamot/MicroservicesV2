package com.example.companymanager.service;


import com.example.companymanager.dto.CompanyWebsiteDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyWebsiteService {

    private CompanyRepository companyRepository;

    @Autowired
    public CompanyWebsiteService(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    public void SaveCompanyWebsite(CompanyWebsiteDTO websiteDTO){
        Company company = companyRepository.getById(websiteDTO.getCompanyId());
        company.setHjemmeside(websiteDTO.getCompanyWebsite());
        companyRepository.save(company);
    }


}
