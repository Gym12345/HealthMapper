package com.jsp.health;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class hCareDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private hCareDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static hCareDAO instance=new hCareDAO();
	
	public static hCareDAO getInstance() {
		return instance;
	}

	public ArrayList<hCareDTO> HealthCareMemoList(String user){
		ArrayList<hCareDTO> list=new ArrayList<>();
		String query="Select * from selfHealthCare where hcUser=? order by hcId asc";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setString(1, user);
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				int hcId=rs.getInt("hcId");
				int hcYear=rs.getInt("hcYear");
				int hcMonth=rs.getInt("hcMonth");
				int hcDate=rs.getInt("hcDate");
				String hcUser=rs.getString("hcUser");
				String hcMemo=rs.getString("hcMemo");
				
				list.add(new hCareDTO(hcId, hcYear, hcMonth, hcDate, hcUser, hcMemo));
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
	
	public hCareDTO showMemo(int year,int month,int date,String user){
		hCareDTO request = null;

		String query="Select * from selfHealthCare where hcYear=? AND hcMonth=? AND hcDate=? AND hcUser=?";
		try {
			conn=ds.getConnection();
			pstmt=conn.prepareStatement(query);
			pstmt.setInt(1,year);
			pstmt.setInt(2,month);
			pstmt.setInt(3,date);
			pstmt.setString(4, user);
			rs=pstmt.executeQuery();
			 
			 if (rs.next()) {
				 	int hcId=rs.getInt("hcId");
				 	int hcYear=rs.getInt("hcYear");
				 	int hcMonth=rs.getInt("hcMonth");
				 	int hcDate=rs.getInt("hcDate");
				 	String hcUser=rs.getString("hcUser");
				 	
				 	String hcMemo=rs.getString("hcMemo");

					request=new hCareDTO(hcId, hcYear, hcMonth, hcDate,hcUser,hcMemo);
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
	
	public int MemoCreate(int year, int month, int date, String memo,String user) {
        int result = 0;
        String query = "INSERT INTO selfHealthCare(hcId,hcYear, hcMonth, hcDate, hcMemo,hcUser) VALUES (selfHealthCare_seq.nextval,?, ?, ?, ?, ?)";
        try {
            conn = ds.getConnection();
            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, year);
            pstmt.setInt(2, month);
            pstmt.setInt(3, date);
            pstmt.setString(4, memo);
            pstmt.setString(5,user);

            result = pstmt.executeUpdate();
           
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            close(conn);
            close(pstmt);
        }
        return result;
    }
	
	public int MemoUpdate(String memo,int id) {
	    int result = 0;
	    String query = "UPDATE selfHealthCare SET hcMemo=? WHERE hcId=?";
	    try {
	        conn = ds.getConnection();
	        pstmt = conn.prepareStatement(query);
	        pstmt.setString(1, memo);
	        pstmt.setInt(2, id);
	        

	        result = pstmt.executeUpdate();
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        try {
	            if (pstmt != null) {
	                pstmt.close();
	            }
	            if (conn != null) {
	                conn.close();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	    return result;
	}
	
	public int MemoDelete(int id) {
	    int result = 0;
	    String query = "DELETE FROM selfHealthCare WHERE hcId=?";
	    try {
	        conn = ds.getConnection();
	        pstmt = conn.prepareStatement(query);
	        pstmt.setInt(1, id);
	      
	        result = pstmt.executeUpdate();
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        try {
	            if (pstmt != null) {
	                pstmt.close();
	            }
	            if (conn != null) {
	                conn.close();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
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
