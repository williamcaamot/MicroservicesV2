package com.example.aiservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesPitch {

    @Id
    private Long id;

    private Long companyId;

    private Long workspaceId;

    private String salesPitch;

    private boolean isComplete;


}
