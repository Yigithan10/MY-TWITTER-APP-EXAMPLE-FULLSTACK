package com.example.demo.services;

import com.example.demo.entities.User;
import com.example.demo.exeptions.AuthExeption;
import com.example.demo.jwt.JwtUtil;
import com.example.demo.repos.UserRepository;
import com.example.demo.requests.AuthRequest;
import com.example.demo.responses.AuthResponse;
import com.example.demo.security.CustomUserDetailsService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public static UserRepository userRepository;

    public PasswordEncoder passwordEncoder;

    private static final String secretKey = "my-app-secret";
    // private static final int validity = 4320 * 60 * 1000;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ResponseEntity<User> registerOneUser(User user) {
        if(userRepository.findByUsername(user.getUsername().toLowerCase())!=null){
            return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
        }else if(userRepository.findByEmail(user.getEmail())!=null){
            return new ResponseEntity<>(user, HttpStatus.BAD_GATEWAY);
        }else {
            User newUser = new User();
            newUser.setUsername(user.getUsername().toLowerCase());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setEmail(user.getEmail());
            newUser.setLanguage(user.getLanguage());
            newUser.setGender(user.getGender());
            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }
    }

    public AuthResponse loginOneUser(AuthRequest authRequest) {
        User foundUser = userRepository.findByUsername(authRequest.getUsername());
        if(foundUser==null){
            throw new AuthExeption();
        }
        boolean matches =  passwordEncoder.matches(authRequest.getPassword(), foundUser.getPassword());
        if(matches){
            User user = foundUser;
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            } catch (BadCredentialsException ex) {
                throw new BadCredentialsException("Incorret username or password", ex);
            }
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String token = jwtUtil.generateToken(userDetails);
            AuthResponse authResponse = new AuthResponse();
            authResponse.setUser(user);
            authResponse.setToken(token);
            return authResponse;
        }else {
            throw new AuthExeption();
        }
        /*
        User foundUser = userRepository.findByUsername(user.getUsername().toLowerCase());
        if(passwordEncoder.matches(user.getPassword(), foundUser.getPassword())){
            return new ResponseEntity<>(foundUser, HttpStatus.OK);
        } else if(!passwordEncoder.matches(user.getPassword(), foundUser.getPassword())){
            return new ResponseEntity<>(foundUser, HttpStatus.BAD_GATEWAY);
        }else {
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }

         */
    }

    public static ResponseEntity<User> parserToken(String token) {
        JwtParser parser = Jwts.parser().setSigningKey(secretKey);
        try{
            if(!TokenValidate(token)){
                parser.parse(token);
                Claims claims = parser.parseClaimsJws(token).getBody();
                Long userId = Long.valueOf(claims.getSubject());
                Optional<User> user = userRepository.findById(userId);
                return new ResponseEntity(user, HttpStatus.OK);
            }else {
                User user = new User();
                return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
            }
        } catch (ExpiredJwtException e) {
            System.out.println(" Token expired ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_GATEWAY);
        } catch (SignatureException e) {
            System.out.println(" SignatureException ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        } catch(Exception e){
            System.out.println(" Some other exception in JWT parsing ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        }
    }

    private static boolean isTokenExpired(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        return claims.getExpiration().before(new Date(System.currentTimeMillis()));
    }

    public static boolean TokenValidate(String token){
        if(isTokenExpired(token)){
            return true;
        }
        return false;
    }
}
