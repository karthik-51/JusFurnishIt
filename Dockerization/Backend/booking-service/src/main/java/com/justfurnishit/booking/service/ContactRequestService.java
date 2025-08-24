package com.justfurnishit.booking.service;
import com.justfurnishit.booking.dto.ContactRequestDTO;
import com.justfurnishit.booking.dto.DesignDTO;
import com.justfurnishit.booking.dto.UserDTO;
import com.justfurnishit.booking.model.ContactRequest;
import com.justfurnishit.booking.repository.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactRequestService {

    @Autowired
    private ContactRequestRepository repository;

    @Autowired
    private WebClient webClient; // For HTTP calls to other microservices

    public List<ContactRequestDTO> getByDesignIds(List<Long> designIds) {
        if (designIds == null || designIds.isEmpty()) return List.of();
        List<ContactRequest> requests = repository.findByDesignIdIn(designIds);
        List<ContactRequestDTO> dtos = new ArrayList<>();
        for (ContactRequest req : requests) {
            ContactRequestDTO dto = new ContactRequestDTO();
            dto.setId(req.getId());
            dto.setBookingDate(req.getBookingDate() != null ? req.getBookingDate().toString() : null);

            dto.setDesignId(req.getDesignId());
            dto.setMessage(req.getMessage());
            dto.setPhoneNumber(req.getPhoneNumber());
            dto.setScheduledDate(req.getScheduledDate() != null ? req.getScheduledDate().toString() : null);

            dto.setUserId(req.getUserId());

            // Fetch design name from design microservice
            String designName = "";
            try {
                DesignDTO design = webClient.get()
                        .uri("http://localhost:8082/api/designer/designs/{id}", req.getDesignId())
                        .retrieve()
                        .bodyToMono(DesignDTO.class)
                        .block();
                System.out.println("Fetched design for ID " + req.getDesignId() + ": " + design);
                if (design != null && design.getName() != null) {
                    designName = design.getName();
                }
            } catch (Exception e) {
                System.err.println("Error fetching design name for ID " + req.getDesignId() + ": " + e.getMessage());
                designName = "";
            }
            dto.setDesignName(designName);

           
            String userName = "";
            try {
                UserDTO user = webClient.get()
                        .uri("http://localhost:8081/api/users/{id}", req.getUserId())
                        .retrieve()
                        .bodyToMono(UserDTO.class)
                        .block();
                System.out.println("Fetched user for ID " + req.getUserId() + ": " + user);
                if (user != null && user.getFullName() != null) {
                    userName = user.getFullName();
                }
            } catch (Exception e) {
                System.err.println("Error fetching user name for ID " + req.getUserId() + ": " + e.getMessage());
                userName = "";
            }
            dto.setUserName(userName);

            dtos.add(dto);
        }
        return dtos;
    }

    public List<ContactRequest> getAll() {
        return repository.findAll();
    }

    public ContactRequest create(ContactRequest request) {
        return repository.save(request);
    }
    
    public List<ContactRequest> getContactRequestsByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

}

