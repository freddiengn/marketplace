package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.LoginUserDto;
import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.User;
import com.example.backend.response.LoginResponse;
import com.example.backend.response.UserResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        // Authenticate the user
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
    
        // Generate JWT token with roles
        String jwtToken = jwtService.generateToken(authenticatedUser);
    
        // Create response with token and expiration time
        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());
    
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/signup")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterUserDto registerUserDto) {
        UserResponse registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    // Endpoint to check if email exists
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable String email) {
        boolean exists = userService.checkEmailExists(email);
        return ResponseEntity.ok(exists);
    }

    // Endpoint to check if username exists
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> userNameExists(@PathVariable String username) {
        boolean exists = userService.checkUserNameExists(username);
        return ResponseEntity.ok(exists);
    }
}