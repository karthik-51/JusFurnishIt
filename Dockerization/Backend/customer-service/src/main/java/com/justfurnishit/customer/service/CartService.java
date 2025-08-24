package com.justfurnishit.customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.justfurnishit.customer.model.CartItem;
import com.justfurnishit.customer.repository.CartItemRepository;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartRepository;

    public CartItem addToCart(Long userId, Long productId, int quantity) {
        return cartRepository.findByUserIdAndProductId(userId, productId)
            .map(item -> {
                item.setQuantity(item.getQuantity() + quantity);
                return cartRepository.save(item);
            }).orElseGet(() -> {
                CartItem newItem = new CartItem();
                newItem.setUserId(userId);
                newItem.setProductId(productId);
                newItem.setQuantity(quantity);
                return cartRepository.save(newItem);
            });
    }

    // ✅ New method - sets quantity directly
    public CartItem updateCartQuantity(Long userId, Long productId, int quantity) {
        return cartRepository.findByUserIdAndProductId(userId, productId)
            .map(item -> {
                item.setQuantity(quantity); // 👈 replace instead of adding
                return cartRepository.save(item);
            }).orElseThrow(() -> new RuntimeException("Item not found in cart"));
    }

    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long userId, Long productId) {
        cartRepository.findByUserIdAndProductId(userId, productId)
            .ifPresent(cartRepository::delete);
    }

    public void clearCart(Long userId) {
        List<CartItem> items = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(items);
    }
}
