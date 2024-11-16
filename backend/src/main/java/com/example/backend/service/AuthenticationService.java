package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired; // Import for field-based injection

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.UserResponse;
import com.example.backend.util.GenerateUtils;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired 
    private OAuth2Service oAuth2Service;

    public UserResponse signup(RegisterUserDto input) throws Exception {
        Map<String, Object> decodedInfo = oAuth2Service.decode(input.getCredential());
        String email = (String) decodedInfo.get("email");
        if (userRepository.findByUserName(input.getUserName()) != null) {
            throw new IllegalArgumentException("A user with this userName already exists.");
        }

        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("A user with this email already exists.");
        }

        User user = new User();
        user.setUserId(GenerateUtils.generateUUID());
        user.setUserName(input.getUserName());
        user.setEmail(email);
        user.setIsActive(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        User savedUser = userRepository.save(user);
        return convertToUserResponse(savedUser);
    }

    public List<UserResponse> allUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    private UserResponse convertToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(user.getUserId());
        userResponse.setUserName(user.getUserName());
        userResponse.setEmail(user.getEmail());
        userResponse.setIsActive(user.getIsActive());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }
}