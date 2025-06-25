package com.example.hotelservice;

import com.example.hotelservice.model.Hotel;
import com.example.hotelservice.repository.HotelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HotelServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(HotelServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(HotelRepository hotelRepository) {
        return args -> {
            if (hotelRepository.count() == 0) {
                hotelRepository.save(new Hotel(null, "Hotel Sunshine", "Bangalore", 4.5, 2200.0));
                hotelRepository.save(new Hotel(null, "The Grand Bangalore", "Bangalore", 4.2, 1800.0));
                hotelRepository.save(new Hotel(null, "Hyderabad Palace", "Hyderabad", 4.7, 2500.0));
                hotelRepository.save(new Hotel(null, "Pearl Residency", "Hyderabad", 4.3, 2000.0));
                hotelRepository.save(new Hotel(null, "Mumbai Retreat", "Mumbai", 4.6, 2700.0));
                hotelRepository.save(new Hotel(null, "Sea View Mumbai", "Mumbai", 4.4, 2300.0));
                hotelRepository.save(new Hotel(null, "Delhi Delight", "Delhi", 4.1, 1600.0));
                hotelRepository.save(new Hotel(null, "Capital Comfort", "Delhi", 4.0, 1500.0));
            }
        };
    }
} 