package com.jsp.health;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ReviewDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	public ReviewDAO() {
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private static ReviewDAO instance=new ReviewDAO();
	
	public static ReviewDAO getInstance() {
		return instance;
	}
	public ArrayList<ReviewDTO> HospitalReviewList(String hospitalName){
		ArrayList<ReviewDTO> list=new ArrayList<>();
		String query="Select * from hospitalReview where hName=? order by hrId desc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,hospitalName);
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int hrId=rs.getInt("hrId");
				String hName=rs.getString("hName");
				String userId=rs.getString("userId");
				String hrComment=rs.getString("hrComment");
				int hrRate=rs.getInt("hrRate");
				list.add(new ReviewDTO(hrId,hName,userId,hrComment,hrRate));
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
			close(rs);
		}
		
		
		
		return list;
		
	}

	//hrId number(5) default 0 primary key,
	//hName nvarchar2(40) not null,
	//userName nvarchar2(40) not null,
	//hrComment nvarchar2(100) not null,
	//hrRate number(5) not null
	public int ReviewCreate(ReviewDTO dto) {
		int result=0;
		String query="Insert into hospitalReview(hrId,hName,userId,hrComment,hrRate)values(hospitalReview_seq.nextval,?,?,?,?)";
		try {
			conn=ds.getConnection();
			
			
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,dto.gethName());
			pstmt.setString(2,dto.getUserId());
			pstmt.setString(3, dto.getHrComment());
			pstmt.setInt(4, dto.getHrRate());
			result=pstmt.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
		
		
		
	
		return result;
		
	}
	public int ReviewUpdate(ReviewDTO dto) {
		int result=0;
	    String sql = "UPDATE hospitalReview SET  userId=?,hrComment =?,hrRate =? WHERE hrId = ?";
	    try {
			conn=ds.getConnection();

	    	PreparedStatement pstmt = conn.prepareStatement(sql);
		    pstmt.setString(1, dto.getUserId());
		    pstmt.setString(2, dto.getHrComment());
		    pstmt.setInt(3, dto.getHrRate());
		    
		    pstmt.setInt(4, dto.getHrId());
		   

		  
		    
		    result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
	    return result;
	    
	}
	
	public int Reviewdelete(int hrId) {
		int result=0;
	    String sql = "DELETE FROM hospitalReview WHERE hrId = ?";
	    try {
			conn=ds.getConnection();

	    	PreparedStatement pstmt = conn.prepareStatement(sql);
		    pstmt.setInt(1, hrId);
		    result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
	    return result;
	    
	}
	public ArrayList<ReviewDTO> NormalShowReviewList(String id){//userId 인수//노멀유저 본인이 작성한 리뷰목록
		ArrayList<ReviewDTO> list=new ArrayList<>();

		String query="Select * from hospitalReview where userId=? ";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			
			pstmt.setString(1, id);
			rs=pstmt.executeQuery();
			 
			 while (rs.next()) {
				 	int hrId=rs.getInt("hrId");
				 	String hName=rs.getString("hName");
				 	String userId=rs.getString("userId");
				 	String hrComment=rs.getString("hrComment");
				 	int hrRate=rs.getInt("hrRate");

					list.add(new ReviewDTO(hrId, hName, userId, hrComment, hrRate));
		        }
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
			close(rs);
		}
		
		
		
		return list;
		
	}
	public ArrayList<ReviewDTO> ShowOneHospitalReviewList(String name){//인수에 병원이름//특정병원의 리뷰조회
		ArrayList<ReviewDTO> list=new ArrayList<>();

		String query="Select * from hospitalReview where hName=? ";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			
			pstmt.setString(1,name);
			rs=pstmt.executeQuery();
			 
			 if (rs.next()) {
				 	int hrId=rs.getInt("hrId");
				 	String hName=rs.getString("hName");
				 	String userId=rs.getString("userId");
				 	String hrComment=rs.getString("hrComment");
				 	int hrRate=rs.getInt("hrRate");

					list.add(new ReviewDTO(hrId, hName, userId, hrComment, hrRate));
		        }
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
			close(rs);
		}
		
		
		
		return list;
		
	}
	
	
	
	
	
	
	private void close(Connection conn) {
		try {
			if(conn!=null) {
				conn.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void close(PreparedStatement pstmt) {
		try {
			if(pstmt!=null) {
				pstmt.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void close(ResultSet rs) {
		try {
			if(rs!=null) {
				rs.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	
	}

}
