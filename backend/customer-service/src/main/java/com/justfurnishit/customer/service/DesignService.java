package com.justfurnishit.customer.service;

import com.justfurnishit.customer.client.DesignerClient;
import com.justfurnishit.customer.dto.Design;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DesignService {

    @Autowired
    private DesignerClient designerClient;

    public List<Design> getAllDesigns() {
        return designerClient.getAllDesigns();
    }

    public List<Design> searchDesigns(String category, String theme, Integer minCost, Integer maxCost) {
        return getAllDesigns().stream()
                .filter(d -> category == null || d.getCategory().equalsIgnoreCase(category))
                .filter(d -> theme == null || d.getTheme().equalsIgnoreCase(theme))
                .filter(d -> minCost == null || d.getEstimatedCost() >= minCost)
                .filter(d -> maxCost == null || d.getEstimatedCost() <= maxCost)
                .collect(Collectors.toList());
    }

    public Design getDesignById(Long id) {
        return designerClient.getDesignById(id);
    }
}
