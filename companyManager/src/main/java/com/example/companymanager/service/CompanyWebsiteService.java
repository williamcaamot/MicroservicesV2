package com.example.companymanager.service;


import com.example.companymanager.dto.CompanyWebsiteDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyWebsiteService {

    private CompanyRepository companyRepository;
    private WorkspaceRepository workspaceRepository;

    @Autowired
    public CompanyWebsiteService(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    public void SaveCompanyWebsite(CompanyWebsiteDTO websiteDTO){

        // TODO First check that the account has access to the workspace
        // Then check that the company is part of the workspace!


        Company company = companyRepository.getById(websiteDTO.getCompanyId());
        company.setHjemmeside(websiteDTO.getCompanyWebsite());
        companyRepository.save(company);
    }


}
