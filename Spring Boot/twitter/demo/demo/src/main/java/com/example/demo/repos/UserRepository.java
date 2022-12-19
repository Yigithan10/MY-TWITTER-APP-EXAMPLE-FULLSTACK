package com.example.demo.repos;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByPassword(String password);
    User findByLanguage(String language);

    List<User> findByUsernameContains(String username);
    List<User> findByEmailContains(String email);
    List<User> findByLanguageContains(String language);

    User findByUsernameAndPassword(String username, String password);
    User findByEmailAndPassword(String username, String password);
}
