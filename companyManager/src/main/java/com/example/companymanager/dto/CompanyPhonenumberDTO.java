package com.example.companymanager.dto;

import lombok.*;

import java.util.ArrayList;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyPhonenumberDTO {


    private Long accountId;
    private Long workspaceId;
    private Long companyId;
    private ArrayList<String> phoneNumbers;


}
