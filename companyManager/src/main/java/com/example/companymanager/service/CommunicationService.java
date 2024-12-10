package com.example.companymanager.service;


import com.example.companymanager.Exception.NoPermissionException;
import com.example.companymanager.entity.Communication;
import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.CommunicationRepository;
import com.example.companymanager.repository.CompanyRepository;
import com.example.companymanager.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CommunicationService {

    private final CommunicationRepository communicationRepository;

    private final WorkspaceRepository workspaceRepository;

    private final CompanyRepository companyRepository;

    @Autowired
    public CommunicationService(
            CommunicationRepository communicationRepository,
            WorkspaceRepository workspaceRepository,
            CompanyRepository companyRepository
    ){
        this.communicationRepository = communicationRepository;
        this.workspaceRepository = workspaceRepository;
        this.companyRepository = companyRepository;
    }



    public Communication getCommunicationById(Long communicationId, Long workspaceId, Long accountId, Long companyId){
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + workspaceId));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + companyId));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        return communicationRepository.findById(communicationId).orElseThrow(() -> new EntityNotFoundException("Could not find communication with ID: " + communicationId));
    }

    public List<Communication> getCommunicationsByCompanyId(Long workspaceId, Long accountId, Long companyId){
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + workspaceId));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + companyId));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        return communicationRepository.getCommunicationByCompanyId(companyId);
    }


    public List<Communication> getCommunicationsByWorkspaceId(Long workspaceId, Long accountId){
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + workspaceId));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        return communicationRepository.getCommunicationByWorkspaceId(workspaceId);
    }


    public Communication saveCommunication(Communication communication, Long accountId){
        Workspace workspace = workspaceRepository.findById(communication.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + communication.getWorkspaceId()));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(communication.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + communication.getCompanyId()));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        return communicationRepository.save(communication);
    }


    public Communication updateCommunication(Communication communication, Long accountId){
        Workspace workspace = workspaceRepository.findById(communication.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + communication.getWorkspaceId()));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(communication.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + communication.getCompanyId()));
        if(!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())){
            throw new NoPermissionException();
        }
        if(communicationRepository.existsById(communication.getCommunicationId())){
            return communicationRepository.save(communication);
        }else {
            throw new EntityNotFoundException("Could not find communication with ID: " + communication.getCommunicationId());
        }
    }

    public void deleteCommunication(Communication communication, Long accountId) {
        Workspace workspace = workspaceRepository.findById(communication.getWorkspaceId()).orElseThrow(() -> new EntityNotFoundException("Could not find Workspace with ID: " + communication.getWorkspaceId()));
        if (!Objects.equals(workspace.getOwningAccountId(), accountId)) {
            throw new NoPermissionException();
        }
        Company company = companyRepository.findById(communication.getCompanyId()).orElseThrow(() -> new EntityNotFoundException("Could not find company with id: " + communication.getCompanyId()));
        if (!Objects.equals(company.getWorkspaceId(), workspace.getWorkspaceId())) {
            throw new NoPermissionException();
        }
        if (communicationRepository.existsById(communication.getCommunicationId())) {
            communicationRepository.deleteById(communication.getCommunicationId());
            return;
        } else {
            throw new EntityNotFoundException("Could not find communication with ID: " + communication.getCommunicationId());
        }

    }
}
