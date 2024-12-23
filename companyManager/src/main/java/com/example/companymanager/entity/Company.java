package com.example.companymanager.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @Column
    List<String> aktivitet = new ArrayList<String>();

    @Column
    List<String> vedtektsfestetFormaal = new ArrayList<String>();

    @Column
    String hjemmeside;

    @Column
    List<String> emailAddresses = new ArrayList<>();

    @Column
    List<String> phonenumbers = new ArrayList<>();

}
