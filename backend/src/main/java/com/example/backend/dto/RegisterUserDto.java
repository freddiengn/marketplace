package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private String email;
    private String password;
    private String fullName;

    public RegisterUserDto setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }


}