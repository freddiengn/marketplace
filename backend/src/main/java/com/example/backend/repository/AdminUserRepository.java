package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import com.example.backend.entity.User;

@Repository
public interface AdminUserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
=======
<<<<<<< HEAD
import com.example.backend.entity.AdminUser;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, String> {
    AdminUser findByEmail(String email);
=======
import com.example.backend.entity.User;

@Repository
public interface AdminUserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
>>>>>>> origin/main
>>>>>>> origin/main
}
