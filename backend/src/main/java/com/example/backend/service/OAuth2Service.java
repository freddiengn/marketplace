package com.example.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.json.gson.GsonFactory;

import io.github.cdimascio.dotenv.Dotenv;

import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class OAuth2Service {


    public Map<String, Object> decode(String credential) throws Exception {
        Dotenv dotenv = Dotenv.configure().directory("backend").load();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(dotenv.get("SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_ID")))
                .build();
    
        // Verify the ID token
        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken != null) {
            Payload payload = idToken.getPayload();
    
            Map<String, Object> userInfo = new HashMap<>();
    
            userInfo.put("userId", payload.getSubject()); 
            userInfo.put("email", payload.getEmail()); 
            userInfo.put("email_verified", payload.getEmailVerified()); 
            userInfo.put("name", payload.get("name")); 
           
            userInfo.put("given_name", payload.get("given_name"));
            userInfo.put("family_name", payload.get("family_name")); 
            
            userInfo.put("locale", payload.get("locale")); 
            userInfo.put("picture", payload.get("picture"));
            
            userInfo.put("iss", payload.getIssuer()); 
            userInfo.put("aud", payload.getAudience());
            userInfo.put("iat", payload.getIssuedAtTimeSeconds()); 
            userInfo.put("exp", payload.getExpirationTimeSeconds()); 
            userInfo.put("nbf", payload.getNotBeforeTimeSeconds());
    
            userInfo.put("custom_claim", payload.get("custom_claim_key"));
    
            return userInfo;
        } else {
            throw new IllegalArgumentException("Invalid ID token");
        }
    }

}