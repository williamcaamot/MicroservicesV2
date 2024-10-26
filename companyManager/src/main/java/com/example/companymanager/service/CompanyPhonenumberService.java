package com.example.companymanager.service;


import com.example.companymanager.Exception.NoPermissionException;
import com.example.companymanager.dto.CompanyPhonenumberDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CompanyPhonenumberService {

    private CompanyRepository companyRepository;
    private WorkspaceRepository workspaceRepository;

    @Autowired
    public CompanyPhonenumberService(
            CompanyRepository companyRepository,
            WorkspaceRepository workspaceRepository
    ) {
        this.companyRepository = companyRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public Company saveCompanyPhonenumbers(CompanyPhonenumberDTO companyPhonenumberDTO) {
        Workspace workspace = workspaceRepository.findById(companyPhonenumberDTO.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + companyPhonenumberDTO.getWorkspaceId()));
        if (!Objects.equals(workspace.getOwningAccountId(), companyPhonenumberDTO.getAccountId())) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(companyPhonenumberDTO.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + companyPhonenumberDTO.getCompanyId()));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        company.setPhonenumbers(companyPhonenumberDTO.getPhoneNumbers());

        return companyRepository.save(company);
    }

}
