package com.justfurnishit.customer.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.justfurnishit.customer.model.WishlistItem;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserId(Long userId);
    Optional<WishlistItem> findByUserIdAndItemIdAndItemType(Long userId, Long itemId, String itemType);
}

