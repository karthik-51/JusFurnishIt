package com.justfurnishit.designer.service;

import com.justfurnishit.designer.client.UserClient;
import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.model.UserDto;
import com.justfurnishit.designer.repository.DesignRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DesignService {

    @Autowired
    private DesignRepository repo;

    @Autowired
    private FileStorageService fs;

    @Autowired
    private UserClient userClient;

    public Design create(Long userId, Design d, byte[] img) {
        if (d == null) throw new RuntimeException("Design data is null.");
        if (img == null || img.length == 0) throw new RuntimeException("Image data is missing.");

        d.setUserId(userId);
        d.setImage(img);
        return repo.save(d);
    }

    public List<Design> list(Long userId) {
        List<Design> items = repo.findByUserId(userId);
        try {
            UserDto user = userClient.getUserById(userId);
            if (user != null) {
                for (Design d : items) {
                    d.setUserName(user.getFullName());
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch user info for userId=" + userId + ": " + e.getMessage());
            for (Design d : items) {
                d.setUserName("Unknown");
            }
        }
        return items;
    }

    public List<Design> getAllDesigns() {
        List<Design> designs = repo.findAll();
        for (Design d : designs) {
            try {
                UserDto user = userClient.getUserById(d.getUserId());
                d.setUserName(user != null ? user.getFullName() : "Unknown");
            } catch (Exception e) {
                System.err.println("Failed to fetch user for designId=" + d.getId() + ": " + e.getMessage());
                d.setUserName("Unknown");
            }
        }
        return designs;
    }

    public Design getDesignById(Long id) {
        Design d = repo.findById(id).orElseThrow(() ->
                new RuntimeException("Design not found with id: " + id));
        try {
            UserDto user = userClient.getUserById(d.getUserId());
            d.setUserName(user != null ? user.getFullName() : "Unknown");
        } catch (Exception e) {
            System.err.println("Failed to fetch user info for designId=" + id + ": " + e.getMessage());
            d.setUserName("Unknown");
        }
        return d;
    }

    public Design update(Long id, Design in, byte[] imageBytes) {
        if (in == null) throw new RuntimeException("Input design data is null.");
        
        Design d = repo.findById(id).orElseThrow(() ->
                new RuntimeException("Design not found with id: " + id));

        d.setBio(in.getBio());
        d.setTheme(in.getTheme());
        d.setCategory(in.getCategory());
        d.setDescription(in.getDescription());
        d.setEstimatedCost(in.getEstimatedCost());

        if (imageBytes != null && imageBytes.length > 0) {
            d.setImage(imageBytes);
        }

        return repo.save(d);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Design not found with id: " + id);
        }
        repo.deleteById(id);
    }
}
