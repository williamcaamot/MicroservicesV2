package com.example.authentication.entity;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AuditEntityListener {
    private static final String ACCOUNT_ID_HEADER = "accountid";

    @Autowired
    private HttpServletRequest request;

    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setCreatedBy(getCurrentUsername());
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setUpdatedBy(getCurrentUsername());
    }

    private String getCurrentUsername() {
        String accountId = request.getHeader(ACCOUNT_ID_HEADER);
        return accountId != null ? accountId : "system";
    }
}
