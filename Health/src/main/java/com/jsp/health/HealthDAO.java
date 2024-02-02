package com.jsp.health;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class HealthDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private HealthDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static HealthDAO instance=new HealthDAO();
	
	public static HealthDAO getInstance() {
		return instance;
	}
	
	public ArrayList<HealthDTO> HPartList(String part){
		ArrayList<HealthDTO> list=new ArrayList<>();
		String query="Select * from hospital where hPart like ? order by hId asc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,"%" + part + "%");
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int hId=rs.getInt("hId");
				String hPart=rs.getString("hPart");
				String hImg=rs.getString("hImg");
				String hName=rs.getString("hName");
				String hAddress=rs.getString("hAddress");
				String hDepartment=rs.getString("hDepartment");
				String hDescription=rs.getString("hDescription");
				String hDomain=rs.getString("hDomain");
				String hLongitude=rs.getString("hLongitude");
				String hLatitude=rs.getString("hLatitude");
				list.add(new HealthDTO(hId,hPart,hImg,hName,hAddress,hDepartment,hDescription,hDomain, hLongitude, hLatitude));
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
	public ArrayList<HealthDTO> HDepartmentList(String department){
		ArrayList<HealthDTO> list=new ArrayList<>();
		String query="Select * from hospital where hDepartment like ? order by hId asc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,"%" + department + "%");
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int hId=rs.getInt("hId");
				String hPart=rs.getString("hPart");
				String hImg=rs.getString("hImg");
				String hName=rs.getString("hName");
				String hAddress=rs.getString("hAddress");
				String hDepartment=rs.getString("hDepartment");
				String hDescription=rs.getString("hDescription");
				String hDomain=rs.getString("hDomain");
				String hLongitude=rs.getString("hLongitude");
				String hLatitude=rs.getString("hLatitude");
				list.add(new HealthDTO(hId,hPart,hImg,hName,hAddress,hDepartment,hDescription,hDomain, hLongitude, hLatitude));			}
				
		} catch (Exception e) {
			
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
			close(rs);
		}
		
		
		
		return list;
		
	}
	
	
	
	
	public int HospitalCreate(HealthDTO dto) {
		int result=0;
		String query="Insert into hospital(hId,hPart,hImg,hName,hAddress,hDepartment,hDescription,hDomain,hLongitude,hLatitude)values(hospital_seq.nextval,?,?,?,?,?,?,?,?,?)";
		try {
			conn=ds.getConnection();
			
			
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,dto.gethPart());
			pstmt.setString(2,dto.gethImg());
			pstmt.setString(3, dto.gethName());
			pstmt.setString(4, dto.gethAddress());
			pstmt.setString(5, dto.gethDepartment());
			pstmt.setString(6, dto.gethDescription());
			pstmt.setString(7, dto.gethDomain());
			pstmt.setString(8, dto.gethLongitude());
			pstmt.setString(9, dto.gethLatitude());
			result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
		
		
		
	
		return result;
		
	}
	

	public int HospitalUpdate(HealthDTO dto) {
		int result=0;
	    String sql = "UPDATE hospital SET  hPart=?,hImg =?,hName =?,hAddress=?,hDepartment=?,hDescription=?,hDomain=?, hLongitude=?,hLatitude=? WHERE hId = ?";
	    try {
			conn=ds.getConnection();

	    	PreparedStatement pstmt = conn.prepareStatement(sql);
		    pstmt.setString(1, dto.gethPart());
		    pstmt.setString(2, dto.gethImg());
		    pstmt.setString(3, dto.gethName());
		    pstmt.setString(4, dto.gethAddress());
		    pstmt.setString(5, dto.gethDepartment());
		    pstmt.setString(6, dto.gethDescription());
		    pstmt.setString(7, dto.gethDomain());
		    pstmt.setString(8, dto.gethLongitude());
		    pstmt.setString(9, dto.gethLatitude());

		    pstmt.setInt(10,dto.gethId());
		    
		    result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
	    return result;
	    
	}
	
	public int Hospitaldelete(int hId) {
		int result=0;
	    String sql = "DELETE FROM hospital WHERE hId = ?";
	    try {
			conn=ds.getConnection();

	    	PreparedStatement pstmt = conn.prepareStatement(sql);
		    pstmt.setInt(1, hId);
		    result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
	    return result;
	    
	}
	
	public HealthDTO showMyHospital(String name){//인수에 병원이름//자신의 병원정보조회
		HealthDTO request = null;

		String query="Select * from hospital where hName=?";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			//
			pstmt.setString(1, name);
			rs=pstmt.executeQuery();
			 
			 if (rs.next()) {
				 int hId=rs.getInt("hId");
					String hPart=rs.getString("hPart");
					String hImg=rs.getString("hImg");
					String hName=rs.getString("hName");
					String hAddress=rs.getString("hAddress");
					String hDepartment=rs.getString("hDepartment");
					String hDescription=rs.getString("hDescription");
					String hDomain=rs.getString("hDomain");
					String hLongitude=rs.getString("hLongitude");
					String hLatitude=rs.getString("hLatitude");
					request=new HealthDTO(hId,hPart,hImg,hName,hAddress,hDepartment,hDescription,hDomain, hLongitude, hLatitude);			
				
				 
			 }
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
			close(rs);
		}
		
		
		
		return request;
		
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
