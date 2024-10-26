package com.example.companymanager.service;


import com.example.companymanager.Exception.NoPermissionException;
import com.example.companymanager.dto.CompanyEmailDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CompanyEmailService {


    private CompanyRepository companyRepository;
    private WorkspaceRepository workspaceRepository;

    @Autowired
    public CompanyEmailService(
            CompanyRepository companyRepository,
            WorkspaceRepository workspaceRepository
    ) {
        this.companyRepository = companyRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public Company saveCompanyEmail(CompanyEmailDTO companyEmailDTO) {
        Workspace workspace = workspaceRepository.findById(companyEmailDTO.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + companyEmailDTO.getWorkspaceId()));
        if (!Objects.equals(workspace.getOwningAccountId(), companyEmailDTO.getAccountId())) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(companyEmailDTO.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + companyEmailDTO.getCompanyId()));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        company.setEmailAddresses(companyEmailDTO.getEmails());

        return companyRepository.save(company);
    }
}
