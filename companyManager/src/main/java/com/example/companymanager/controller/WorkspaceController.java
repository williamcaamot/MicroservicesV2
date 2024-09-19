package com.example.companymanager.controller;

import com.example.companymanager.entity.Workspace;
import com.example.companymanager.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/workspace")
@CrossOrigin(origins = "*") // Enable CORS for this controller from any origin
public class WorkspaceController {


    private WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
        System.out.println("Lol");
    }

    @PostMapping(path = "")
    public ResponseEntity<Workspace> saveWorkspace(@RequestBody Workspace workspace) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.saveWorkspace(workspace));

    }

    @GetMapping(path = "")
    public ResponseEntity<List<Workspace>> getWorkspaces() {
        return ResponseEntity.status(HttpStatus.OK).body(workspaceService.getWorkspaces());
    }





}
