package com.example.hotelservice.repository;

import com.example.hotelservice.model.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface HotelRepository extends MongoRepository<Hotel, String> {
    List<Hotel> findByLocation(String location);
} 