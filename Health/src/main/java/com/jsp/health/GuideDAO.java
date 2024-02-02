package com.jsp.health;
//순서(gId,hPart,gNumber,gQuery)

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class GuideDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private GuideDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static GuideDAO instance=new GuideDAO();
	
	public static GuideDAO getInstance() {
		return instance;
	}
	
	//순서(gId,hPart,gNumber,gQuery)

	public ArrayList<GuideDTO> GuideListByhPart(String part){
		ArrayList<GuideDTO> list=new ArrayList<>();
		String query="Select * from healthGuide where hPart like ? order by gNumber asc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,"%" + part + "%");
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int gId=rs.getInt("gId");
				String hPart=rs.getString("hPart");
				int gNumber=rs.getInt("gNumber");
				String gQuery=rs.getString("gQuery");
				list.add(new GuideDTO(gId,hPart,gNumber,gQuery));
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
