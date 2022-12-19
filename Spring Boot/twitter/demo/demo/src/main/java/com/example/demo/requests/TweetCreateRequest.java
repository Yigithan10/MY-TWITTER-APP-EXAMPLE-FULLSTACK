package com.example.demo.requests;

import com.example.demo.entities.Like;
import com.example.demo.repos.LikeRepository;
import com.example.demo.services.LikeService;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
public class TweetCreateRequest {

    Long id;
    String title;
    String text;
    Long userId;
    Long retweetUserId;
}
