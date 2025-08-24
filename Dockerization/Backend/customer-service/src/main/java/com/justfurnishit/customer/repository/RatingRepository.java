package com.justfurnishit.customer.repository;

import com.justfurnishit.customer.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findByProductId(Long productId);

    List<Rating> findByDesignId(Long designId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.productId = :productId")
    Double findAverageRatingByProductId(Long productId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.designId = :designId")
    Double findAverageRatingByDesignId(Long designId);
}
