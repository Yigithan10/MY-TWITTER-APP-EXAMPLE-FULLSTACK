package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.requests.AuthRequest;
import com.example.demo.responses.AuthResponse;
import com.example.demo.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<User> registerOneUser(@RequestBody User user){
        return authService.registerOneUser(user);
    }

    @PostMapping("/login")
    @ResponseBody
    public AuthResponse loginOneUser(@RequestBody AuthRequest authRequest){
        return authService.loginOneUser(authRequest);
    }

    @PostMapping("/parser/{token}")
    public ResponseEntity<User> parserToken(@PathVariable String token){
        return AuthService.parserToken(token);
    }
}
