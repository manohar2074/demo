package com.example.hotelservice.controller;

import com.example.hotelservice.model.Hotel;
import com.example.hotelservice.repository.HotelRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5001"})
public class HotelController {
    private final HotelRepository hotelRepository;

    public HotelController(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @GetMapping("/location/{location}")
    public List<Hotel> getHotelsByLocation(@PathVariable String location) {
        return hotelRepository.findByLocation(location);
    }

    @GetMapping("/locations")
    public List<String> getLocations() {
        return hotelRepository.findAll()
            .stream()
            .map(Hotel::getLocation)
            .distinct()
            .collect(Collectors.toList());
    }
} 