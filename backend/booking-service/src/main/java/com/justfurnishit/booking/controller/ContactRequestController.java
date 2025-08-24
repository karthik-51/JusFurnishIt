package com.justfurnishit.booking.controller;

import com.justfurnishit.booking.dto.ContactRequestDTO;
import com.justfurnishit.booking.model.ContactRequest;
import com.justfurnishit.booking.service.ContactRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/contact-requests")
public class ContactRequestController {

    @Autowired
    private ContactRequestService service;

    @PostMapping
    public ContactRequest create(@RequestBody ContactRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<ContactRequest> list() {
        return service.getAll();
    }

    // FIX: Return DTOs here!
    @PostMapping("/by-design-ids")
    public List<ContactRequestDTO> getByDesignIds(@RequestBody Map<String, List<Long>> body) {
        List<Long> designIds = body.get("designIds");
        if (designIds == null) return Collections.emptyList();
        return service.getByDesignIds(designIds); 
    }
    
    @GetMapping("/by-user/{userId}")
    public List<ContactRequest> getContactRequestsByUserId(@PathVariable Long userId) {
        return service.getContactRequestsByUserId(userId);
    }
}
