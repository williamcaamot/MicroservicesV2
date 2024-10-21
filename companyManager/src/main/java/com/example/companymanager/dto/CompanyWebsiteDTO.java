package com.example.companymanager.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanyWebsiteDTO {
    private String companyWebsite;
    private int workspaceId;
    private Long accountId;

}
