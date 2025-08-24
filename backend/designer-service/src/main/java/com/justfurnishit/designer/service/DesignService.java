package com.justfurnishit.designer.service;

import com.justfurnishit.designer.client.UserClient;
import com.justfurnishit.designer.model.Design;
import com.justfurnishit.designer.model.UserDto;
import com.justfurnishit.designer.repository.DesignRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//... existing imports
import java.util.Optional;

@Service
@Transactional
public class DesignService {

 @Autowired private DesignRepository repo;
 @Autowired private FileStorageService fs;
 @Autowired private UserClient userClient;

 public Design create(Long userId, Design d, byte[] img) {
     d.setUserId(userId);
     d.setImage(img);
     return repo.save(d);
 }

 public List<Design> list(Long userId) {
     UserDto user = userClient.getUserById(userId);
     List<Design> items = repo.findByUserId(userId);
     for (Design d : items) {
         d.setUserName(user.getFullName());
     }
     return items;
 }

 public List<Design> getAllDesigns() {
     List<Design> designs = repo.findAll();
     for (Design d : designs) {
         try {
             UserDto user = userClient.getUserById(d.getUserId());
             d.setUserName(user.getFullName());
         } catch (Exception ignored) {
             d.setUserName("Unknown");
         }
     }
     return designs;
 }

 public Design getDesignById(Long id) {
     Design d = repo.findById(id).orElseThrow();
     try {
         UserDto user = userClient.getUserById(d.getUserId());
         d.setUserName(user.getFullName());
     } catch (Exception ignored) {
         d.setUserName("Unknown");
     }
     return d;
 }

 public Design update(Long id, Design in, byte[] imageBytes) {
     Design d = repo.findById(id).orElseThrow();
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
     repo.deleteById(id);
 }
}

