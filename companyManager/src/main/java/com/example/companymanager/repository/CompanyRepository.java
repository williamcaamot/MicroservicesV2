package com.example.companymanager.repository;

import com.example.companymanager.entity.Company;
import com.example.companymanager.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    public List<Company> getCompaniesByWorkspaceId(Long workspaceId);

}
