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
public class WorkspaceController {


    private WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping(path = "")
    public ResponseEntity<Workspace> saveWorkspace(
            @RequestHeader("accountid") Long accountId,
            @RequestBody Workspace workspace) {
        System.out.println(accountId);
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.saveWorkspace(workspace));
    }


    @GetMapping(path = "")
    public ResponseEntity<List<Workspace>> getWorkspaces(
            @RequestHeader("accountid") Long accountId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(workspaceService.getWorkspaces());
    }

}
