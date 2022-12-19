package com.example.demo.requests;

import lombok.Data;

@Data
public class ComplaintCreateRequest {

    Long id;
    Long tweetId;
    Long userId;
}
