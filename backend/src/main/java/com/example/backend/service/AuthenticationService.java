package com.example.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.LoginUserDto;
import com.example.backend.dto.RegisterUserDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.AdminUser;
import com.example.backend.repository.AdminUserRepository;
import com.example.backend.util.GenerateUtils;
import com.example.backend.entity.AdminUser;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {
    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        AdminUserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   public AdminUser authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        AdminUser user = userRepository.findByEmail(input.getEmail());
        return user;
    }

    public AdminUser signup(RegisterUserDto input) {
        AdminUser user = new AdminUser();
        user.setUserId(GenerateUtils.generateUUID());
        user.setFullName(input.getFullName());
        user.setEmail(input.getEmail());
        user.setHashPassword(passwordEncoder.encode(input.getPassword()));
        user.setIsActive(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        return userRepository.save(user);
    }

    public List<UserDto> allUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserDto)
                .collect(Collectors.toList());
    }

    private UserDto convertToUserDto(AdminUser user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setIsActive(user.getIsActive());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        return userDto;
    }
}
