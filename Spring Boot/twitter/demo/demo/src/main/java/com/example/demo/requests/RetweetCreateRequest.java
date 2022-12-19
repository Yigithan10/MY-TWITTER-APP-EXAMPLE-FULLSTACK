package com.example.demo.requests;

import lombok.Data;

@Data
public class RetweetCreateRequest {
    Long id;
    String title;
    String text;
    Long userId;
    Long retweetUserId;
    Long retweetId;
}