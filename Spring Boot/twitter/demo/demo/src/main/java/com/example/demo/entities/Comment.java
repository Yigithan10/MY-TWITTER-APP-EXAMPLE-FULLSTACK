package com.example.demo.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tweet_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    Tweet tweet;

    @Column(name = "comment_text", nullable = false)
    String text;

    @Column(name="comment_time", nullable = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="comment_date", nullable = false)
    LocalDate localDate = LocalDate.now();
}
