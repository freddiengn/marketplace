package com.example.backend.service;

import com.example.backend.dto.MessageDto;
import com.example.backend.entity.Message;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.response.MessageResponse;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public MessageResponse sendMessage(MessageDto messageDto) {
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

        User receiver = userRepository.findByUserId(messageDto.getReceiverId());
        if (receiver == null) {
            throw new RuntimeException("Receiver not found with userId: " + messageDto.getReceiverId());
        }

        Product product = productRepository.findById(messageDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Message message = new Message();
        message.setSender(user);
        message.setReceiver(receiver);
        message.setMessage(messageDto.getMessage());
        message.setTimestamp(new Date());
        message.setProduct(product);

        Message savedMessage = messageRepository.save(message);

        return mapToResponse(savedMessage);
    }

    public List<MessageResponse> getChatHistoryForBuyer(Long productId) {
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
        List<Message> messages = messageRepository.findBySenderUserIdAndProductProductIdOrReceiverUserIdAndProductProductId(user.getUserId(), productId, user.getUserId());

        return messages.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<MessageResponse> getChatHistoryForSeller(Long productId, String senderId) {
        List<Message> messages = messageRepository.findBySenderUserIdAndProductProductIdOrReceiverUserIdAndProductProductId(senderId, productId, senderId);

        return messages.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<MessageResponse> getSendersForProduct(Long productId) {
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
        List<Message> messages = messageRepository.findByProduct_ProductId(productId);

        return messages.stream()
                .map(message -> {
                    MessageResponse response = mapToResponse(message);
                    response.setSenderId(message.getSender().getUserId());
                    return response;
                })
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(
                                MessageResponse::getSenderId,
                                messageResponse -> messageResponse,
                                (existing, replacement) -> existing),
                        map -> new ArrayList<>(map.values())));
    }

    private MessageResponse mapToResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getSender().getUserId(),
                message.getSender().getUserName(),
                message.getReceiver().getUserId(),
                message.getReceiver().getUserName(),
                message.getMessage(),
                message.getTimestamp(),
                message.getProduct().getProductId(),
                message.getProduct().getTitle());
    }
}