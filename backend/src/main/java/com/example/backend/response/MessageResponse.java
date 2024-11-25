package com.example.backend.response;

import java.util.Date;

import com.example.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Long chat_Id;
    private String message;
    private Date createdAt;
    private Date updatedAt;
    private User receiver;
    private User sender;
}
