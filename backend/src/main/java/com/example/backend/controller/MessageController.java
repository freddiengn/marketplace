package com.example.backend.controller;

import com.example.backend.dto.MessageDto;
import com.example.backend.response.MessageResponse;
import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // Endpoint to send a message
    @PostMapping("/send")
    public ResponseEntity<MessageResponse> sendMessage(@RequestBody MessageDto messageDto) {
        try {
            MessageResponse response = messageService.sendMessage(messageDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return bad request if an error occurs
        }
    }

    // Endpoint to get chat history for a buyer (user) based on productId
    @GetMapping("/history/buyer")
    public ResponseEntity<List<MessageResponse>> getChatHistoryForBuyer(
            @RequestParam Long productId) {
        try {
            List<MessageResponse> chatHistory = messageService.getChatHistoryForBuyer(productId);
            return ResponseEntity.ok(chatHistory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return bad request if an error occurs
        }
    }

    // Endpoint to get chat history for a seller (user) based on productId and senderId
    @GetMapping("/history/seller")
    public ResponseEntity<List<MessageResponse>> getChatHistoryForSeller(
            @RequestParam Long productId, 
            @RequestParam String senderId) {
        try {
            List<MessageResponse> chatHistory = messageService.getChatHistoryForSeller(productId, senderId);
            return ResponseEntity.ok(chatHistory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return bad request if an error occurs
        }
    }

    // Endpoint to get senders for a specific product based on productId
    @GetMapping("/senders")
    public ResponseEntity<List<MessageResponse>> getSendersForProduct(@RequestParam Long productId) {
        try {
            List<MessageResponse> senders = messageService.getSendersForProduct(productId);
            return ResponseEntity.ok(senders);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return bad request if an error occurs
        }
    }
}