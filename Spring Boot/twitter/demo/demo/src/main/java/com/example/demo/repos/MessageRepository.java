package com.example.demo.repos;

import com.example.demo.entities.Conversation;
import com.example.demo.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findByUserIdAndToUserId(Long userId, Long toUserId);

    List<Message> findByConversationId(Long conversationId);

    List<Message> findByUserId(Long userId);
    List<Message> findByToUserId(Long toUserId);
}
