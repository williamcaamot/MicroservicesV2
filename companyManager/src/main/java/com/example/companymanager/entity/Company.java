package com.example.companymanager.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String organisasjonsnummer;

    @Column
    private String navn;

    @Column
    private Long workspaceId;

}
