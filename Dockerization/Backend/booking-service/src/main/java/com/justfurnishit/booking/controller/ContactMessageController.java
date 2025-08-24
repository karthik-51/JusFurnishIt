package com.justfurnishit.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.justfurnishit.booking.model.ContactMessage;
import com.justfurnishit.booking.model.ContactRequest;
import com.justfurnishit.booking.service.ContactMessageService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    @Autowired
    private ContactMessageService service;

    @PostMapping("/details")
    public ContactMessage submitMessage(@RequestBody ContactMessage message) {
    	 System.out.println("Received message: " + message.getFullName());
        return service.save(message);
    }
    
    
}
