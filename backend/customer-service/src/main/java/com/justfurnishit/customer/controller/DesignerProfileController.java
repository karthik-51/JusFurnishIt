package com.justfurnishit.customer.controller;

import com.justfurnishit.customer.client.DesignerClient;
import com.justfurnishit.customer.dto.DesignerProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/customer/designer")
public class DesignerProfileController {

    @Autowired
    private DesignerClient designerClient;

    @GetMapping("/{designerId}/profile")
    public DesignerProfile getDesignerProfile(@PathVariable Long designerId) {
        return designerClient.getDesignerProfile(designerId);
    }
}
