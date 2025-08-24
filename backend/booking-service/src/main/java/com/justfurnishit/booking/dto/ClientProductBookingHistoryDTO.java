package com.justfurnishit.booking.dto;

public class ClientProductBookingHistoryDTO {
    private String userName;
    private Long bookingId;
    private String productName;
    private String designerName;
    private String deliveryAddress;
    private int quantity;
    private String image; // ✅ Added to store image

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

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDesignerName() {
        return designerName;
    }
    public void setDesignerName(String designerName) {
        this.designerName = designerName;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }
    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
}
