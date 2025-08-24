package com.justfurnishit.customer.dto;

public class Design {
    private Long id;
    private Long userId;
    private String bio;
    private String theme;
    private String category;
    private String description;
    private double estimatedCost;
    private byte[] image;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }


    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(double estimatedCost) { this.estimatedCost = estimatedCost; }

    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}
