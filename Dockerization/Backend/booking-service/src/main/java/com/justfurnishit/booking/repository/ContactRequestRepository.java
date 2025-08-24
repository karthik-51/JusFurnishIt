package com.justfurnishit.booking.repository;

import com.justfurnishit.booking.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {

	@Query("SELECT c FROM ContactRequest c WHERE c.designId IN :designIds")
	List<ContactRequest> findByDesignIdIn(@Param("designIds") List<Long> designIds);
	
	List<ContactRequest> findByUserId(Long userId);

	

}
