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

        workspace.setOwningAccountId(accountId);

        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.saveWorkspace(workspace));
    }


    @GetMapping(path = "")
    public ResponseEntity<List<Workspace>> getWorkspaces(
            @RequestHeader("accountid") Long accountId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(workspaceService.getWorkspaceByOwnerId(accountId));
    }

    @GetMapping(path = "/:workspaceId")
    public ResponseEntity<Workspace> getWorkspaceById(@PathVariable Long workspaceId) {
        return ResponseEntity.status(HttpStatus.OK).body(workspaceService.getWorkspaceById(workspaceId));
    }


    @PutMapping("")
    public ResponseEntity<Workspace> updateWorkspace(
            @RequestHeader("accountid") Long accountId,
            @RequestBody Workspace workspace
    ) throws Exception {
        if (workspace.getOwningAccountId() == null) {
            throw new Exception("The account if of the owner of the workspace must be set!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.updateWorkspace(workspace));
    }


}
