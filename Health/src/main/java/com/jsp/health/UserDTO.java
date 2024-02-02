package com.jsp.health;
//ULID	NUMBER(5,0)	No
//USERID	NVARCHAR2(20 CHAR)	No
//USERPW	NVARCHAR2(40 CHAR)	No
//USERNAME	NVARCHAR2(40 CHAR)	No
//USERCLASS	NVARCHAR2(40 CHAR)	Yes
public class UserDTO {
	private int ulId;
	private String userId;
	private String userPw;
	private String userName;
	private String userClass;
	public UserDTO() {
		// TODO Auto-generated constructor stub
	}
	public int getUlId() {
		return ulId;
	}
	public void setUlId(int ulId) {
		this.ulId = ulId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserClass() {
		return userClass;
	}
	public void setUserClass(String userClass) {
		this.userClass = userClass;
	}
	@Override
	public String toString() {
		return "UserDTO [ulId=" + ulId + ", userId=" + userId + ", userPw=" + userPw + ", userName=" + userName
				+ ", userClass=" + userClass + "]";
	}
	
}
