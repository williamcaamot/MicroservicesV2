package com.example.companymanager.service;


import com.example.companymanager.dto.CompanyWebsiteDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CompanyWebsiteService {

    private CompanyRepository companyRepository;
    private WorkspaceRepository workspaceRepository;


    @Autowired
    public CompanyWebsiteService(CompanyRepository companyRepository, WorkspaceRepository workspaceRepository) {
        this.companyRepository = companyRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public void SaveCompanyWebsite(CompanyWebsiteDTO websiteDTO) throws Exception {
        Workspace workspace = workspaceRepository.findById(websiteDTO.getWorkspaceId()).orElseThrow(() -> new Exception("Shit"));
        if (!Objects.equals(workspace.getOwningAccountId(), websiteDTO.getAccountId())) {
            throw new Exception("Not authorized"); //TODO should have custom not found exception and handle it globally
        }
        Company company = companyRepository.findById(websiteDTO.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company"));
        if (!Objects.equals(company.getWorkspaceId(), websiteDTO.getWorkspaceId())) {
            throw new Exception("That company is not a part of the workspace you try to work with!");
        }


        Company companyToUpdate = companyRepository.getById(websiteDTO.getCompanyId());
        companyToUpdate.setHjemmeside(websiteDTO.getCompanyWebsite());
        companyRepository.save(companyToUpdate);
    }


}
