package com.example.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Retrieve all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Find a user by ID
    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    }

    // Find a user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Find a user by username
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

       // Method to check if an email exists
    public boolean checkEmailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    // Method to check if a username exists
    public boolean checkUserNameExists(String username) {
        return userRepository.findByUserName(username) != null;
    }

    // Update an existing user
    public User updateUser(String userId, User updatedUser) {
        User existingUser = getUserById(userId);
        existingUser.setUserName(updatedUser.getUserName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setIsActive(updatedUser.getIsActive());
        existingUser.setUpdatedAt(new Date());
        // Update password if provided
        if (updatedUser.getHashPassword() != null && !updatedUser.getHashPassword().isEmpty()) {
            existingUser.setHashPassword(passwordEncoder.encode(updatedUser.getHashPassword()));
        }

        return userRepository.save(existingUser);
    }
}
