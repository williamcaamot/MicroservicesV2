package com.example.aiservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SalesPitch extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salespitch_id")
    private Long salesPitchId;


    private Long companyId;


    private Long workspaceId;

    @Column(length = 20480)
    private String salesPitch;

    @Column(length = 20480)
    private String prompt;

    private boolean isComplete;


}
