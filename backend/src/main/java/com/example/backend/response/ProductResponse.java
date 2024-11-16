package com.example.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long productId;
    private String title;
    private String category;
    private Double price;
    private String details;
    private String condition;
    private String imageUrl;
    private Boolean isSold;
    private Date createdAt;
    private Date updatedAt;
}