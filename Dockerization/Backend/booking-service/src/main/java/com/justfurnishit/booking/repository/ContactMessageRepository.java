package com.justfurnishit.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.justfurnishit.booking.model.ContactMessage;
import com.justfurnishit.booking.model.ContactRequest;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

}
