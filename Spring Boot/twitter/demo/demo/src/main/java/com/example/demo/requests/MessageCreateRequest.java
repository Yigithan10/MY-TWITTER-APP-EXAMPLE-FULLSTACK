package com.example.demo.requests;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class MessageCreateRequest {
    Long id;
    Long userId;
    Long toUserId;
    String message;
}
