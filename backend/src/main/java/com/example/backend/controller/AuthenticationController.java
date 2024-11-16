package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.response.UserResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.OAuth2Service;
import com.example.backend.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    @Autowired 
    private OAuth2Service oAuth2Service;

    @Autowired 
    private AuthenticationService authenticationService;

    @Autowired 
    private UserService userService;

    @PostMapping("/google")
    public ResponseEntity<UserResponse> handleGoogleLogin(
            @RequestBody Map<String, String> requestBody,
            HttpServletResponse response) {

        String credential = requestBody.get("credential");
        if (credential == null || credential.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        try {
            // Decode the Google ID token using the service
            Map<String, Object> userInfo = oAuth2Service.decode(credential);
            String email = (String) userInfo.get("email");

            // Handle user login or registration
            UserResponse userResponse = userService.getUserByEmail(email);

            // Create an HTTP-only cookie with the credential token
            ResponseCookie cookie = ResponseCookie.from("auth_token", credential)
                .httpOnly(true)
                .secure(true) // Use true if your app runs over HTTPS
                .sameSite("Strict") // CSRF protection
                .path("/") // Cookie is available across the whole app
                .maxAge(24 * 60 * 60) // 1 day expiry
                .build();

            // Add the cookie to the response headers
            response.addHeader("Set-Cookie", cookie.toString());

            return ResponseEntity.ok(userResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterUserDto registerUserDto) throws Exception {
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