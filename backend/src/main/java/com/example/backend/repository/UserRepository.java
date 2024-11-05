package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserId(String userId);
    User findByEmail(String email);
    User findByUserName(String userName);
}
