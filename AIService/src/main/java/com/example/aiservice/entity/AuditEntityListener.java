package com.example.aiservice.entity;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AuditEntityListener {

    private static final ThreadLocal<String> currentUser = new ThreadLocal<>();

    public static void setCurrentUser(String username) {
        currentUser.set(username);
    }

    public static void clear() {
        currentUser.remove();
    }

    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setCreatedBy(currentUser.get() != null ? currentUser.get() : "system");
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setUpdatedBy(currentUser.get() != null ? currentUser.get() : "system");
    }
}
