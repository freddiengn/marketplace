package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySender_UserIdAndProduct_ProductId(String senderId, Long productId);

    List<Message> findByReceiver_UserId(String receiverId);
    List<Message> findByProduct_ProductId(Long productId);
}