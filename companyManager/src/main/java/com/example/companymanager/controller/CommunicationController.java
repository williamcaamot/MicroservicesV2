package com.example.companymanager.controller;


import com.example.companymanager.entity.Message;
import com.example.companymanager.service.CommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/communication/{workspaceId}")
public class CommunicationController {

    private final CommunicationService communicationService;

    @Autowired
    public CommunicationController(CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @GetMapping
    public List<Message> getCommunicationsByWorkspaceId(
            @PathVariable Long workspaceId,
            @RequestHeader("accountid") Long accountId
    ) {
        return communicationService.getCommunicationsByWorkspaceId(workspaceId, accountId);
    }

    @GetMapping(path = "/company/{companyId}")
    public List<Message> getCommunicationsByCompanyId(
            @PathVariable Long workspaceId,
            @PathVariable Long companyId,
            @RequestHeader("accountid") Long accountId
    ) {
        return communicationService.getCommunicationsByCompanyId(workspaceId, accountId, companyId);
    }


    @GetMapping(path = "/company/{companyId}/communication/{communicationId}")
    public Message getCommunicationsById(
            @PathVariable Long workspaceId,
            @PathVariable Long companyId,
            @PathVariable Long communicationId,
            @RequestHeader("accountid") Long accountId
    ) {
        return communicationService.getCommunicationById(communicationId, workspaceId, accountId, companyId);
    }

    @PostMapping(path = "/company/{companyId}")
    public Message saveCommunucation(
            @PathVariable Long workspaceId,
            @PathVariable Long companyId,
            @RequestHeader("accountid") Long accountId,
            @RequestBody Message communication
    ){
        communication.setCompanyId(companyId);
        communication.setWorkspaceId(workspaceId);

        return communicationService.saveCommunication(communication, accountId);
    }

    @DeleteMapping(path = "/company/{companyId}/communication/{communicationId}")
    public void deleteCommunication(
            @PathVariable Long workspaceId,
            @PathVariable Long companyId,
            @PathVariable Long communicationId,
            @RequestHeader("accountid") Long accountId

    ){
        communicationService.deleteCommunication(workspaceId, communicationId, companyId, accountId);
    }
}
