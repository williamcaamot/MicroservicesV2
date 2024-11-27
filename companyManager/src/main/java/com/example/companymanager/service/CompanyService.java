package com.example.companymanager.service;


import com.example.companymanager.dto.CompanySalesPitchGenerateDTO;
import com.example.companymanager.dto.PutSalesPitchDTO;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {

    private CompanyRepository companyRepository;
    private WorkspaceRepository workspaceRepository;

    private final RabbitMQService rabbitMQService;

    @Autowired
    public CompanyService(
            CompanyRepository companyRepository,
            RabbitMQService rabbitMQService,
            WorkspaceRepository workspaceRepository
    ) {
        this.rabbitMQService = rabbitMQService;
        this.companyRepository = companyRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company getCompanyById(Long id) {

        return companyRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find Company with ID " + id));
    }


    public List<Company> getAllCompanies(Long workspaceId) {
        return companyRepository.getCompaniesByWorkspaceId(workspaceId);
    }

    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
        return;
    }


    public void putSalesPitchGenerationInMQ(CompanySalesPitchGenerateDTO generateDTO) {
        Company company = companyRepository.findById(generateDTO.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with ID: " + generateDTO.getCompanyId()));
        Workspace workspace = workspaceRepository.findById(generateDTO.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find workspace with ID: " + generateDTO.getWorkspaceId()));

        PutSalesPitchDTO putSalesPitchDTO = new PutSalesPitchDTO();

        putSalesPitchDTO.setAccountId(generateDTO.getAccountId());
        putSalesPitchDTO.setWorkspaceId(generateDTO.getWorkspaceId());
        putSalesPitchDTO.setCompanyId(generateDTO.getCompanyId());
        putSalesPitchDTO.setWorkspaceProductDescription(workspace.getProductDescription());
        putSalesPitchDTO.setCompanyName(company.getNavn());
        putSalesPitchDTO.setAktivitet(new ArrayList<>(company.getAktivitet()));
        putSalesPitchDTO.setVedtektsfestetFormaal(new ArrayList<>(company.getVedtektsfestetFormaal()));

        try{

            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(putSalesPitchDTO);

            Message message = new Message(json.getBytes(), new MessageProperties());
            rabbitMQService.sendMessage(message);

        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
