package com.justfurnishit.booking.repository;

import com.justfurnishit.booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Query("SELECT b FROM Booking b WHERE b.productId IN :productIds")
	List<Booking> findByProductIdIn(@Param("productIds") List<Long> productIds);
	
	 List<Booking> findByUserId(Long userId);


}
