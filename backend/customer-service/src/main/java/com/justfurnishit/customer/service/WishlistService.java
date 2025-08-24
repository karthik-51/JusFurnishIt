package com.justfurnishit.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justfurnishit.customer.model.WishlistItem;
import com.justfurnishit.customer.repository.WishlistItemRepository;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistItemRepository wishlistRepository;

    public WishlistItem addToWishlist(Long userId, Long itemId, String itemType) {
        return wishlistRepository.findByUserIdAndItemIdAndItemType(userId, itemId, itemType)
            .orElseGet(() -> {
                WishlistItem item = new WishlistItem();
                item.setUserId(userId);
                item.setItemId(itemId);
                item.setItemType(itemType);
                return wishlistRepository.save(item);
            });
    }

    public List<WishlistItem> getWishlistItems(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public void removeFromWishlist(Long userId, Long itemId, String itemType) {
        wishlistRepository.findByUserIdAndItemIdAndItemType(userId, itemId, itemType)
            .ifPresent(wishlistRepository::delete);
    }
}
