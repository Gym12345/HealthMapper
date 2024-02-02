package com.jsp.health;
//reqId number(5) default 0 primary key,
//reqPart nvarchar2(20) not null,
//reqImg nvarchar2(40) not null,
//reqName nvarchar2(40) not null,
//reqAddress nvarchar2(60) not null,
//reqDepartMent nvarchar2(60) not null,
//reqDescription nvarchar2(60) not null,
//reqDomain nvarchar2(60) not null
public class RequestDTO {
	private int reqId;
	private String reqPart;
	private String reqImg;
	private String reqName;
	private String reqAddress;
	private String reqDepartMent;
	private String reqDescription;
	private String reqDomain;
	private String reqLongitude;
	private String reqLatitude;
	public RequestDTO() {
		// TODO Auto-generated constructor stub
	}
	
	
	


	public RequestDTO(int reqId, String reqPart, String reqImg, String reqName, String reqAddress, String reqDepartMent,
			String reqDescription, String reqDomain, String reqLongitude, String reqLatitude) {
		super();
		this.reqId = reqId;
		this.reqPart = reqPart;
		this.reqImg = reqImg;
		this.reqName = reqName;
		this.reqAddress = reqAddress;
		this.reqDepartMent = reqDepartMent;
		this.reqDescription = reqDescription;
		this.reqDomain = reqDomain;
		this.reqLongitude = reqLongitude;
		this.reqLatitude = reqLatitude;
	}





	public int getReqId() {
		return reqId;
	}
	public void setReqId(int reqId) {
		this.reqId = reqId;
	}
	public String getReqPart() {
		return reqPart;
	}
	public void setReqPart(String reqPart) {
		this.reqPart = reqPart;
	}
	public String getReqImg() {
		return reqImg;
	}
	public void setReqImg(String reqImg) {
		this.reqImg = reqImg;
	}
	public String getReqName() {
		return reqName;
	}
	public void setReqName(String reqName) {
		this.reqName = reqName;
	}
	public String getReqAddress() {
		return reqAddress;
	}
	public void setReqAddress(String reqAddress) {
		this.reqAddress = reqAddress;
	}
	public String getReqDepartMent() {
		return reqDepartMent;
	}
	public void setReqDepartMent(String reqDepartMent) {
		this.reqDepartMent = reqDepartMent;
	}
	public String getReqDescription() {
		return reqDescription;
	}
	public void setReqDescription(String reqDescription) {
		this.reqDescription = reqDescription;
	}
	public String getReqDomain() {
		return reqDomain;
	}
	public void setReqDomain(String reqDomain) {
		this.reqDomain = reqDomain;
	}
	public String getReqLongitude() {
		return reqLongitude;
	}


	public void setReqLongitude(String reqLongitude) {
		this.reqLongitude = reqLongitude;
	}


	public String getReqLatitude() {
		return reqLatitude;
	}


	public void setReqLatitude(String reqLatitude) {
		this.reqLatitude = reqLatitude;
	}





	@Override
	public String toString() {
		return "RequestDTO [reqId=" + reqId + ", reqPart=" + reqPart + ", reqImg=" + reqImg + ", reqName=" + reqName
				+ ", reqAddress=" + reqAddress + ", reqDepartMent=" + reqDepartMent + ", reqDescription="
				+ reqDescription + ", reqDomain=" + reqDomain + ", reqLongitude=" + reqLongitude + ", reqLatitude="
				+ reqLatitude + "]";
	}
	
	


}
