package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.entity.Message;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.MessageResponse;

@Service
public class MessageService {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

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

    private List<MessageResponse> getReceiverMessages(String receiverId) {
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
                message.getSender(),
                message.getReceiver()
        );
    }
}