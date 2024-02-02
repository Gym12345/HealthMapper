package com.jsp.health.controllers;

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;
import com.jsp.health.RequestDAO;
import com.jsp.health.RequestDTO;


@WebServlet("/Health1/HosOwnersRequestListController")
public class HosOwnersRequestListController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private RequestDAO dao;

		public void init() {
			dao = RequestDAO.getInstance();
	    }
		
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	    
		RequestDAO dao = RequestDAO.getInstance();
	    ArrayList<RequestDTO> RequestArr = dao.RequestList();
	    
	    request.getSession().setAttribute("RequestArr", RequestArr);
	    request.getRequestDispatcher("HosOwnersRequestList.jsp").forward(request, response);
		
	}
	
	
	

}
