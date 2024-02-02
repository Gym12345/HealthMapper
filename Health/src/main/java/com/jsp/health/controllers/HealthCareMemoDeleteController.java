package com.jsp.health.controllers;

import java.io.IOException;
import java.net.URLEncoder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.hCareDAO;


@WebServlet("/Health1/HealthCareMemoDeleteController")
public class HealthCareMemoDeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 private hCareDAO dao;

	public void init() {
        // Initialize the DAO
		dao = hCareDAO.getInstance();
    }
    
	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        String id = request.getParameter("hcId");
	        int hcId = Integer.parseInt(id);
	        
	        String hcUser=(String) request.getSession().getAttribute("hcUser");
	        

	       
	        int result = dao.MemoDelete(hcId);
	        
	        if (result == 1 ) {
	        	System.out.println("delete successed");
	        	response.sendRedirect("HealthCareMemoListController?hcUser="+hcUser);
	        }
	        else {
	        	System.out.println("delete failed");
	        	response.sendRedirect("HealthCareMemoListController?hcUser="+hcUser);
	        }
	        
	        
	    }
	 
	  	//추가로 삭제시 리뷰까지 다 삭제 시키는것까지하기
	}


