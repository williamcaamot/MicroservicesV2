package com.example.companymanager.dto;


import com.example.companymanager.entity.Company;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PutSalesPitchDTO {

    private Long accountId;
    private Long workspaceId;
    private Long companyId;

    private String workspaceProductDescription;

    private String companyName;

    List<String> aktivitet = new ArrayList<String>();

    private List<String> vedtektsfestetFormaal = new ArrayList<>();
}
