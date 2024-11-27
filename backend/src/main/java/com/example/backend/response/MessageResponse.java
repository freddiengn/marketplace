package com.example.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Long id;
    private String senderId;
    private String senderName; // Add senderName field
    private String receiverId;
    private String receiverName; // Add receiverName field
    private String message;
    private Date timestamp;
    private Long productId; // Add productId field
    private String productTitle; // Add productTitle field
}