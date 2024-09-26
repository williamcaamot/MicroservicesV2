package com.example.authentication.controller;

import com.example.authentication.entity.Account;
import com.example.authentication.repository.AccountRepository;
import com.example.authentication.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*") // Enable CORS for this controller from any origin
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
    public ResponseEntity<?> registerUser(@RequestBody Account account) {
        System.out.println("Trying to register");
        if (accountRepository.findByUsername(account.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountRepository.save(account);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Account account) {
        Optional<Account> dbAccount = accountRepository.findByUsername(account.getUsername());
        if (dbAccount.isPresent() && passwordEncoder.matches(account.getPassword(), dbAccount.get().getPassword())) {
            String token = jwtUtil.generateToken(account.getUsername());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.badRequest().body("Invalid username or password");
    }

}
