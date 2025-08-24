package com.justfurnishit.booking.controller;

import com.justfurnishit.booking.dto.ClientDesignHistoryDTO;
import com.justfurnishit.booking.service.ClientDesignHistoryService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@RestController
@RequestMapping("/api/client-design-history")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ClientDesignHistoryController {

    @Autowired
    private ClientDesignHistoryService service;

    @GetMapping("/{userId}")
    public List<ClientDesignHistoryDTO> getClientDesignHistory(@PathVariable Long userId) {
        return service.getDesignHistoryForUser(userId);
    }
}
