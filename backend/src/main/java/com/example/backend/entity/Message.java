package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "message")
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "sent_at")
    private Date timestamp;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id", referencedColumnName = "user_id", insertable = true, updatable = true)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "recipient_id", referencedColumnName = "user_id", insertable = true, updatable = true)
    private User receiver;

    // New relationship with Product entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id", insertable = true, updatable = true)
    private Product product;
}