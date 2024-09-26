package com.example.authentication.controller;

import com.example.authentication.dto.AccountDTO;
import com.example.authentication.entity.Account;
import com.example.authentication.mapper.AccountMapper;
import com.example.authentication.repository.AccountRepository;
import com.example.authentication.utility.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private AccountRepository accountRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(AccountRepository accountRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtUtil jwtUtil){
        this.accountRepository = accountRepository;
        this.passwordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Account account, HttpServletResponse response) {
        if (accountRepository.findByUsername(account.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        account.setPassword(passwordEncoder.encode(account.getPassword()));
        Account savedAccount = accountRepository.save(account);

        String token = jwtUtil.generateToken(account.getUsername());

        // Set the JWT as a cookie
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true); // Make it HTTP-only
        cookie.setPath("/"); // Cookie is available across the entire site
        cookie.setMaxAge(60 * 60 * 10); // Cookie expires in 10 hours
        response.addCookie(cookie); // Add cookie to response

        AccountDTO savedAccountDTO = AccountMapper.mapToAccountDTO(savedAccount, new AccountDTO());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccountDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Account account, HttpServletResponse response) {
        Optional<Account> dbAccount = accountRepository.findByUsername(account.getUsername());
        if (dbAccount.isPresent() && passwordEncoder.matches(account.getPassword(), dbAccount.get().getPassword())) {
            String token = jwtUtil.generateToken(account.getUsername());

            // Set the JWT as a cookie
            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true); // Make it HTTP-only
            cookie.setPath("/"); // Cookie is available across the entire site
            cookie.setMaxAge(60 * 60 * 10); // Cookie expires in 10 hours
            response.addCookie(cookie); // Add cookie to response

            AccountDTO accountDTO = AccountMapper.mapToAccountDTO(dbAccount.get(), new AccountDTO());

            return ResponseEntity.status(HttpStatus.OK).body(accountDTO);
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }

    @PostMapping(path = "/signout")
    public ResponseEntity<?> signout(HttpServletResponse response){
        System.out.println("Signing out");
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true); // Make it HTTP-only
        cookie.setPath("/"); // Cookie is available across the entire site
        cookie.setMaxAge(60); // Cookie expires in 10 hours
        response.addCookie(cookie); // Add cookie to response

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    @GetMapping("/account")
    public ResponseEntity<AccountDTO> getAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the authentication is valid
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String username = authentication.getName(); // Get username from the authentication token
        System.out.println(username);

        // Fetch the account from the database using the username
        Optional<Account> account = accountRepository.findByUsername(username);

        if (account.isPresent()) {
            AccountDTO accountDTO = AccountMapper.mapToAccountDTO(account.get(), new AccountDTO());
            return ResponseEntity.status(HttpStatus.OK).body(accountDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
