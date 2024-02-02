package com.jsp.health;
//?��?��(gId,hPart,gNumber,gQuery)

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DecimalFormat;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DistanceDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	private DistanceDAO(){
		try {
			Context context=new InitialContext();
			ds=(DataSource) context.lookup("java:comp/env/jdbc/oracle");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	private static DistanceDAO instance=new DistanceDAO();
	
	public static DistanceDAO getInstance() {
		return instance;
	}

	public double GiveDistance(double userLongitude, double userLatitude, int hospitalId) {
	    String query = "SELECT hLongitude, hLatitude FROM hospital WHERE hId=?";
		double distanceInKilometers = 0;
		
	    try {
	        conn = ds.getConnection();
	        pstmt = conn.prepareStatement(query);
	        pstmt.setInt(1, hospitalId);
	        rs = pstmt.executeQuery();
	        
	        if (rs.next()) {
	            String hospitalLongitude = rs.getString("hLongitude");
	            String hospitalLatitude = rs.getString("hLatitude");

	            // Convert latitude and longitude from strings to doubles
	            double hospitalLatitudeInDouble = Double.parseDouble(hospitalLatitude);
	            double hospitalLongitudeInDouble = Double.parseDouble(hospitalLongitude);

	            // Calculate the distance between the user's location and the hospital's location
	            distanceInKilometers = calculateDistance(userLatitude, userLongitude, hospitalLatitudeInDouble, hospitalLongitudeInDouble);

	          
	        }
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        close(conn);
	        close(pstmt);
	        close(rs);
	    }
	    DecimalFormat df = new DecimalFormat("#.##");
	    return Double.valueOf(df.format(distanceInKilometers));
	}

	private double calculateDistance(double userLatitude, double userLongitude, double hospitalLatitude, double hospitalLongitude) {
	    final double R = 6371e3; // Earth's radius in meters
	    double lat1 = Math.toRadians(userLatitude);
	    double lat2 = Math.toRadians(hospitalLatitude);
	    double latDiff = Math.toRadians(hospitalLatitude - userLatitude);
	    double longDiff = Math.toRadians(hospitalLongitude - userLongitude);

	    double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
	            + Math.cos(lat1) * Math.cos(lat2)
	            * Math.sin(longDiff / 2) * Math.sin(longDiff / 2);
	    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    double distanceInMeters = R * c; // distance in meters
	    
	    // Convert meters to kilometers
	    double distanceInKilometers = distanceInMeters / 1000.0;
	    
	    return distanceInKilometers;
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

