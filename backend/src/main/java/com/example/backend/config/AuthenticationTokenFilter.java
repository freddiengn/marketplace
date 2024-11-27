package com.example.backend.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.example.backend.service.OAuth2Service;
import com.example.backend.dto.GoogleUserDto;

public class AuthenticationTokenFilter extends OncePerRequestFilter {
    private final OAuth2Service oAuth2Service;

    public AuthenticationTokenFilter(OAuth2Service oAuth2Service) {
        this.oAuth2Service = oAuth2Service;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Extract token from cookie
        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("auth_token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null) {
            try {
                // Decode the token and create googleUserDto object
                Map<String, Object> userInfo = oAuth2Service.decode(token);
        
                // Map decoded information to googleUserDto
                GoogleUserDto googleUserDto = new GoogleUserDto();
                googleUserDto.setAud((String) userInfo.get("aud"));
                googleUserDto.setAzp((String) userInfo.get("azp"));
                googleUserDto.setEmail((String) userInfo.get("email"));
                googleUserDto.setEmailVerified((Boolean) userInfo.get("email_verified"));
                googleUserDto.setExp((Long) userInfo.get("exp"));
                googleUserDto.setFamilyName((String) userInfo.get("family_name"));
                googleUserDto.setGivenName((String) userInfo.get("given_name"));
                googleUserDto.setIat((Long) userInfo.get("iat"));
                googleUserDto.setIss((String) userInfo.get("iss"));
                googleUserDto.setJti((String) userInfo.get("jti"));
                googleUserDto.setName((String) userInfo.get("name"));
                googleUserDto.setNbf((Long) userInfo.get("nbf"));
                googleUserDto.setPicture((String) userInfo.get("picture"));
                googleUserDto.setSub((String) userInfo.get("sub"));
                googleUserDto.setUsername((String) userInfo.get("username"));
                // Create an authentication token using the email and googleUserDto
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        googleUserDto.getEmail(), null, List.of());
                
                // Set additional details (googleUserDto) in authentication
                ((AbstractAuthenticationToken) authentication).setDetails(googleUserDto);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // Handle invalid token or authentication failure
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}