package com.justfurnishit.booking.client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.justfurnishit.booking.dto.DesignDTO;

@FeignClient(name = "designer-service", url = "http://localhost:8082")
public interface DesignerClient {
    @GetMapping("/api/designs/{id}")
    DesignDTO getDesignById(@PathVariable Long id);
}
