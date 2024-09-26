package com.example.authentication.dto;


import lombok.Data;

@Data
public class AccountDTO {

    private Long accountId;

    private String username;

    private String email;
}
