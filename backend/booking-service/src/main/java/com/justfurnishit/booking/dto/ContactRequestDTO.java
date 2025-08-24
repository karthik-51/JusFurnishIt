package com.justfurnishit.booking.dto;

public class ContactRequestDTO {
	 private Long id;
	    private String bookingDate;
	    private Long designId;
	    private String designName;
	    private String message;
	    private String phoneNumber;
	    private String scheduledDate;
	    private Long userId;
	    private String userName;
	    
	    public ContactRequestDTO() {
	    	
	    }
	    
		public ContactRequestDTO(Long id, String bookingDate, Long designId, String designName, String message,
				String phoneNumber, String scheduledDate, Long userId, String userName) {
			super();
			this.id = id;
			this.bookingDate = bookingDate;
			this.designId = designId;
			this.designName = designName;
			this.message = message;
			this.phoneNumber = phoneNumber;
			this.scheduledDate = scheduledDate;
			this.userId = userId;
			this.userName = userName;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getBookingDate() {
			return bookingDate;
		}
		public void setBookingDate(String bookingDate) {
			this.bookingDate = bookingDate;
		}
		public Long getDesignId() {
			return designId;
		}
		public void setDesignId(Long designId) {
			this.designId = designId;
		}
		public String getDesignName() {
			return designName;
		}
		public void setDesignName(String designName) {
			this.designName = designName;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getScheduledDate() {
			return scheduledDate;
		}
		public void setScheduledDate(String scheduledDate) {
			this.scheduledDate = scheduledDate;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
	    
	    
}


