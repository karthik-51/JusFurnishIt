package com.justfurnishit.designer.repository;

import com.justfurnishit.designer.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DesignRepository extends JpaRepository<Design, Long> {
    List<Design> findByUserId(Long userId);
}
