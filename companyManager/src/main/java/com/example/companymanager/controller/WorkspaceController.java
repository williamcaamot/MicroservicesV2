package com.example.companymanager.controller;

import com.example.companymanager.entity.Workspace;
import com.example.companymanager.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@CrossOrigin(origins = "*") // Enable CORS for this controller from any origin
public class WorkspaceController {


    private WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
        System.out.println("Lol");
    }

    @PostMapping("/api/v1/workspace")
    public ResponseEntity<Workspace> saveWorkspace(@RequestBody Workspace workspace) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.saveWorkspace(workspace));

    }

    @GetMapping(path = "/api/v1/workspace")
    public ResponseEntity<List<Workspace>> getWorkspaces() {
        return ResponseEntity.status(HttpStatus.OK).body(workspaceService.getWorkspaces());
    }


}
