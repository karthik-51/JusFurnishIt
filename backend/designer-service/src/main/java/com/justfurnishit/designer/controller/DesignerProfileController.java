package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.DesignerProfile;
import com.justfurnishit.designer.service.DesignerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")


@RestController
@RequestMapping("/api/designer/{userId}/profile")
public class DesignerProfileController {
    @Autowired private DesignerProfileService service;

    @PostMapping
    public DesignerProfile createOrUpdate(@PathVariable Long userId, @RequestBody DesignerProfile profile) {
        return service.createOrUpdateProfile(userId, profile);
    }

    @GetMapping
    public Optional<DesignerProfile> get(@PathVariable Long userId) {
        return service.getProfile(userId);
    }

    @DeleteMapping
    public void delete(@PathVariable Long userId) {
        service.deleteProfile(userId);
    }
}
