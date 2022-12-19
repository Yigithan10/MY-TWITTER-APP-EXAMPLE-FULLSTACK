package com.example.demo.repos;

import com.example.demo.entities.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
    List<Tweet> findByUserId(Long userId);
    List<Tweet> findByRetweetUserId(Long retweetUserId);

    List<Tweet> findByRetweetId(Long retweetId);
    Tweet findByUserIdAndRetweetUserIdAndRetweetId(Long userId, Long retweetUserId, Long retweetId);
}
