package com.justfurnishit.customer.controller;

import com.justfurnishit.customer.model.Rating;
import com.justfurnishit.customer.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/customer/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public Rating submitRating(@RequestBody Rating rating) {
        return ratingService.addRating(rating);
    }

    @GetMapping("/design/{designId}")
    public List<Rating> getDesignRatings(@PathVariable Long designId) {
        return ratingService.getRatingsForDesign(designId);
    }

    @GetMapping("/product/{productId}")
    public List<Rating> getProductRatings(@PathVariable Long productId) {
        return ratingService.getRatingsForProduct(productId);
    }

    @GetMapping("/design/{designId}/average")
    public Double getDesignAverageRating(@PathVariable Long designId) {
        return ratingService.getAverageRatingForDesign(designId);
    }

    @GetMapping("/product/{productId}/average")
    public Double getProductAverageRating(@PathVariable Long productId) {
        return ratingService.getAverageRatingForProduct(productId);
    }
    
    
    

}
