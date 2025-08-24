package com.justfurnishit.booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    private Long userId; 

    @Column(nullable = false)
    private String deliveryAddress;
    
    @Column(nullable = false)
    private int quantity; 

    @Transient
    private String userName; 

    @Transient
    private String productName;

    public Booking() {}

    public Booking(Long productId, Long userId, String deliveryAddress, int quantity) {
        this.productId = productId;
        this.userId = userId;
        this.deliveryAddress = deliveryAddress;
        this.quantity = quantity;
    }

    public Booking(Long id, Long productId, Long userId, String deliveryAddress, int quantity, String userName, String productName) {
        this.id = id;
        this.productId = productId;
        this.userId = userId;
        this.deliveryAddress = deliveryAddress;
        this.quantity = quantity;
        this.userName = userName;
        this.productName = productName;
    }


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
        
    }
    
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
