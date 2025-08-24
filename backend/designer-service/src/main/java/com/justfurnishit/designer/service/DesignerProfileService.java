package com.justfurnishit.designer.service;

import com.justfurnishit.designer.model.DesignerProfile;
import com.justfurnishit.designer.repository.DesignerProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DesignerProfileService {
    @Autowired private DesignerProfileRepository repo;

    public DesignerProfile createOrUpdateProfile(Long userId, DesignerProfile profile) {
        profile.setUserId(userId);
        return repo.save(profile);
    }

    public Optional<DesignerProfile> getProfile(Long userId) {
        return repo.findById(userId);
    }

    public void deleteProfile(Long userId) {
        repo.deleteById(userId);
    }
}
