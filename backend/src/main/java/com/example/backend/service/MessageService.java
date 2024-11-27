package com.example.backend.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Message;
import com.example.backend.entity.User;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.MessageResponse;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<MessageResponse> getAllMessages(String userId) {
        List<Message> messages = messageRepository.findChatsCreatedBySenderUserId(userId);
        return messages.stream()
            .map(this::convertToMessageResponse)
            .collect(Collectors.toList());
    }

    public List<MessageResponse> getReceiverMessages(String receiverId) {
        List<Message> messages = messageRepository.findByReceiverUserId(receiverId);
        return messages.stream()
            .map(this::convertToMessageResponse)
            .collect(Collectors.toList());
    }

    private MessageResponse convertToMessageResponse(Message message) {
        if (message == null) {
            return null;
        }
        return new MessageResponse(
                message.getChatId(),
                message.getMessage(),
                message.getCreatedAt(),
                message.getUpdatedAt(),
                message.getReceiver().getUserName(),
                message.getSender().getUserName()
        );
    }

    public MessageResponse createMessage (MessageDto messageDto)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
    
        if (authentication != null && authentication.getPrincipal() != null) {
            userEmail = (String) authentication.getPrincipal(); 
        }
    
        if (userEmail == null) {
            throw new RuntimeException("No authenticated user found.");
        }
    
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + userEmail);
        }
        Message message = new Message();
        message.setMessage(messageDto.getMessage());//ProductResponse createdProduct = productService.createProduct(productDto);
        message.setSender(user);
        message.setReceiver(userRepository.findByUserId(messageDto.getReceiver()));
        message.setCreatedAt(new Date());
        message.setUpdatedAt(new Date());

        Message savedMessage = messageRepository.save(message);

        return convertToMessageResponse(savedMessage);
    }

    public List<MessageResponse> getCurrentUsersChats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
    
        if (authentication != null && authentication.getPrincipal() != null) {
            userEmail = (String) authentication.getPrincipal(); 
        }
    
        if (userEmail == null) {
            throw new RuntimeException("No authenticated user found.");
        }
    
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + userEmail);
        }
        List <Message> userMessages = messageRepository.findChatsCreatedBySenderUserId(user.getUserId());
        return userMessages.stream().map(this::convertToMessageResponse).collect(Collectors.toList());
    }
}
