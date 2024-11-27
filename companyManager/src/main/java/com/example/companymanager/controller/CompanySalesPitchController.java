package com.example.companymanager.controller;


import com.example.companymanager.dto.CompanySalesPitchGenerateDTO;
import com.example.companymanager.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/workspace/{workspaceId}/company/salespitch")
public class CompanySalesPitchController {

    CompanyService companyService;

    @Autowired
    public CompanySalesPitchController(
            CompanyService companyService
    ){
        this.companyService = companyService;
    }


    @PostMapping
    public ResponseEntity<HashMap<String, Boolean>> generateSalesPitch(
            @RequestHeader("accountId") Long accountId,
            @PathVariable Long workspaceId,
            @RequestBody CompanySalesPitchGenerateDTO companySalesPitchGenerateDTO
    ) {
        HashMap<String, Boolean> result = new HashMap<>();
        result.put("Status", true);


        companySalesPitchGenerateDTO.setWorkspaceId(workspaceId);
        companySalesPitchGenerateDTO.setAccountId(accountId);

        companyService.putSalesPitchGenerationInMQ(companySalesPitchGenerateDTO);


        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }


}
