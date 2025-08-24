package com.justfurnishit.customer.controller;

import com.justfurnishit.customer.dto.Design;
import com.justfurnishit.customer.service.DesignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/customer/designs")
public class DesignController {

    @Autowired
    private DesignService designService;

    
    @GetMapping("/all")
    public List<Design> getAllDesigns() {
        return designService.getAllDesigns();
    }

    @GetMapping("/search")
    public List<Design> searchDesigns(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) Integer minCost,
            @RequestParam(required = false) Integer maxCost
    ) {
        return designService.searchDesigns(category, theme, minCost, maxCost);
    }

    
    @GetMapping("/{designId}")
    public Design getDesignById(@PathVariable Long designId) {
        return designService.getDesignById(designId);
    }
}
