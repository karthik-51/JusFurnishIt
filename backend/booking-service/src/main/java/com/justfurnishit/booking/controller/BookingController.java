package com.justfurnishit.booking.controller;

import com.justfurnishit.booking.model.Booking;
import com.justfurnishit.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService service;

    
    @PostMapping
    public Booking create(@RequestBody Booking booking) {
        System.out.println("DEBUG - Received productId: " + booking.getProductId());
        System.out.println("DEBUG - Full booking: " + booking);
        return service.createBooking(booking);
    }


    @GetMapping
    public List<Booking> list() {
        return service.getAllBookings();
    }
    
    @PostMapping("/by-product-ids")
    public List<Booking> getByProductIds(@RequestBody Map<String, List<Long>> body) {
        List<Long> productIds = body.get("productIds");
        if (productIds == null) return Collections.emptyList();
        return service.getByProductIds(productIds);
    }
    

}
