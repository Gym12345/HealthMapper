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


@WebServlet("/Health1/ShowMyReviewNormalController")
public class ShowMyReviewNormalController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	 private ReviewDAO dao;

		public void init() {
			dao = ReviewDAO.getInstance();
	    }

    
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userId=(String) request.getSession().getAttribute("userId");
		
		request.getSession().setAttribute("userId", userId);
		
	
		
		ArrayList<ReviewDTO> myReviewArr=dao.NormalShowReviewList(userId);
	    request.setAttribute("myReviewArr", myReviewArr);
		request.getRequestDispatcher("MyReviewList.jsp").forward(request, response);

		
	}
	
	

}
