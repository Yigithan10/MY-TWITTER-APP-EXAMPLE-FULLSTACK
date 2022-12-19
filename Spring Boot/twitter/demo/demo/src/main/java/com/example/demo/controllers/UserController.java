package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.requests.UserImagePathRequest;
import com.example.demo.services.UserService;
import org.jboss.jandex.Main;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    public List<User> allUsers = new ArrayList<>();
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        allUsers.clear();
        allUsers.addAll(userService.getAllUsers());
        return userService.getAllUsers();
    }

    @PostMapping("/uploadImage/{userId}")
    public ResponseEntity<User> setOneUserImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file){
        return userService.setOneUserImage(userId, file);
    }

    @GetMapping("/uploadImage/{userId}")
    public ResponseEntity<User> getOneUserImage(@PathVariable Long userId){
        return userService.getOneUserImage(userId);
    }

    @PostMapping("/noUploadImage/{userId}")
    public ResponseEntity<User> setOneUserNoImage(@PathVariable Long userId){
        return userService.setOneUserNoImage(userId);
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId){
        return userService.getOneUser(userId);
    }

    @PutMapping("/updateOneUserForUsername/{userId}")
    public ResponseEntity<User> updateOneUserForUsername(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserForUsername(userId, newUser);
    }

    @PutMapping("/updateOneUserForEmail/{userId}")
    public ResponseEntity<User> updateOneUserForEmail(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserForEmail(userId, newUser);
    }

    @PutMapping("/updateOneUserForPassword/{userId}")
    public ResponseEntity<User> updateOneUserForPassword(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserForPassword(userId, newUser);
    }

    @PutMapping("/updateOneUserForLanguage/{userId}")
    public ResponseEntity<User> updateOneUserForLanguage(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserForLanguage(userId, newUser);
    }

    @PutMapping("/updateOneUserForGender/{userId}")
    public ResponseEntity<User> updateOneUserForGender(@PathVariable Long userId, @RequestBody User newUser){
        return userService.updateOneUserForGender(userId, newUser);
    }

    @DeleteMapping("/deleteOneUser/{userId}")
    public void deleteOneUser(@PathVariable Long userId){
        userService.deleteOneUser(userId);
    }

    @PostMapping("/searchOneUser/{username}")
    public User searchOneUser(@PathVariable String username){
        return userService.searchOneUser(username);
    }

    @PostMapping("/searchContainsForUsername/{username}")
    public List<User> searchContainsForUsername(@PathVariable String username){
        return userService.searchContainsForUsername(username);
    }
}
