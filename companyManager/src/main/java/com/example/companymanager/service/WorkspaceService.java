package com.example.companymanager.service;

import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository){
        this.workspaceRepository = workspaceRepository;
    }


    public List<Workspace> getWorkspaces(){
        return workspaceRepository.findAll();
    }

    public List<Workspace> getWorkspaceByOwnerId(Long ownerAccountId){
        return workspaceRepository.getWorkspaceByOwningAccountId(ownerAccountId);
    }

    public Workspace saveWorkspace(Workspace workspace){
        return workspaceRepository.save(workspace);
    }

    public boolean workspaceExists(Long workspaceId){
        return workspaceRepository.existsById(workspaceId);
    }

    public Workspace getWorkspaceById(Long workspaceId){
        return workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("Could not find workspace with id" + workspaceId));
    }

    public Workspace updateWorkspace(Workspace workspace){
        if(!workspaceExists(workspace.getWorkspaceId())){
            throw new EntityNotFoundException("Cannot find Workspace!");
        }
        return workspaceRepository.save(workspace);
    }



}
