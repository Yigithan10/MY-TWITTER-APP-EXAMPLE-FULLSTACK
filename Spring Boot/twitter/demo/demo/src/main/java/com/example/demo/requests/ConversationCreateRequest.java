package com.example.demo.requests;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ConversationCreateRequest {
    Long id;
    Long userId;
    Long toUserId;
    String message;
    LocalTime localTime;
    LocalDate localDate;
}
