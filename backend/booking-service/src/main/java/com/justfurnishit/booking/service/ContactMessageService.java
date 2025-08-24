package com.justfurnishit.booking.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justfurnishit.booking.model.ContactMessage;
import com.justfurnishit.booking.model.ContactRequest;
import com.justfurnishit.booking.repository.ContactMessageRepository;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository repository;

    public ContactMessage save(ContactMessage message) {
        ContactMessage saved = repository.save(message);
        System.out.println("Saved ID: " + saved.getId());
        return saved;
    }
    
    
}
