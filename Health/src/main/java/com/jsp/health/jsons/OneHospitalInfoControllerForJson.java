package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;


@WebServlet("/Health1/OneHospitalInfoControllerForJson")
public class OneHospitalInfoControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	 private HealthDAO dao;

		public void init() {
			dao = HealthDAO.getInstance();
	    }

	
		 
		 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers",
                "Content-Type, Authorization, Origin, Accept, X-Requested-With");
	    request.setCharacterEncoding("UTF-8");
	    
	    BufferedReader reader = request.getReader();

	    StringBuilder sb = new StringBuilder();
	    String line = null;
	    while ((line = reader.readLine()) != null) {
	        sb.append(line);
	    }

	    JSONObject json = new JSONObject(sb.toString());
        String hName = json.getString("hName");
        
       System.out.println(hName);
	    
	    
		HealthDTO OneHospitalArr = dao.showMyHospital(hName);
		JSONArray OneHealthArrJson = new JSONArray();
	 
	       JSONObject healthJson = new JSONObject();
	       healthJson.put("id", OneHospitalArr.gethId());
	       healthJson.put("name", OneHospitalArr.gethName());
	       healthJson.put("part", OneHospitalArr.gethPart());
	       healthJson.put("address", OneHospitalArr.gethAddress());
	       healthJson.put("department", OneHospitalArr.gethDepartment());
	       healthJson.put("domain", OneHospitalArr.gethDomain());
	       healthJson.put("image", OneHospitalArr.gethImg());
	       healthJson.put("hLatitude", Double.parseDouble(OneHospitalArr.gethLatitude()));
	       healthJson.put("hLongitude", Double.parseDouble(OneHospitalArr.gethLongitude()));
	       
	       OneHealthArrJson.put(healthJson);
	  
	    JSONObject responseData = new JSONObject();
	    responseData.put("OneHealthArrJson", OneHealthArrJson);

	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(responseData.toString());
		
		
	}

	
	

}
