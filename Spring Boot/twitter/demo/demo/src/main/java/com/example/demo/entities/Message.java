package com.example.demo.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="message_id", nullable=false, unique=true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="toUser_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User toUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="conversation_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    Conversation conversation;

    @Column(name="message_text", nullable = false, unique = false)
    String message;

    @Column(name="message_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="message_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
