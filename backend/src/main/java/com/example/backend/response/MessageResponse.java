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
    private String senderName; 
    private String receiverId;
    private String receiverName; 
    private String message;
    private Date timestamp;
    private Long productId;
    private String productTitle; 
}