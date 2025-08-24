package com.justfurnishit.designer.repository;

import com.justfurnishit.designer.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface DesignRepository extends JpaRepository<Design, Long> {
    List<Design> findByUserId(Long userId);
}
