package com.justfurnishit.customer.dto;

public class DesignerProfile {
    private Long userId;
    private String name;
    private String location;
    private String description;
    private int experience;

    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
}
