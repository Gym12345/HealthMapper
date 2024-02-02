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


@WebServlet("/Health1/BodyPartsController")
public class BodyPartsController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private HealthDAO dao;

		public void init() {
			dao = HealthDAO.getInstance();
	    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String part=request.getParameter("part");
		request.getSession().setAttribute("part", part);
		
		String department=request.getParameter("department");
		request.getSession().setAttribute("department", department);
		
		String currentUrl = request.getRequestURL().toString();
		System.out.println(currentUrl);
		request.getSession().setAttribute("prevUrl", currentUrl);
		
		
		
		
	    HealthDAO dao = HealthDAO.getInstance();
	    ArrayList<HealthDTO> healthArr = dao.HPartList(part);
	    
	    request.setAttribute("healthArr", healthArr);
		request.getRequestDispatcher("parts.jsp").forward(request, response);
		
	}
	
	
	

}
