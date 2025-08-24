package com.justfurnishit.booking.controller;

import java.util.List;

import com.justfurnishit.booking.dto.ClientProductBookingHistoryDTO;
import com.justfurnishit.booking.service.ClientProductBookingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/client-product-history")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ClientProductBookingHistoryController {

    @Autowired
    private ClientProductBookingHistoryService bookingHistoryService;

    @GetMapping("/{userId}")
    public List<ClientProductBookingHistoryDTO> getClientProductBookingHistory(@PathVariable Long userId) {
        return bookingHistoryService.getBookingHistoryForUser(userId);
    }
}
