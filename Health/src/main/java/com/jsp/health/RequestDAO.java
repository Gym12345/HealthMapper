
package com.jsp.health;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

//reqId number(5) default 0 primary key,
//reqPart nvarchar2(20) not null,
//reqImg nvarchar2(40) not null,
//reqName nvarchar2(40) not null,
//reqAddress nvarchar2(60) not null,
//reqDepartMent nvarchar2(60) not null,
//reqDescription nvarchar2(60) not null,
//reqDomain nvarchar2(60) not null
public class RequestDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private RequestDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static RequestDAO instance=new RequestDAO();
	
	public static RequestDAO getInstance() {
		return instance;
	}
	
	public ArrayList<RequestDTO> RequestList(){
		ArrayList<RequestDTO> list=new ArrayList<>();
		String query="Select * from hospitalRequest order by reqId asc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int reqId=rs.getInt("reqId");
				String reqPart=rs.getString("reqPart");
				String reqImg=rs.getString("reqImg");
				String reqName=rs.getString("reqName");
				String reqAddress=rs.getString("reqAddress");
				String reqDepartMent=rs.getString("reqDepartMent");
				String reqDescription=rs.getString("reqDescription");
				String reqDomain=rs.getString("reqDomain");
				String reqLongitude=rs.getString("reqLongitude");
				String reqLatitude=rs.getString("reqLatitude");
				list.add(new RequestDTO(reqId,reqPart,reqImg,reqName,reqAddress,reqDepartMent,reqDescription,reqDomain, reqLongitude, reqLatitude));
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
	public RequestDTO RequestOne(int id) {
	    RequestDTO request = null;
	    String query = "SELECT * FROM hospitalRequest WHERE reqId=?";
	    try {
	        conn = ds.getConnection();
	        pstmt = conn.prepareStatement(query);
	        pstmt.setInt(1, id);
	        rs = pstmt.executeQuery();

	        if (rs.next()) {
	            int reqId = rs.getInt("reqId");
	            String reqPart = rs.getString("reqPart");
	            String reqImg = rs.getString("reqImg");
	            String reqName = rs.getString("reqName");
	            String reqAddress = rs.getString("reqAddress");
	            String reqDepartMent = rs.getString("reqDepartMent");
	            String reqDescription = rs.getString("reqDescription");
	            String reqDomain = rs.getString("reqDomain");
	            String reqLongitude=rs.getString("reqLongitude");
				String reqLatitude=rs.getString("reqLatitude");
				request=new RequestDTO(reqId,reqPart,reqImg,reqName,reqAddress,reqDepartMent,reqDescription,reqDomain, reqLongitude, reqLatitude);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        close(conn);
	        close(pstmt);
	        close(rs);
	    }
	    return request;
	}
	
	
	public int RequestCreate(RequestDTO dto) {
		int result=0;
		String query="INSERT INTO hospitalRequest (reqId, reqPart, reqImg, reqName, reqAddress, reqDepartMent, reqDescription, reqDomain,reqLongitude,reqLatitude) values(hospitalRequest_seq.nextval,?,?,?,?,?,?,?,?,?)";
		try {
			conn=ds.getConnection();
			
			
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,dto.getReqPart());
			pstmt.setString(2,dto.getReqImg());
			pstmt.setString(3,dto.getReqName());
			pstmt.setString(4,dto.getReqAddress());
			pstmt.setString(5,dto.getReqDepartMent());
			pstmt.setString(6,dto.getReqDescription());
			pstmt.setString(7,dto.getReqDomain());
			pstmt.setString(8, dto.getReqLongitude());
			pstmt.setString(9, dto.getReqLatitude());

			result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
		
		
		
	
		return result;
		
	}
	
	
	public int RequestInsertToHospital(RequestDTO dto) {
		int result=0;
		String query="Insert into hospital(hId,hPart,hImg,hName,hAddress,hDepartment,hDescription,hDomain,hLongitude,hLatitude)values(hospital_seq.nextval,?,?,?,?,?,?,?,?,?)";
		try {
			conn=ds.getConnection();
			
			
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1,dto.getReqPart());
			pstmt.setString(2,dto.getReqImg());
			pstmt.setString(3, dto.getReqName());
			pstmt.setString(4, dto.getReqAddress());
			pstmt.setString(5, dto.getReqDepartMent());
			pstmt.setString(6, dto.getReqDescription());
			pstmt.setString(7, dto.getReqDomain());
			pstmt.setString(8, dto.getReqLongitude());
			pstmt.setString(9, dto.getReqLatitude());

			result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			close(conn);
			close(pstmt);
		
		}
		
		
		
	
		return result;
		
	}
	public int Requestdelete(int id) {
		int result=0;
	    String sql = "DELETE FROM hospitalRequest WHERE reqId = ?";
	    try {
			conn=ds.getConnection();

	    	PreparedStatement pstmt = conn.prepareStatement(sql);
		    pstmt.setInt(1, id);
		    result=pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
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
