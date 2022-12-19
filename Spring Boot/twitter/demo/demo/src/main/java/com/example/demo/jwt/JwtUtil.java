package com.example.demo.jwt;

import com.example.demo.entities.User;
import com.example.demo.repos.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Autowired
    private UserRepository userRepository;

    private String SECRET_KEY = "my-app-secret";

    // verilen token a ait kullanıcı adını döndürür.
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // verilen token a ait token bitiş süresini verir.
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // verilen token a ait claims bilgisini alır.
    private Claims extractAllClaims(String token) {
        try{
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        }catch (ExpiredJwtException e){
            Claims claims = null;
            System.out.println(" Token expired ");
            return claims;
        }
    }

    // token ın geçerlilik süre doldu mu?
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // userDetails objesini alır. createToken metoduna gönderir.
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        User user = userRepository.findByUsername(userDetails.getUsername());
        return createToken(claims, ""+user.getId());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims)
                .setSubject(subject) // ilgili kullanıcı
                .setIssuedAt(new Date(System.currentTimeMillis())) // başlangıç
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) // bitiş
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY) // kullanılan algoritma ve bu algoritma çalışırken kullanılacak key değeri
                .compact();
    }

    // token hala geçerli mi? kullanıcı adı doğru mu ise ve token ın geçerlilik süresi devam ediyorsa true döner.
    public Boolean validateToken(String token, UserDetails userDetails) {
        final Long userId = Long.valueOf(extractUsername(token));
        User user = userRepository.findByUsername(userDetails.getUsername());
        return (userId.equals(user.getId()) && !isTokenExpired(token));
    }
}