package com.jsp.health.controllers;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;
import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;


@WebServlet("/Health1/HospitalReviewInsertController")
public class HospitalReviewInsertController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 private ReviewDAO dao;
	 public void init() {
	    	dao = ReviewDAO.getInstance();
	    }
	    
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Display the insert form
	        request.getRequestDispatcher("hospitalReviewInsertForm.jsp").forward(request, response);
	    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
        String hName = request.getParameter("hName");
        String userId = request.getParameter("userId");
        String hrComment = request.getParameter("hrComment");
        int hrRate = Integer.parseInt(request.getParameter("hrRate"));
     
        	
        	ReviewDTO reviewDTO = new ReviewDTO();
        	reviewDTO.sethName(hName);
        	reviewDTO.setUserId(userId);
        	reviewDTO.setHrComment(hrComment);
        	reviewDTO.setHrRate(hrRate);
        	
	        int result = dao.ReviewCreate(reviewDTO);
	        
	        if (result == 1) {
	        	
	        	String message = "리뷰등록성공";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalReviewList.jsp").forward(request, response);
	        	
	        } else {
	        	String message = "리뷰등록실패";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalReviewList.jsp").forward(request, response);
	        }
        }
	
       
	}
	


