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
import com.jsp.health.hCareDAO;
import com.jsp.health.hCareDTO;


@WebServlet("/Health1/HealthCareMemoListController")
public class HealthCareMemoListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
  

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		String year=request.getParameter("hcYear");
//		int hcYear=Integer.parseInt(year);
//		String month=request.getParameter("hcMonth");
//		int hcMonth=Integer.parseInt(month);
//		String date=request.getParameter("hcDate");
//		int hcDate=Integer.parseInt(date);
//		String hcMemo=request.getParameter("hcMemo");
		
		String hcUser=request.getParameter("hcUser");
		request.getSession().setAttribute("hcUser", hcUser);
		
		hCareDAO dao = hCareDAO.getInstance();
	    ArrayList<hCareDTO> hcareArr = dao.HealthCareMemoList(hcUser);
	    request.setAttribute("hcareArr", hcareArr);
		request.getRequestDispatcher("hCareCalendar.jsp").forward(request, response);
	}

}
