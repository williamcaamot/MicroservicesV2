package com.example.companymanager.repository;

import com.example.companymanager.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailRepository extends JpaRepository<Email, Long> {

    public List<Email> findByCompanyId(Long companyId);
}
