package com.example.companymanager.repository;


import com.example.companymanager.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {


    public List<Workspace> getWorkspaceByOwningAccountId(Long id);

}
