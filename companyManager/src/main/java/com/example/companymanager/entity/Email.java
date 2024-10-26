package com.example.companymanager.entity;

import jakarta.persistence.Column;
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
public class Email extends BaseEntity{
    @Id
    private Long emailId;

    @Column
    private Long companyId;

    @Column
    private String emailAddress;
}
