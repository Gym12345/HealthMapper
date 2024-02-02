package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;


import com.jsp.health.hCareDAO;

@WebServlet("/Health1/HealthCareMemoCreateControllerForJson")
public class HealthCareMemoCreateControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private hCareDAO dao;
	    
	    public void init() {
	        // Initialize the DAO
	    	dao = hCareDAO.getInstance();
	    }
	    
	 
	    
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	// **CORS 코드 추가**
	        response.addHeader("Access-Control-Allow-Origin", "*");
	        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        response.addHeader("Access-Control-Allow-Headers",
	                "Content-Type, Authorization, Origin, Accept, X-Requested-With");
	    	request.setCharacterEncoding("UTF-8");
	    	response.setContentType("application/json");
	        response.setCharacterEncoding("UTF-8");
	    	
	    	BufferedReader reader = request.getReader();
	        StringBuilder sb = new StringBuilder();
	        String line = null;
	        while ((line = reader.readLine()) != null) {
	            sb.append(line);
	        }

	        JSONObject json = new JSONObject(sb.toString());
	        
	        String hcUser = json.getString("hcUser");		
	        String hcMemo = json.getString("hcMemo");		
	        int hcYear = json.getInt("hcYear");		
	        int hcMonth = json.getInt("hcMonth");		
	        int hcDate = json.getInt("hcDate");		
	        
	        System.out.println(hcUser + hcMemo + hcYear + hcMonth + hcDate);	    	
	    	request.getSession().setAttribute("hcUser", hcUser);

	    	
	    	int result=dao.MemoCreate(hcYear, hcMonth, hcDate, hcMemo, hcUser);
	    	if(result==1) {
	    		String message = "메모 등록에 성공했습니다.";
	        	request.setAttribute("message", message);
		        JSONObject responseData = new JSONObject();
		        responseData.put("message", message);
		        responseData.put("success", true); 
		        response.getWriter().write(responseData.toString());
	        	
	    	}
	    	else {
	    		String message = "메모 등록에 실패했습니다.";
	        	request.setAttribute("message", message);
		        JSONObject responseData = new JSONObject();
		        responseData.put("message", message);
		        responseData.put("success", false); 
		        response.getWriter().write(responseData.toString());

	    		
	    	}
	    }
	}

