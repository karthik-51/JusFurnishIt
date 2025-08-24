package com.justfurnishit.customer.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.justfurnishit.customer.model.CartItem;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserId(Long userId);
    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);
}
