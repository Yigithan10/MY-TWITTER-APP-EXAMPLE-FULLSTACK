package com.example.demo.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="complaints")
@Data
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="complaint_id", nullable = false)
    Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tweet_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    Tweet tweet;

    @Column(name="complaint_time", nullable = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="complaint_date", nullable = false)
    LocalDate localDate = LocalDate.now();

}
