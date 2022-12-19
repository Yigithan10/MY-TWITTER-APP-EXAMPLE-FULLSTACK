package com.example.demo.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="tweets")
@Data
public class Tweet {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="tweet_id", nullable=false, unique=false)
    Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @Column(name="tweet_title", nullable=false, unique=false)
    String title;

    @Column(name="tweet_text", nullable=false, unique=false, columnDefinition = "text")
    @Lob
    String text;

    @Column(name="tweet_likes", nullable=false, unique=false)
    int likes;

    @Column(name="tweet_comments", nullable=false, unique=false)
    int comments;

    @Column(name="tweet_retweets", nullable=false, unique=false)
    int retweets;

    @Column(name="retweet_id")
    Long retweetId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="retweet_user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User retweetUser;

    @Column(name="tweet_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="tweet_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();

}
