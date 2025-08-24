package com.justfurnishit.booking.service;

import com.justfurnishit.booking.client.ProductClient;
import com.justfurnishit.booking.client.UserClient;
import com.justfurnishit.booking.dto.ClientProductBookingHistoryDTO;
import com.justfurnishit.booking.dto.ProductDTO;
import com.justfurnishit.booking.dto.UserDTO;
import com.justfurnishit.booking.model.Booking;
import com.justfurnishit.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ClientProductBookingHistoryService {

    private final BookingRepository bookingRepository;
    private final ProductClient productClient;
    private final UserClient userClient;

    @Autowired
    public ClientProductBookingHistoryService(
            BookingRepository bookingRepository,
            ProductClient productClient,
            UserClient userClient
    ) {
        this.bookingRepository = bookingRepository;
        this.productClient = productClient;
        this.userClient = userClient;
    }

    public List<ClientProductBookingHistoryDTO> getBookingHistoryForUser(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        List<ClientProductBookingHistoryDTO> result = new ArrayList<>();

        // Fetch the user's name (the client)
        String userName = "Unknown User";
        UserDTO userDto = userClient.getUserById(userId);
        if (userDto != null && userDto.getFullName() != null) {
            userName = userDto.getFullName();
        }

        for (Booking booking : bookings) {
            ClientProductBookingHistoryDTO dto = new ClientProductBookingHistoryDTO();
            dto.setUserName(userName);
            dto.setBookingId(booking.getId());
            dto.setDeliveryAddress(booking.getDeliveryAddress());
            dto.setQuantity(booking.getQuantity());

            // Fetch product details
            ProductDTO productDto = productClient.getProductById(booking.getProductId());
            if (productDto != null) {
                dto.setProductName(productDto.getCategory());
                dto.setImage(productDto.getImage()); // Add image support here

                // Fetch designer details
                UserDTO designerDto = userClient.getUserById(productDto.getUserId());
                if (designerDto != null && designerDto.getFullName() != null) {
                    dto.setDesignerName(designerDto.getFullName());
                } else {
                    dto.setDesignerName("Unknown Designer");
                }
            } else {
                dto.setProductName("Unknown Product");
                dto.setDesignerName("Unknown Designer");
                dto.setImage(null);
            }

            result.add(dto);
        }
        return result;
    }
}
