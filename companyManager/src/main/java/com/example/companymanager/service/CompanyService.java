package com.example.companymanager.service;


import com.example.companymanager.CompanyManagerApplication;
import com.example.companymanager.dto.CompanySalesPitchGenerateDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.repository.CompanyRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private CompanyRepository companyRepository;

    private final RabbitMQService rabbitMQService;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, RabbitMQService rabbitMQService){
        this.rabbitMQService = rabbitMQService;
        this.companyRepository = companyRepository;
    }

    public Company saveCompany(Company company){
        return companyRepository.save(company);
    }

    public Company getCompanyById(Long id){

        return companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Company with ID " + id));
    }


    public List<Company> getAllCompanies(Long workspaceId){
        return companyRepository.getCompaniesByWorkspaceId(workspaceId);
    }

    public Company updateCompany(Company company){
        return companyRepository.save(company);
    }

    public void deleteCompany(Long id){
        companyRepository.deleteById(id);
        return;
    }


    public void putSalesPitchGenerationInMQ(CompanySalesPitchGenerateDTO generateDTO){
        rabbitMQService
                .sendMessage("Heeeeeey!");
    }






}
