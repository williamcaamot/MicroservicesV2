package com.example.companymanager.repository;

import com.example.companymanager.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunicationRepository extends JpaRepository<Message, Long> {

    public List<Message> getCommunicationByCompanyId(Long companyId);

    public List<Message> getCommunicationByWorkspaceId(Long workspaceId);

}
