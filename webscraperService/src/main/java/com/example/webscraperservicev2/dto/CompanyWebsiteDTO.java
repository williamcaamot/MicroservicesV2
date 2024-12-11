package com.example.webscraperservicev2.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyWebsiteDTO {


    private String companyWebsite;
    private Long workspaceId;
    private Long companyId;

}
