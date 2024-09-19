package com.example.companymanager.entity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public class BaseEntity {

    @Column(updatable = false)
    private LocalDateTime createdAt;
    @Column(updatable = false)
    private String createdBy;

    @Column(insertable = false)
    private LocalDateTime updatedAt;

    @Column(insertable = false)
    private String updatedBy;

}
