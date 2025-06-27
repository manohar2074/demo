package com.example.hotelservice.controller;

import com.example.hotelservice.model.Hotel;
import com.example.hotelservice.repository.HotelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initDatabase(HotelRepository hotelRepository) {
        return args -> {
            if (hotelRepository.count() == 0) {
                hotelRepository.save(new Hotel(null, "Hyderabad Palace", "Hyderabad", 4.7, 2500));
                hotelRepository.save(new Hotel(null, "Pearl Residency", "Hyderabad", 4.3, 2000));
                hotelRepository.save(new Hotel(null, "Mumbai Retreat", "Mumbai", 4.6, 2700));
                hotelRepository.save(new Hotel(null, "Sea View Mumbai", "Mumbai", 4.4, 2300));
            }
        };
    }
} 