package com.jsp.health.controllers;

import java.io.IOException;
import java.net.URLEncoder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;


@WebServlet("/Health1/HospitaldeleteController")
public class HospitaldeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 private HealthDAO dao;

	public void init() {
        // Initialize the DAO
		dao = HealthDAO.getInstance();
    }
    
	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        String Id = request.getParameter("hId");
	        int hId = Integer.parseInt(Id);

	        
	        String part = (String) request.getSession().getAttribute("part");
	        String encodedPart = part != null ? URLEncoder.encode(part, "UTF-8") : "";
	                
	        String department = (String) request.getSession().getAttribute("department");
	        String encodedDepartment = department != null ? URLEncoder.encode(department, "UTF-8") : "";
	        

	        String prevUrl=(String) request.getSession().getAttribute("prevUrl");
	       
	        int result = dao.Hospitaldelete(hId);
	        
	        if (result == 1 && prevUrl.contains("BodyPartsController")) {
	        	System.out.println("Hospitaldelete successed");
	            response.sendRedirect("parts.jsp?part=" + encodedPart);
	        }else if(result == 1 && prevUrl.contains("MedicalDepartmentListController")) {
	        	System.out.println("Hospitaldelete successed");
	            response.sendRedirect("medicalDepartmentList.jsp?department=" + encodedDepartment);
	        }
	        
	        else if (result == 0 && prevUrl.contains("BodyPartsController")) {
	        	System.out.println("Hospitaldelete failed");
	            response.sendRedirect("parts.jsp?part=" + encodedPart);
	        }
	        else if (result == 0 && prevUrl.contains("MedicalDepartmentListController")) {
	        	System.out.println("Hospitaldelete failed");
	            response.sendRedirect("medicalDepartmentList.jsp?department=" + encodedDepartment);
	        }
	        
	        
	    }
	 
	  	//추가로 삭제시 리뷰까지 다 삭제 시키는것까지하기
	}


