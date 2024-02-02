package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.jsp.health.RequestDAO;
import com.jsp.health.RequestDTO;


@WebServlet("/Health1/HosOwnersRequestControllerForJson")
public class HosOwnersRequestControllerForJson extends HttpServlet {
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
		    // **CORS 코드 추가**
		    response.addHeader("Access-Control-Allow-Origin", "*");
		    response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		    response.addHeader("Access-Control-Allow-Headers",
		            "Content-Type, Authorization, Origin, Accept, X-Requested-With");

		    // Handle form submission
		    request.setCharacterEncoding("UTF-8");

		    // JSON 파싱
		    BufferedReader reader = request.getReader();
		    String line;
		    StringBuilder sb = new StringBuilder();
		    while ((line = reader.readLine()) != null) {
		        sb.append(line);
		    }
		    JSONObject jsonObject = new JSONObject(sb.toString());

		    String reqImg = jsonObject.getString("reqImg");
		    String reqName = jsonObject.getString("reqName");
		    String reqPart = jsonObject.getJSONArray("reqPart").toString();
		    reqPart = reqPart.replaceAll("\\[|\\]|\"", ""); // 괄호와 따옴표 제거
		    String reqAddress = jsonObject.getString("reqAddress");
		    String reqDepartment = jsonObject.getJSONArray("reqDepartment").toString();
		    reqDepartment = reqDepartment.replaceAll("\\[|\\]|\"", ""); // 괄호와 따옴표 제거
		    reqDepartment += ",모든병원";
		    String reqDescription = jsonObject.getString("reqDescription");
		    String reqDomain = jsonObject.getString("reqDomain");
		    String reqLongitude = jsonObject.getString("reqLongitude");
		    String reqLatitude = jsonObject.getString("reqLatitude");

		    System.out.println(reqName+reqAddress+reqDomain+reqDescription+reqImg+reqPart+reqDepartment+reqLatitude+reqLongitude);

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
		    

		    if (result == 1) {
		        String message = "병원등록성공";
		        request.setAttribute("message", message);
		        
		        JSONObject responseData = new JSONObject();
		        responseData.put("message", message); 
		        responseData.put("reqName", reqName);

		        System.out.println(reqName);
			    response.setContentType("application/json");
			    response.setCharacterEncoding("UTF-8");
		        response.getWriter().write(responseData.toString());
		    } else if (result == 0){
		        String message = "병원등록실패";
		        request.setAttribute("message", message);
		        JSONObject responseData = new JSONObject();
		        responseData.put("message", message);

			    response.setContentType("application/json");
			    response.setCharacterEncoding("UTF-8");
		        response.getWriter().write(responseData.toString());
		    }
	        
	        
	    
	}

}




