package com.example.companymanager.repository;

import com.example.companymanager.entity.Communication;
import com.example.companymanager.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Long> {

    public List<Communication> getCommunicationByCompanyId(Long companyId);

    public List<Communication> getCommunicationByWorkspaceId(Long workspaceId);

}
