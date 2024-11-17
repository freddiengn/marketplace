package com.example.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class OAuth2Service {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    public Map<String, Object> decode(String credential) throws Exception {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            // Extract user information and return it in a map
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("userId", payload.getSubject());
            userInfo.put("email", payload.getEmail());
            userInfo.put("name", payload.get("name"));

            return userInfo;
        } else {
            throw new IllegalArgumentException("Invalid ID token");
        }
    }

}