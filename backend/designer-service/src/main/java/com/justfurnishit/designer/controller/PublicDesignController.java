package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.service.DesignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/designs")
public class PublicDesignController {

    @Autowired
    private DesignService designService;

    
    @GetMapping("/public")
    public List<Design> getAllDesigns() {
        return designService.getAllDesigns();
    }
}
