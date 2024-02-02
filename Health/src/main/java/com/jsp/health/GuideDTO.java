package com.jsp.health;
//�닚�꽌(gId,hPart,gNumber,gQuery)
public class GuideDTO {
	private int gId;
	private String hPart;
	private int gNumber;
	private String gQuery;
	
	
	public GuideDTO() {
		// TODO Auto-generated constructor stub
	}
	public GuideDTO(int gId, String hPart, int gNumber, String gQuery) {
		super();
		this.gId = gId;
		this.hPart = hPart;
		this.gNumber = gNumber;
		this.gQuery = gQuery;
	}
	public int getgId() {
		return gId;
	}
	public void setgId(int gId) {
		this.gId = gId;
	}
	public String gethPart() {
		return hPart;
	}
	public void sethPart(String hPart) {
		this.hPart = hPart;
	}
	public int getgNumber() {
		return gNumber;
	}
	public void setgNumber(int gNumber) {
		this.gNumber = gNumber;
	}
	public String getgQuery() {
		return gQuery;
	}
	public void setgQuery(String gQuery) {
		this.gQuery = gQuery;
	}
	@Override
	public String toString() {
		return "GuideDTO [gId=" + gId + ", hPart=" + hPart + ", gNumber=" + gNumber + ", gQuery=" + gQuery + "]";
	}
	
	

}

