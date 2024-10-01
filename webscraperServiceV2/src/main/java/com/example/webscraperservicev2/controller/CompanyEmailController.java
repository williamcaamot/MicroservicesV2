package com.example.webscraperservicev2.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping(path = "/api/v1/webscraper/companyemail")
public class CompanyEmailController {

    @GetMapping
    public ResponseEntity<ArrayList<String>> getEmail(){
        return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>(Arrays.asList("Test", "test")));


    }

}
