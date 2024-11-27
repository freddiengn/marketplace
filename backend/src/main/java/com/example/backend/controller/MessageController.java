package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.response.MessageResponse;
import com.example.backend.service.MessageService;
import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Message;

@RestController
public class MessageController {
    private final MessageService messageService;
    
    public MessageController(MessageService messageService)
    {
        this.messageService = messageService;
    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/send/{userName}")  //We use this method to send a message to the userName 
    public void sendMessage(@DestinationVariable String userName, MessageDto messageDto) {        
        MessageResponse message = messageService.createMessage(messageDto);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + userName, message);
    }

    @MessageMapping("/chat/receive/{userName}")  // Receiving message from 
    public void receiveMessage(@DestinationVariable String userName, Message message) {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + userName, message);
    }

    @GetMapping("/user")
    public ResponseEntity<List<MessageResponse>> getAllChats()
    {
        List<MessageResponse> messages = messageService.getCurrentUsersChats();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
