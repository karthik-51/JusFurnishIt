package com.justfurnishit.customer.dto;

public class Product {
    private Long id;
    private Long userId;
    private String name;
    private String category;
    private String theme;
    private String description;
    private String shortBio; 
    private double price;
    private byte[] image;
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getshortBio() { return shortBio; }
    public void setshortBio(String shortBio) { this.shortBio = shortBio; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}