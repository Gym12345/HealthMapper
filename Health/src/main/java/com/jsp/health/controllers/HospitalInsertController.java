package com.jsp.health.controllers;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;

//예외처리까지 완료 
@WebServlet("/Health1/HospitalInsertController")
public class HospitalInsertController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private HealthDAO dao;
	    
	    public void init() {
	        // Initialize the DAO
	    	dao = HealthDAO.getInstance();
	    }
	    
	    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Display the insert form
	        request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	    }
	    
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Handle form submission
	    	request.setCharacterEncoding("UTF-8");
	        String hImg = request.getParameter("hImg");
	        String hName = request.getParameter("hName");
	        String hAddress = request.getParameter("hAddress");
	        String hPart = request.getParameter("hPart");
	        String hDepartment = request.getParameter("hDepartment");
	        String hDescription = request.getParameter("hDescription");
	        String hDomain = request.getParameter("hDomain");
	        String hLongitude=request.getParameter("hLongitude");
	        String hLatitude=request.getParameter("hLatitude");

	        if(hImg.equals("")) {
	        	String message = "이미지를 삽입해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }
	        else if(hName.equals("")) {
	        	String message = "이름을 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }
	        else if(hAddress.equals("")) {
	        	String message = "주소를 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }
	        else if(hPart.equals("")) {
	        	String message = "부위를 선택해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }else if(hDepartment.equals("")) {
	        	String message = "진료과 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }else if(hDescription.equals("")) {
	        	String message = "병원설명 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }else if(hDomain.equals("")) {
	        	String message = "병원사이트주소를 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }else if(hLongitude.equals("")) {
	        	String message = "경도 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }else if(hLatitude.equals("")) {
	        	String message = "위도 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("hospitalInsertForm.jsp").forward(request, response);
	            
	        }
	        
	        else {
	        	HealthDTO healthDTO = new HealthDTO();
		        healthDTO.sethImg(hImg);
		        healthDTO.sethName(hName);
		        healthDTO.sethAddress(hAddress);
		        healthDTO.sethPart(hPart);
		        healthDTO.sethDepartment(hDepartment);
		        healthDTO.sethDescription(hDescription);
		        healthDTO.sethDomain(hDomain);
		        healthDTO.sethLongitude(hLongitude);
		        healthDTO.sethLatitude(hLatitude);
		        int result = dao.HospitalCreate(healthDTO);
		        String prevUrl=(String) request.getSession().getAttribute("prevUrl");
		        
		        if (result == 1 && prevUrl.contains("BodyPartsController")) {
		        	
		        	String message = "병원등록성공";
		        	request.setAttribute("message", message);
		            request.getRequestDispatcher("bodyparts.jsp").forward(request, response);
		        	
		        	
		        }else if(result == 1 && prevUrl.contains("MedicalDepartmentListController")){
		        	
		        	String message = "병원등록성공";
		        	request.setAttribute("message", message);
		            request.getRequestDispatcher("medicalDepartment.jsp").forward(request, response);
		            		
		        	
		        }		
		        	else  if (result == 0 && prevUrl.contains("BodyPartsController")){
		        		String message = "병원등록실패";
			        	request.setAttribute("message", message);
			            request.getRequestDispatcher("bodyparts.jsp").forward(request, response);
		        }
		        	else  if (result == 0 && prevUrl.contains("MedicalDepartmentListController")){
			        	String message = "병원등록실패";
			        	request.setAttribute("message", message);
			            request.getRequestDispatcher("medicalDepartment.jsp").forward(request, response);
			        }
		        
		        
		        
		        
		        
		        
		       
	        }
	        
	    }
	}

