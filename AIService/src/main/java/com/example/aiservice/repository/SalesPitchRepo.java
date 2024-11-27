package com.example.aiservice.repository;

import com.example.aiservice.entity.SalesPitch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesPitchRepo extends JpaRepository<SalesPitch, Long> {
}
