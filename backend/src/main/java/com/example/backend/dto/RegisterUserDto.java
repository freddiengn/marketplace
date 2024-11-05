package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private String userName;
    private String email;
    private String password;

    public RegisterUserDto setUserName(String userName) {
        this.userName = userName;
        return this;
    }
}