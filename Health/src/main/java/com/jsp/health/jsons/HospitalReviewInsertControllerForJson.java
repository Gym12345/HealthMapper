package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;


@WebServlet("/Health1/HospitalReviewInsertControllerForJson")
public class HospitalReviewInsertControllerForJson extends HttpServlet {
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

            JSONObject jsonObject = new JSONObject(sb.toString());

	        String hName = jsonObject.getString("hName");
	        String userId = jsonObject.getString("userId");
	        String hrComment = jsonObject.getString("hrComment");
	        int hrRate = jsonObject.getInt("hrRate");

	        ReviewDTO reviewDTO = new ReviewDTO();
	        reviewDTO.sethName(hName);
	        reviewDTO.setUserId(userId);
	        reviewDTO.setHrComment(hrComment);
	        reviewDTO.setHrRate(hrRate);

            System.out.println(hName+userId+ hrComment+hrRate);
            
	        int result = dao.ReviewCreate(reviewDTO);

	        if (result == 1) {
	            JSONObject responseJson = new JSONObject();
	            responseJson.put("message", "리뷰등록 성공");
	            response.getWriter().write(responseJson.toString());
	        } else {
	            JSONObject responseJson = new JSONObject();
	            responseJson.put("message", "리뷰등록 실패");
	            response.getWriter().write(responseJson.toString());
	        }
		}
       
	}
	


