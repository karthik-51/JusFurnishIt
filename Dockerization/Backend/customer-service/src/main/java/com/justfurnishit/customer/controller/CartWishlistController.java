package com.justfurnishit.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.justfurnishit.customer.model.CartItem;
import com.justfurnishit.customer.model.WishlistItem;
import com.justfurnishit.customer.service.CartService;
import com.justfurnishit.customer.service.WishlistService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/customer")
public class CartWishlistController {

    @Autowired
    private CartService cartService;

    @Autowired
    private WishlistService wishlistService;

   

    @PostMapping("/cart/add")
    public ResponseEntity<CartItem> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity) {
        CartItem item = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/cart/update")
    public ResponseEntity<CartItem> updateCartQuantity(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        try {
            CartItem updated = cartService.updateCartQuantity(userId, productId, quantity);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        List<CartItem> items = cartService.getCartItems(userId);
        return ResponseEntity.ok(items);
    }

    
    
    @DeleteMapping("/cart/remove")
    public ResponseEntity<Void> removeFromCart(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/cart/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }

   

    @PostMapping("/wishlist/add")
    public ResponseEntity<WishlistItem> addToWishlist(
            @RequestParam Long userId,
            @RequestParam Long itemId,
            @RequestParam String itemType) {
        WishlistItem item = wishlistService.addToWishlist(userId, itemId, itemType);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/wishlist/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlistItems(userId));
    }

    @DeleteMapping("/wishlist/remove")
    public ResponseEntity<Void> removeFromWishlist(
            @RequestParam Long userId,
            @RequestParam Long itemId,
            @RequestParam String itemType) {
        wishlistService.removeFromWishlist(userId, itemId, itemType);
        return ResponseEntity.ok().build();
    }
}
