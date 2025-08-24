package com.justfurnishit.customer.service;

import com.justfurnishit.customer.model.Rating;
import com.justfurnishit.customer.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public Rating addRating(Rating rating) {
        return ratingRepository.save(rating);
    }

   
    public List<Rating> getRatingsForProduct(Long productId) {
        return ratingRepository.findByProductId(productId);
    }

    public List<Rating> getRatingsForDesign(Long designId) {
        return ratingRepository.findByDesignId(designId);
    }

    
    public Double getAverageRatingForProduct(Long productId) {
        Double avg = ratingRepository.findAverageRatingByProductId(productId);
        return avg != null ? avg : 0.0;
    }

   
    public Double getAverageRatingForDesign(Long designId) {
        Double avg = ratingRepository.findAverageRatingByDesignId(designId);
        return avg != null ? avg : 0.0;
    }
}
