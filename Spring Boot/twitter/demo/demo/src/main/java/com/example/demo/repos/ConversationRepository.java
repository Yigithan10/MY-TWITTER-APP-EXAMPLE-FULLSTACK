package com.example.demo.repos;

import com.example.demo.entities.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    Conversation findByUserIdAndToUserId(Long userId, Long toUserId);
    @Query(value="SELECT * FROM conversations WHERE user_id = ?1 OR to_user_id = ?1 ORDER BY conversation_last_date DESC, conversation_last_time DESC", nativeQuery = true)
    List<Conversation> findByUserIdOrToUserId(Long userId);

    List<Conversation> findByUserId(Long userId);
    List<Conversation> findByToUserId(Long toUserId);
}
