package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;


@WebServlet("/Health1/HospitalReviewListControllerForJson")
public class HospitalReviewListControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 private ReviewDAO dao;
	 public void init() {
	    	dao = ReviewDAO.getInstance();
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
		    String hName = json.getString("hName");
		    request.getSession().setAttribute("hName", hName);

		    ArrayList<ReviewDTO> reviewArr = dao.HospitalReviewList(hName);
		    System.out.println(reviewArr.toString());

		    // Create a JSON array to hold the review data
		    JSONArray reviewArrJson = new JSONArray();
		    // Loop through each review and add it to the JSON array
		    for (ReviewDTO review : reviewArr) {
		        JSONObject reviewJson = new JSONObject();
		        reviewJson.put("hrId", review.getHrId());
		        reviewJson.put("hName", review.gethName());
		        reviewJson.put("userId", review.getUserId());
		        reviewJson.put("hrComment", review.getHrComment());
		        reviewJson.put("hrRate", review.getHrRate());
		        reviewArrJson.put(reviewJson);
		    }

		    JSONObject responseData = new JSONObject();

		    responseData.put("reviewArr", reviewArrJson);
		    // Write the JSON data to the response
		    response.getWriter().write(responseData.toString());
		}





	
       
	}
	


