package com.jsp.health.controllers;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;


@WebServlet("/Health1/HospitalReviewListController")
public class HospitalReviewListController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hName=request.getParameter("hName");
		request.getSession().setAttribute("hName", hName);
		
	    ReviewDAO dao = ReviewDAO.getInstance();
	    ArrayList<ReviewDTO> reviewArr = dao.HospitalReviewList(hName);
	    
	    String currentUrl = request.getRequestURL().toString();
		System.out.println(currentUrl);
		request.getSession().setAttribute("prevUrl", currentUrl);
		
	    request.setAttribute("reviewArr", reviewArr);
		request.getRequestDispatcher("hospitalReviewList.jsp").forward(request, response);
	}
	
	
	
	

}
