package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="likes")
@Data
public class Like {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="like_id", nullable=false, unique=false)
    Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tweet_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    Tweet tweet;

    @Column(name="like_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="like_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
