package com.justfurnishit.booking.service;

import com.justfurnishit.booking.client.DesignerClient;
import com.justfurnishit.booking.client.UserClient;
import com.justfurnishit.booking.dto.ClientDesignHistoryDTO;
import com.justfurnishit.booking.dto.DesignDTO;
import com.justfurnishit.booking.dto.UserDTO;
import com.justfurnishit.booking.model.ContactRequest;
import com.justfurnishit.booking.repository.ContactRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientDesignHistoryService {

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    @Autowired
    private DesignerClient designerClient;

    @Autowired
    private UserClient userClient;

    public List<ClientDesignHistoryDTO> getDesignHistoryForUser(Long userId) {
        List<ContactRequest> requests = contactRequestRepository.findByUserId(userId);

        String userName = "Unknown User";
        try {
            UserDTO user = userClient.getUserById(userId);
            if (user != null && user.getFullName() != null) {
                userName = user.getFullName();
            }
        } catch (Exception e) {
            // Logging can be added here
        }

        List<ClientDesignHistoryDTO> result = new ArrayList<>();
        for (ContactRequest req : requests) {
            ClientDesignHistoryDTO dto = new ClientDesignHistoryDTO();
            dto.setUserName(userName);
            dto.setBookingId(req.getId());
            dto.setBookingDate(req.getBookingDate());
            dto.setScheduledDate(req.getScheduledDate());

            try {
                if (req.getDesignId() != null) {
                    DesignDTO design = designerClient.getDesignById(req.getDesignId());
                    if (design != null) {
                        dto.setDesignName(design.getTheme() != null ? design.getTheme() : "Unnamed Design");

                        // Set category name here (assumes getCategory() returns String)
                        dto.setCategoryName(design.getCategory() != null ? design.getCategory() : "Unknown Category");

                        // Convert image to base64 and set
                        if (design.getImage() != null && !design.getImage().isEmpty()) {
                            dto.setImage("data:image/jpeg;base64," + design.getImage());
                        } else {
                            dto.setImage(null);
                        }

                        try {
                            UserDTO designer = userClient.getUserById(design.getUserId());
                            dto.setDesignerName(designer != null && designer.getFullName() != null
                                    ? designer.getFullName()
                                    : "Unknown Designer");
                        } catch (Exception e) {
                            dto.setDesignerName("Unknown Designer");
                        }
                    } else {
                        dto.setDesignName("Unknown Design");
                        dto.setDesignerName("Unknown Designer");
                        dto.setCategoryName("Unknown Category");
                    }
                } else {
                    dto.setDesignName("No Design ID");
                    dto.setDesignerName("Unknown Designer");
                    dto.setCategoryName("Unknown Category");
                }
            } catch (Exception e) {
                dto.setDesignName("Unknown Design");
                dto.setDesignerName("Unknown Designer");
                dto.setImage(null);
                dto.setCategoryName("Unknown Category");
            }

            result.add(dto);
        }

        return result;
    }
}
