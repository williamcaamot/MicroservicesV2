package com.example.companymanager.dto;


import lombok.*;

import java.util.ArrayList;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyEmailDTO {

    private Long accountId;
    private Long workspaceId;
    private Long companyId;
    private ArrayList<String> emails;
}
