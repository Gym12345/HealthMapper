package com.jsp.health;
//HID
//HPART
//HIMG
//HNAME
//HADDRESS
public class hCareDTO {
	private int hcId;
	private int hcYear;
	private int hcMonth;
	private int hcDate;
	private String hcUser;
	private String hcMemo;
	
	public hCareDTO() {
		// TODO Auto-generated constructor stub
	}


	public hCareDTO(int hcId, int hcYear, int hcMonth, int hcDate, String hcUser, String hcMemo) {
		super();
		this.hcId = hcId;
		this.hcYear = hcYear;
		this.hcMonth = hcMonth;
		this.hcDate = hcDate;
		this.hcUser = hcUser;
		this.hcMemo = hcMemo;
	}


	public int getHcId() {
		return hcId;
	}

	public void setHcId(int hcId) {
		this.hcId = hcId;
	}

	public int getHcYear() {
		return hcYear;
	}

	public void setHcYear(int hcYear) {
		this.hcYear = hcYear;
	}

	public int getHcMonth() {
		return hcMonth;
	}

	public void setHcMonth(int hcMonth) {
		this.hcMonth = hcMonth;
	}

	public int getHcDate() {
		return hcDate;
	}

	public void setHcDate(int hcDate) {
		this.hcDate = hcDate;
	}

	public String getHcMemo() {
		return hcMemo;
	}

	public void setHcMemo(String hcMemo) {
		this.hcMemo = hcMemo;
	}


	public String getHcUser() {
		return hcUser;
	}


	public void setHcUser(String hcUser) {
		this.hcUser = hcUser;
	}


	@Override
	public String toString() {
		return "hCareDTO [hcId=" + hcId + ", hcYear=" + hcYear + ", hcMonth=" + hcMonth + ", hcDate=" + hcDate
				+ ", hcUser=" + hcUser + ", hcMemo=" + hcMemo + "]";
	}


	

	



	
}
