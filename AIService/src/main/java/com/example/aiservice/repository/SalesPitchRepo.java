package com.example.aiservice.repository;

import com.example.aiservice.entity.SalesPitch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesPitchRepo extends JpaRepository<SalesPitch, Long> {
    public List<SalesPitch> findSalesPitchByCompanyId(Long companyId);
}
