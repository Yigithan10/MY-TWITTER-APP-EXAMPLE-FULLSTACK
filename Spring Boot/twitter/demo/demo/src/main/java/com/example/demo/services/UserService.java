package com.example.demo.services;

import com.example.demo.DemoApplication;
import com.example.demo.entities.User;
import com.example.demo.repos.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    public UserRepository userRepository;


    public PasswordEncoder passwordEncoder;

    public List<String> getSearchAllUsername = new ArrayList<String>();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getOneUser(Long userId) {
        return userRepository.findById(userId).orElse( null);
    }

    public ResponseEntity<User> updateOneUserForUsername(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        User foundUser = user.get();
        if(userRepository.findByUsername(newUser.getUsername().toLowerCase())==null){
            foundUser.setUsername(newUser.getUsername().toLowerCase());
            userRepository.save(foundUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(newUser, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<User> updateOneUserForEmail(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        User foundUser = user.get();
        if(userRepository.findByEmail(newUser.getEmail())==null){
            foundUser.setEmail(newUser.getEmail());
            userRepository.save(foundUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(newUser, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<User> updateOneUserForPassword(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        User foundUser = user.get();
        if(passwordEncoder.matches(newUser.getPassword(), foundUser.getPassword())){
            return new ResponseEntity<>(foundUser, HttpStatus.BAD_REQUEST);
        }
        foundUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(foundUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    public ResponseEntity<User> updateOneUserForLanguage(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        User foundUser = user.get();
        if(!newUser.getLanguage().equals(foundUser.getLanguage())){
            foundUser.setLanguage(newUser.getLanguage());
            userRepository.save(foundUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(newUser, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<User> updateOneUserForGender(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId);
        User foundUser = user.get();
        if(!newUser.getGender().equals(foundUser.getGender())){
            foundUser.setGender(newUser.getGender());
            userRepository.save(foundUser);
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(newUser, HttpStatus.BAD_REQUEST);
        }
    }

    public void deleteOneUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public User searchOneUser(String username) {
        if(userRepository.findByUsername(username)!=null){
            User user = userRepository.findByUsername(username);
            return user;
        }else {
            return null;
        }
    }

    public List<User> searchContainsForUsername(String username) {
        return userRepository.findByUsernameContains(username);
    }

    public ResponseEntity<User> setOneUserImage(Long userId, MultipartFile file) {
        Optional<User> user = userRepository.findById(userId);
        String fileName = file.getOriginalFilename();

        try{
            file.transferTo( new File("D:\\Projelerim\\Java Intellij\\twitter\\demo\\demo\\src\\main\\resources\\static\\images\\" + fileName));
            user.get().setImagePath("http:/192.168.1.36:7979/images/" + fileName);
            userRepository.save(user.get());
            return new ResponseEntity(user, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(user, HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<User> getOneUserImage(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.get().getImagePath()!=null){
            return new ResponseEntity(user, HttpStatus.OK);
        }else {
            return new ResponseEntity(user, HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<User> setOneUserNoImage(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.get().getImagePath()!=null){
            user.get().setImagePath(null);
            userRepository.save(user.get());
            return new ResponseEntity(user, HttpStatus.OK);
        }else if(user.get().getImagePath()==null) {
            return new ResponseEntity(user, HttpStatus.BAD_GATEWAY);
        }else {
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        }
    }
}