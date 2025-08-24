package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.service.DesignService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/designer/{userId}/designs")
public class DesignController {

    @Autowired private DesignService service;

    @PostMapping
    public Design create(@PathVariable Long userId,
                         @RequestPart("data") @Valid Design design,
                         @RequestPart("image") MultipartFile file) throws IOException {
        return service.create(userId, design, file.getBytes());
    }

    @GetMapping
    public List<Design> list(@PathVariable Long userId) {
        return service.list(userId);
    }
    @GetMapping("/designs")
    public List<Design> getAllDesigns() {
        return service.getAllDesigns();
    }
    @PutMapping("/{id}")
    public Design update(@PathVariable Long userId,
                         @PathVariable Long id,
                         @RequestPart("data") @Valid Design design,
                         @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {

        byte[] imageBytes = (file != null && !file.isEmpty()) ? file.getBytes() : null;
        return service.update(id, design, imageBytes);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
