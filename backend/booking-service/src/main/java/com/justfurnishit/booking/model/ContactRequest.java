package com.justfurnishit.booking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "contact_requests")
public class ContactRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long designId; 

    private Long userId;   

    private String phoneNumber;

    private LocalDate bookingDate;

    private LocalDate scheduledDate;

    @Column(length = 1000)
    private String message;

    @Transient
    private String userName; 

    @Transient
    private String designName;

    // Constructors
    public ContactRequest() {}

    public ContactRequest(Long designId, Long userId, String phoneNumber, LocalDate bookingDate, LocalDate scheduledDate, String message) {
        this.designId = designId;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.bookingDate = bookingDate;
        this.scheduledDate = scheduledDate;
        this.message = message;
    }

    public ContactRequest(Long id, Long designId, Long userId, String phoneNumber, LocalDate bookingDate, LocalDate scheduledDate, String message, String userName, String designName) {
        this.id = id;
        this.designId = designId;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.bookingDate = bookingDate;
        this.scheduledDate = scheduledDate;
        this.message = message;
        this.userName = userName;
        this.designName = designName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDesignId() {
        return designId;
    }

    public void setDesignId(Long designId) {
        this.designId = designId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }
}
