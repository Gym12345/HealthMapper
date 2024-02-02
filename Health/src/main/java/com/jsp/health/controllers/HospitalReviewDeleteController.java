package com.jsp.health.controllers;

import java.io.IOException;
import java.net.URLEncoder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.ReviewDAO;


@WebServlet("/Health1/HospitalReviewDeleteController")
public class HospitalReviewDeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 private ReviewDAO dao;

	public void init() {
        // Initialize the DAO
		dao = ReviewDAO.getInstance();
    }
    
	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        String Id = request.getParameter("hrId");
	        int hrId = Integer.parseInt(Id);
	        String hName=(String)request.getSession().getAttribute("hName");
	        String encodedhName = URLEncoder.encode(hName, "UTF-8") ;
	        
	        String userId=(String)request.getSession().getAttribute("userId");
	        String encodedUserId = URLEncoder.encode(userId, "UTF-8") ;
	        String prevUrl=(String) request.getSession().getAttribute("prevUrl");

	        int result=dao.Reviewdelete(hrId);

	        System.out.println(encodedhName+encodedUserId +prevUrl);
	        if (result == 1 && prevUrl.contains("HospitalReviewListController")) {
	        	System.out.println("Reviewdelete successed");
	            response.sendRedirect("hospitalReviewList.jsp?hName=" + encodedhName);
	        } 
	        else if(result == 1 && prevUrl.contains("ShowMyReviewNormalController")){
	        	System.out.println("Reviewdelete successed");
	            response.sendRedirect("MyReviewList.jsp?userId=" + encodedUserId);
	        	
	        		}
	        
	        
	        else if (result == 0 && prevUrl.contains("HospitalReviewListController")) {
	        	System.out.println("Reviewdelete successed");
	            response.sendRedirect("hospitalReviewList.jsp?hName=" + encodedhName);
	     }
	        else if (result == 0 && prevUrl.contains("ShowMyReviewNormalController")) {
	        	System.out.println("Reviewdelete successed");
	            response.sendRedirect("MyReviewList.jsp?userId=" + encodedUserId);
	        	
	        		  }
	        
	        
	    }
	        
	       
	        
	        
	    }
	 
	  	//추가로 삭제시 리뷰까지 다 삭제 시키는것까지하기



