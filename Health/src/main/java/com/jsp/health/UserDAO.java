package com.jsp.health;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class UserDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private UserDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static UserDAO instance=new UserDAO();
	
	public static UserDAO getInstance() {
		return instance;
	}
	
	
	
	public int userRegister(UserDTO dto) {//for normal,hospitalOwner
		int result=0;
		String query="Insert into userList(ulId,userId,userPw,userName,userClass)values(userList_seq.nextval,?,?,?,?)";
		try {
			conn=ds.getConnection();
			
			
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,dto.getUserId());
			pstmt.setString(2,dto.getUserPw());
			pstmt.setString(3, dto.getUserName());
			pstmt.setString(4,dto.getUserClass());

			
			
			result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
		
		
		
	
		return result;
		
	}
	

	public int userLogin(String id, String pw,String userClass) {
	    int result = 0;
	    String query = "SELECT * FROM userList WHERE userId=? AND userPw=? And userClass=?";
	    try {
	        conn = ds.getConnection();
	        pstmt = conn.prepareStatement(query);
	        pstmt.setString(1, id);
	        pstmt.setString(2, pw);
	        pstmt.setString(3, userClass);

	        rs = pstmt.executeQuery();
	        
	        if (rs.next()) {
	            result =1;
	            
	        }
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        close(conn);
	        close(pstmt);
	        
	    }
	    return result;
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
