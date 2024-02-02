package com.jsp.health.controllers;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.jsp.health.RequestDAO;
import com.jsp.health.RequestDTO;


@WebServlet("/Health1/HosOwnersRequestController")
public class HosOwnersRequestController extends HttpServlet {
	private static final long serialVersionUID = 1L;


	private RequestDAO dao;
    
    public void init() {
        // Initialize the DAO
    	dao = RequestDAO.getInstance();
    }

	
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Display the insert form
	        request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	    }
	    
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        // Handle form submission
	    	request.setCharacterEncoding("UTF-8");
	        String reqImg = request.getParameter("reqImg");
	        String reqName = request.getParameter("reqName");
	        String reqPart = request.getParameter("reqPart");

	        String reqAddress = request.getParameter("reqAddress");
	        String reqDepartment = request.getParameter("reqDepartment");
	        String reqDescription = request.getParameter("reqDescription");
	        String reqDomain = request.getParameter("reqDomain");
	        String reqLongitude=request.getParameter("reqLongitude");
	        String reqLatitude=request.getParameter("reqLatitude");

	        if(reqImg.equals("")) {
	        	String message = "이미지를 삽입해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }
	        else if(reqName.equals("")) {
	        	String message = "이름을 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }
	        else if(reqAddress.equals("")) {
	        	String message = "주소를 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }
	        else if(reqPart.equals("")) {
	        	String message = "부위를 선택해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }else if(reqDepartment.equals("")) {
	        	String message = "진료과 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }else if(reqDescription.equals("")) {
	        	String message = "병원설명 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }else if(reqDomain.equals("")) {
	        	String message = "병원사이트주소를 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }
	        else if(reqLongitude.equals("")) {
	        	String message = "경도 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }else if(reqLatitude.equals("")) {
	        	String message = "위도 입력해주세요";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("HosOwnersRequestForm.jsp").forward(request, response);
	            
	        }
	        else {
	        	RequestDTO requestDTO = new RequestDTO();
	        	requestDTO.setReqImg(reqImg);
	        	requestDTO.setReqName(reqName);
	        	requestDTO.setReqAddress(reqAddress);
	        	requestDTO.setReqPart(reqPart);
	        	requestDTO.setReqDepartMent(reqDepartment);
	        	requestDTO.setReqDescription(reqDescription);
	        	requestDTO.setReqDomain(reqDomain);
		        requestDTO.setReqLongitude(reqLongitude);
		        requestDTO.setReqLatitude(reqLatitude);
		        int result = dao.RequestCreate(requestDTO);
		        
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
