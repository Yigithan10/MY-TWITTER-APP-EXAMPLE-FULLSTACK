package com.example.demo.requests;

import lombok.Data;

@Data
public class CommentCreateRequest {

    Long id;
    Long tweetId;
    Long userId;
    String text;
}
