package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
      @Query("SELECT m FROM Message m WHERE (m.sender.userId = :senderId AND m.product.productId = :productId) OR (m.receiver.userId = :receiverId AND m.product.productId = :productId)")
    List<Message> findBySenderUserIdAndProductProductIdOrReceiverUserIdAndProductProductId(String senderId, Long productId, String receiverId);
    List<Message> findByReceiver_UserId(String receiverId);
    List<Message> findByProduct_ProductId(Long productId);
}