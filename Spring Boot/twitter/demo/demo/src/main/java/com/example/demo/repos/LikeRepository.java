package com.example.demo.repos;

import com.example.demo.entities.Like;
import com.example.demo.entities.Tweet;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByTweetId(Long tweetId);
    List<Like> findByUserId(Long userId);

    Like findByTweetIdAndUserId(Long tweetId, Long userId);
    Like deleteByTweetIdAndUserId(Long tweetId, Long userId);
}
