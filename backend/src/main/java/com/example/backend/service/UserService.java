package com.example.backend.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.UserResponse;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        return convertToUserResponse(user);
    }

    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return convertToUserResponse(user);
    }

    public UserResponse getUserByUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        return convertToUserResponse(user);
    }

    public boolean checkEmailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public boolean checkUserNameExists(String username) {
        return userRepository.findByUserName(username) != null;
    }

    public UserResponse updateUser(String userId, User updatedUser) {
        User existingUser = userRepository.findByUserId(userId);
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setIsActive(updatedUser.getIsActive());
        existingUser.setUpdatedAt(new Date());

        User savedUser = userRepository.save(existingUser);
        return convertToUserResponse(savedUser);
    }

    private UserResponse convertToUserResponse(User user) {
        if (user == null) {
            return null; 
        }

        return new UserResponse(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getIsActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
