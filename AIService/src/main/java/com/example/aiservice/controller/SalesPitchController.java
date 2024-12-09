package com.example.aiservice.controller;


import com.example.aiservice.entity.SalesPitch;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/salespitch/{workspaceId}/company/salespitch")
public class SalesPitchController {



    @GetMapping
    public ResponseEntity<List<SalesPitch>> getSalesPitches(){
        ArrayList<SalesPitch> result = new ArrayList<>();





        return ResponseEntity.status(HttpStatus.OK).body(result);
    }




}
