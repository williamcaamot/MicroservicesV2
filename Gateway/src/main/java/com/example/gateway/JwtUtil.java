package com.example.gateway;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Use a proper secure key that is at least 64 characters long (512 bits)
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("1mRPuAinUyeBUIsv2UmFHZynJhUiTMb4D5CJwD7FlrJ0tAoUCnqe7zmY7tmzcJLUFH5sxjbfvrse5LuBzgqWOI3j1MxjycYS5qs".getBytes());

    // Generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)  // Use the SecretKey with HS512
                .compact();
    }

    // Extract username from the token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Validate the token
    public boolean isTokenValid(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);

            String username = claimsJws.getBody().getSubject();
            return (username != null && !isTokenExpired(token));
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Something went wrong");
            // Handle invalid token case (could be expired or tampered with)
            return false;
        }
    }

    // Check if the token has expired
    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
