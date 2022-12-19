package com.example.demo.security;

import org.springframework.security.core.userdetails.User;
import com.example.demo.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class DummyUserService {

    public PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User getUser(String username, String password) {
        return new User(username, password, new ArrayList<>());
    }
}
