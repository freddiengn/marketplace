package com.example.backend.controller;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginUserDto;
import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.AdminUser;
import com.example.backend.response.LoginResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.JwtService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        // Authenticate the user
        AdminUser authenticatedUser = authenticationService.authenticate(loginUserDto);
    
        // Get roles as a list of strings
        List<String> roleIds = authenticatedUser.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority) 
        .collect(Collectors.toList());

    
        // Generate JWT token with roles
        String jwtToken = jwtService.generateToken(authenticatedUser, roleIds);
    
        // Create response with token and expiration time
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());
    
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/signup")
    public ResponseEntity<AdminUser> register(@RequestBody RegisterUserDto registerUserDto) {
        AdminUser registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }
}