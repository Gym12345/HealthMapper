package com.jsp.health;
//hrId number(5) default 0 primary key,
//hName nvarchar2(40) not null,
//userName nvarchar2(40) not null,
//hrComment nvarchar2(100) not null,
//hrRate number(5) not null
public class ReviewDTO {
	private int hrId;
	private String hName;
	private String userId;
	private String hrComment;
	private int hrRate;
	public ReviewDTO() {
		// TODO Auto-generated constructor stub
	}
	public ReviewDTO(int hrId,String hName, String userId, String hrComment, int hrRate) {
		super();
		this.hrId=hrId;
		this.hName = hName;
		this.userId = userId;
		this.hrComment = hrComment;
		this.hrRate = hrRate;
	}
	
	public int getHrId() {
		return hrId;
	}

	public void setHrId(int hrId) {
		this.hrId = hrId;
	}

	public String gethName() {
		return hName;
	}
	public void sethName(String hName) {
		this.hName = hName;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getHrComment() {
		return hrComment;
	}
	public void setHrComment(String hrComment) {
		this.hrComment = hrComment;
	}
	public int getHrRate() {
		return hrRate;
	}
	public void setHrRate(int hrRate) {
		this.hrRate = hrRate;
	}
	@Override
	public String toString() {
		return "ReviewDTO [hrId=" + hrId + ", hName=" + hName + ", userId=" + userId + ", hrComment=" + hrComment
				+ ", hrRate=" + hrRate + "]";
	}
	
	
}
