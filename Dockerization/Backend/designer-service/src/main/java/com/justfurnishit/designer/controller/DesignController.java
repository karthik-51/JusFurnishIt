package com.justfurnishit.designer.controller;

import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.service.DesignService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/maindesigner")
public class DesignController {

    @Autowired
    private DesignService service;

    @PostMapping("/{userId}/designs")
    public ResponseEntity<?> create(@PathVariable Long userId,
                                    @RequestPart("data") @Valid Design design,
                                    @RequestPart("image") MultipartFile file) {
        try {
            Design saved = service.create(userId, design, file.getBytes());
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to read image file.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to create design: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/designs")
    public ResponseEntity<?> list(@PathVariable Long userId) {
        try {
            List<Design> designs = service.list(userId);
            return ResponseEntity.ok(designs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to fetch designs: " + e.getMessage());
        }
    }

    @GetMapping("/designs")
    public ResponseEntity<?> getAllDesigns() {
        try {
            List<Design> designs = service.getAllDesigns();
            return ResponseEntity.ok(designs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to fetch all designs: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}/designs/{id}")
    public ResponseEntity<?> update(@PathVariable Long userId,
                                    @PathVariable Long id,
                                    @RequestPart("data") @Valid Design design,
                                    @RequestPart(value = "image", required = false) MultipartFile file) {
        try {
            byte[] imageBytes = (file != null && !file.isEmpty()) ? file.getBytes() : null;
            Design updated = service.update(id, design, imageBytes);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to read image file.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to update design: " + e.getMessage());
        }
    }

    @DeleteMapping("/{userId}/designs/{id}")
    public ResponseEntity<?> delete(@PathVariable Long userId, @PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.ok("Design deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to delete design: " + e.getMessage());
        }
    }
}