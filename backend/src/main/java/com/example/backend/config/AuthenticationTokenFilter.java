package com.example.backend.config;


import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.example.backend.service.OAuth2Service;

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
                // Decode the token and authenticate the user
                Map<String, Object> userInfo = oAuth2Service.decode(token);
                String email = (String) userInfo.get("email");

                // Create an authentication token
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, List.of());

                ((AbstractAuthenticationToken) authentication).setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // Handle invalid token or authentication failure
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }
}