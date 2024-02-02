package com.jsp.health.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;
import com.jsp.health.hCareDAO;

//예외처리까지 완료 
@WebServlet("/Health1/HealthCareMemoCreateController")
public class HealthCareMemoCreateController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private hCareDAO dao;
	    
	    public void init() {
	        // Initialize the DAO
	    	dao = hCareDAO.getInstance();
	    }
	    
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Display the insert form
	        request.getRequestDispatcher("hCareInsertForm.jsp").forward(request, response);
	    }
	    
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	request.setCharacterEncoding("UTF-8");
	    	String hcMemo = request.getParameter("hcMemo");
	    	String hcUser=request.getParameter("hcUser");
	    	request.getSession().setAttribute("hcUser", hcUser);

	    	String year=request.getParameter("hcYear");
	    	int hcYear=Integer.parseInt(year);
	    	String month=request.getParameter("hcMonth");
	    	int hcMonth=Integer.parseInt(month);
	    	String date=request.getParameter("hcDate");
	    	int hcDate=Integer.parseInt(date);
	    	System.out.println(hcUser);
	    	System.out.print(hcYear);
	    	int result=dao.MemoCreate(hcYear, hcMonth, hcDate, hcMemo, hcUser);
	    	if(result==1) {
	    		String message = "메모등록성공";
	        	request.setAttribute("message", message);
	        	response.sendRedirect("HealthCareMemoListController?hcUser="+hcUser);
	        	//request.getRequestDispatcher("hCareCalendar.jsp?hcUser="+hcUser).forward(request, response);
	        	
	    	}
	    	else {
	    		String message = "메모등록실패";
	        	request.setAttribute("message", message);
	        	response.sendRedirect("HealthCareMemoListController?hcUser="+hcUser);

	        	//request.getRequestDispatcher("hCareCalendar.jsp?hcUser="+hcUser).forward(request, response);
	    		
	    	}
	    }
	}

