package com.jsp.health;
//HID
//HPART
//HIMG
//HNAME
//HADDRESS
public class HealthDTO {
	private int hId;
	private String hPart;
	private String hImg;
	private String hName;
	private String hAddress;
	private String hDepartment;
	private String hDescription;
	private String hDomain;
	private String hLongitude;
	private String hLatitude;
	public HealthDTO() {
		// TODO Auto-generated constructor stub
	}
	




	public HealthDTO(int hId, String hPart, String hImg, String hName, String hAddress, String hDepartment,
			String hDescription, String hDomain, String hLongitude, String hLatitude) {
		super();
		this.hId = hId;
		this.hPart = hPart;
		this.hImg = hImg;
		this.hName = hName;
		this.hAddress = hAddress;
		this.hDepartment = hDepartment;
		this.hDescription = hDescription;
		this.hDomain = hDomain;
		this.hLongitude = hLongitude;
		this.hLatitude = hLatitude;
	}





	public int gethId() {
		return hId;
	}
	public void sethId(int hId) {
		this.hId = hId;
	}
	public String gethPart() {
		return hPart;
	}
	public void sethPart(String hPart) {
		this.hPart = hPart;
	}
	public String gethImg() {
		return hImg;
	}
	public void sethImg(String hImg) {
		this.hImg = hImg;
	}
	public String gethName() {
		return hName;
	}
	public void sethName(String hName) {
		this.hName = hName;
	}
	public String gethAddress() {
		return hAddress;
	}
	public void sethAddress(String hAddress) {
		this.hAddress = hAddress;
	}
	public String gethDepartment() {
		return hDepartment;
	}
	public void sethDepartment(String hDepartment) {
		this.hDepartment = hDepartment;
	}
	public String gethDomain() {
		return hDomain;
	}
	public void sethDomain(String hDomain) {
		this.hDomain = hDomain;
	}
	public String gethDescription() {
		return hDescription;
	}
	public void sethDescription(String hDescription) {
		this.hDescription = hDescription;
	}





	public String gethLongitude() {
		return hLongitude;
	}





	public void sethLongitude(String hLongitude) {
		this.hLongitude = hLongitude;
	}





	public String gethLatitude() {
		return hLatitude;
	}





	public void sethLatitude(String hLatitude) {
		this.hLatitude = hLatitude;
	}





	@Override
	public String toString() {
		return "HealthDTO [hId=" + hId + ", hPart=" + hPart + ", hImg=" + hImg + ", hName=" + hName + ", hAddress="
				+ hAddress + ", hDepartment=" + hDepartment + ", hDescription=" + hDescription + ", hDomain=" + hDomain
				+ ", hLongitude=" + hLongitude + ", hLatitude=" + hLatitude + "]";
	}



	
}
