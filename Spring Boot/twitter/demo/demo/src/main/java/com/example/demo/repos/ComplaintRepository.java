package com.example.demo.repos;

import com.example.demo.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByTweetId(Long tweetId);
    List<Complaint> findByUserId(Long userId);
    Complaint findByTweetIdAndUserId(Long tweetId, Long userId);
}
