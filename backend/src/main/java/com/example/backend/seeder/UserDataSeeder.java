package com.example.backend.seeder;


import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.GenerateUtils;

@Component
@Configuration
public class UserDataSeeder {

    private static final Logger logger = LoggerFactory.getLogger(UserDataSeeder.class);

    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) { // Prevent duplicate entries

                // Create an employee user
                User user = new User();
                user.setUserId(GenerateUtils.generateUUID());
                user.setUserName("nguyenvana");
                user.setEmail("nguyenvana@gmail.com");
                user.setHashPassword(passwordEncoder.encode("Abc12356@!")); 
                user.setIsActive(true);
                user.setCreatedAt(new Date());
                user.setUpdatedAt(new Date());
                // Save users to the database
                userRepository.save(user);

                logger.info("Users seeded successfully!");
            }
        };
    }
}