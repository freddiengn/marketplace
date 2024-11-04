package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.AdminUser;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, String> {
    AdminUser findByEmail(String email);
}
