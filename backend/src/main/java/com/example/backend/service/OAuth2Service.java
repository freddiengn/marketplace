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
    
        // Verify the ID token
        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken != null) {
            Payload payload = idToken.getPayload();
    
            // Extract user information and return it in a map
            Map<String, Object> userInfo = new HashMap<>();
    
            // Adding standard fields to the map
            userInfo.put("userId", payload.getSubject()); // User ID (sub)
            userInfo.put("email", payload.getEmail()); // User email
            userInfo.put("email_verified", payload.getEmailVerified()); // Email verified status
            userInfo.put("name", payload.get("name")); // Full name (may include both first and last name)
           
            // Extract Given and Family Name from the payload
            userInfo.put("given_name", payload.get("given_name")); // Given (first) name
            userInfo.put("family_name", payload.get("family_name")); // Family (last) name
            
            // Extract locale and picture
            userInfo.put("locale", payload.get("locale")); // Locale (language/region)
            userInfo.put("picture", payload.get("picture")); // Profile picture URL
            
            userInfo.put("iss", payload.getIssuer()); // Token issuer
            userInfo.put("aud", payload.getAudience()); // Audience (client ID)
            userInfo.put("iat", payload.getIssuedAtTimeSeconds()); // Issued at time
            userInfo.put("exp", payload.getExpirationTimeSeconds()); // Expiration time
            userInfo.put("nbf", payload.getNotBeforeTimeSeconds()); // Not before time
    
            // You can also extract any custom fields if present
            // For example, if you want to extract any additional custom claims:
            userInfo.put("custom_claim", payload.get("custom_claim_key")); // Replace with actual custom claim key if any
    
            return userInfo;
        } else {
            // If the token is invalid, throw an exception
            throw new IllegalArgumentException("Invalid ID token");
        }
    }

}