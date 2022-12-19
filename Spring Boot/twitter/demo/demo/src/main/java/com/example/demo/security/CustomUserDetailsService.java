package com.example.demo.security;

import com.example.demo.entities.User;
import com.example.demo.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private DummyUserService dummyUserService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("username userDetailsService1 " + username);
        User user = userRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException("User not found");
        }

        return dummyUserService.getUser(user.getUsername(), user.getPassword());
    }
}
