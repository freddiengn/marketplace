package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleUserDto {
    private String aud;
    private String azp;
    private String email;
    private boolean emailVerified;
    private long exp;
    private String familyName;
    private String givenName;
    private long iat;
    private String iss;
    private String jti;
    private String name;
    private long nbf;
    private String picture;
    private String sub;
    private String username;
}