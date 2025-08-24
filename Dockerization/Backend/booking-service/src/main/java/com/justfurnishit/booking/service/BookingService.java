package com.justfurnishit.booking.service;

import com.justfurnishit.booking.model.Booking;
import com.justfurnishit.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    

    public Booking createBooking(Booking booking) {
        System.out.println("Saving booking with productId: " + booking.getProductId()); // ✅ Debug log
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
 
    public List<Booking> getByProductIds(List<Long> productIds) {
        if (productIds == null || productIds.isEmpty()) return List.of();
        return bookingRepository.findByProductIdIn(productIds);
    }
    

}
