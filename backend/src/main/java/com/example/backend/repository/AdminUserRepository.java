package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.User;

@Repository
public interface AdminUserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
