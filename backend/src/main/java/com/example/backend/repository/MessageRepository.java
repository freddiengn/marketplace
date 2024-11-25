package com.example.backend.repository;

import java.util.List;
import com.example.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByReceiverUserId(String userId); //The one who made the post etc.,
    List<Message> findChatsCreatedBySenderUserId(String userId); //The active user's chats
}
