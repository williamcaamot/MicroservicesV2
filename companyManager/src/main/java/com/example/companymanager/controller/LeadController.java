package com.example.companymanager.controller;


import com.example.companymanager.service.RabbitMQService;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/workspace/{workspaceId}/lead")
public class LeadController {

    private final RabbitMQService rabbitMQService;

    @Autowired
    public LeadController(RabbitMQService rabbitMQService){
        this.rabbitMQService = rabbitMQService;
    }


    @PostMapping
    public ResponseEntity<Null> generateLead(){

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


}
