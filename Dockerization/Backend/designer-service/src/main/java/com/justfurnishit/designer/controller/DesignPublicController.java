package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.service.DesignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/designer")
public class DesignPublicController {

    @Autowired
    private DesignService designService;

    @GetMapping("/designs")
    public List<Design> getFilteredDesigns(
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minCost,
            @RequestParam(required = false) Double maxCost
    ) {
        return designService.getAllDesigns().stream()
                .filter(d -> theme == null || d.getTheme().equalsIgnoreCase(theme))
                .filter(d -> category == null || d.getCategory().equalsIgnoreCase(category))
                .filter(d -> minCost == null || d.getEstimatedCost() >= minCost)
                .filter(d -> maxCost == null || d.getEstimatedCost() <= maxCost)
                .collect(Collectors.toList());
    }

    
    @GetMapping("/designs/{id}")
    public Design getDesignById(@PathVariable Long id) {
        return designService.getDesignById(id);
    }
}
