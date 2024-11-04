package com.example.backend.dto;


import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userId;
    private String fullName;
    private String email;
    private Boolean isActive;
    private Date createdAt;
    private Date updatedAt;
    
}
