package com.example.hotelservice.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "hotels")
public class Hotel {
    @Id
    private String id;
    private String name;
    private String location;
    private double rating;
    private double pricePerDay;
} 