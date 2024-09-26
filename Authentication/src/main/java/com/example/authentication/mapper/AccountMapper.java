package com.example.authentication.mapper;

import com.example.authentication.dto.AccountDTO;
import com.example.authentication.entity.Account;

public class AccountMapper {

    public static AccountDTO mapToAccountDTO(Account account, AccountDTO accountDTO){
        accountDTO.setAccountId(account.getAccountId());
        accountDTO.setUsername(account.getUsername());
        accountDTO.setEmail(account.getEmail());


        return accountDTO;
    }


}
