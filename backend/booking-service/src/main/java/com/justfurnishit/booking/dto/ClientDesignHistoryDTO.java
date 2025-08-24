package com.justfurnishit.booking.dto;

import java.time.LocalDate;

public class ClientDesignHistoryDTO {
    private String userName;
    private Long bookingId;
    private String designName;
    private String designerName;
    private LocalDate bookingDate;
    private LocalDate scheduledDate;
    private String image; // Add this if you want to include the image URL or path

    public ClientDesignHistoryDTO() {
    }

    public ClientDesignHistoryDTO(String userName, Long bookingId, String designName, String designerName, LocalDate bookingDate, LocalDate scheduledDate, String image) {
        this.userName = userName;
        this.bookingId = bookingId;
        this.designName = designName;
        this.designerName = designerName;
        this.bookingDate = bookingDate;
        this.scheduledDate = scheduledDate;
        this.image = image;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }

    public String getDesignerName() {
        return designerName;
    }

    public void setDesignerName(String designerName) {
        this.designerName = designerName;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "ClientDesignHistoryDTO{" +
                "userName='" + userName + '\'' +
                ", bookingId=" + bookingId +
                ", designName='" + designName + '\'' +
                ", designerName='" + designerName + '\'' +
                ", bookingDate=" + bookingDate +
                ", scheduledDate=" + scheduledDate +
                ", image='" + image + '\'' +
                '}';
    }
}
