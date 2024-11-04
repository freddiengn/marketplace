package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDto {
    private String email;
    private String password;

    public LoginUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public LoginUserDto setPassword(String password) {
        this.password = password;
        return this;
    }
}