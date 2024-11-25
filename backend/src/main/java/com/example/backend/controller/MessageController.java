package com.example.backend.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Message;
import com.example.backend.dto.MessageDto;

@RestController
public class MessageController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/send/{to}")  // Sending message to 'to'
    public void sendMessage(@DestinationVariable String to, MessageDto messageDto) {
        System.out.println("Sending message: " + messageDto.getMessage() + " to: " + to);
        // Convert DTO to Message entity if necessary, or use DTO for sending
        Message message = new Message();
        message.setMessage(messageDto.getMessage());
        message.setSender(messageDto.getSender());
        message.setReceiver(messageDto.getReceiver());
        message.setCreatedAt(new Date());
        message.setUpdatedAt(new Date());
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
    }

    @MessageMapping("/chat/receive/{from}")  // Receiving message from 'from'
    public void receiveMessage(@DestinationVariable String from, Message message) {
        System.out.println("Received message: " + message.getMessage() + " from: " + from);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + from, message);
    }
}