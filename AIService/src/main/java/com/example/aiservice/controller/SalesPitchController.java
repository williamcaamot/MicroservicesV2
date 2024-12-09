package com.example.aiservice.controller;


import com.example.aiservice.entity.SalesPitch;
import com.example.aiservice.service.SalesPitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/salespitch/{workspaceId}/company/{companyId}")
public class SalesPitchController {

    private final SalesPitchService salesPitchService;

    @Autowired
    public SalesPitchController(SalesPitchService salesPitchService){
        this.salesPitchService = salesPitchService;
    }


    @GetMapping
    public ResponseEntity<List<SalesPitch>> getSalesPitches(
            @RequestHeader("accountId") Long accountId,
            @PathVariable Long workspaceId,
            @PathVariable Long companyId
    ){
        ArrayList<SalesPitch> result = new ArrayList<>();
        result = (ArrayList<SalesPitch>) salesPitchService.getSalesPitchByCompanyId(companyId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
