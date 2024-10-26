package com.example.webscraperservicev2.dto;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetAndSaveEmailsDTO {

    private Long accountId;
    private Long workspaceId;
    private Long companyId;
    private String website;


}