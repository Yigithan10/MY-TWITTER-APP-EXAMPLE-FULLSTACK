package com.example.demo.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name="conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="conversation_id", nullable=false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="toUser_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User toUser;

    @Column(name="conversation_last_message")
    String message;

    @Column(name="conversation_last_time", nullable = false)
    LocalTime localTime;

    @Column(name="conversation_last_date", nullable = false)
    LocalDate localDate;
}
