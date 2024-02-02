package com.jsp.health.controllers;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.DistanceDAO;
import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;
import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;


@WebServlet("/Health1/DistanceController")
public class DistanceController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 private DistanceDAO dao;
	 public void init() {
	    	dao = DistanceDAO.getInstance();
	    }
	    
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        request.getRequestDispatcher("testDistance.jsp").forward(request, response);

	    	
	    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		String id = request.getParameter("hId");
		int hId = Integer.parseInt(id);
		
		String longitude = request.getParameter("userLongitude");
		double userLongitude = Double.parseDouble(longitude);
		
		String latitude = request.getParameter("userLatitude");
		double userLatitude = Double.parseDouble(latitude);	
	    double distance = dao.GiveDistance(userLongitude, userLatitude, hId);
	    request.setAttribute("distance", distance);
        request.getRequestDispatcher("showDistance.jsp").forward(request, response);

        }
	
       
	}
	


