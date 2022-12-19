package com.example.demo.responses;

import com.example.demo.entities.User;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private User user;
}
