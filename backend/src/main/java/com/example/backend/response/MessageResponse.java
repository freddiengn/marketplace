package com.example.backend.response;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private Long chat_Id; // The unique Id for the chat message
    private String message; // The actual message
    private Date createdAt; // Just for data purposes
    private Date updatedAt; // Just for data purposes
    private String receiver; // To find the receiving end
    private String sender; // To find the sender
}
