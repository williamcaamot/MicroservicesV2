package com.example.companymanager.service;

import com.example.companymanager.entity.Workspace;
import com.example.companymanager.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WorkspaceService {

    private WorkspaceRepository workspaceRepository;


    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository){
        this.workspaceRepository = workspaceRepository;
    }


    public List<Workspace> getWorkspaces(){
        return workspaceRepository.findAll();
    }


    public Workspace saveWorkspace(Workspace workspace){
        return workspaceRepository.save(workspace);
    }



}
