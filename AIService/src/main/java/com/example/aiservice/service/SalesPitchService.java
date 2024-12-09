package com.example.aiservice.service;


import com.example.aiservice.entity.SalesPitch;
import com.example.aiservice.repository.SalesPitchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesPitchService {

    private final SalesPitchRepo salesPitchRepo;

    @Autowired
    public SalesPitchService(SalesPitchRepo salesPitchRepo){
        this.salesPitchRepo = salesPitchRepo;
    }


    public List<SalesPitch> getSalesPitchByCompanyId(Long companyId){
        return salesPitchRepo.findSalesPitchByCompanyId(companyId);
    }



}
