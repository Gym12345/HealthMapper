package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.jsp.health.UserDAO;


@WebServlet("/Health1/LoginControllerForJson")
public class LoginControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	 private UserDAO dao;
	 public void init() {
	    	dao = UserDAO.getInstance();
	    }
	    
	 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		    HttpSession session = request.getSession(); // 미리 세션 생성
		    
		    
		    // **CORS 코드 추가**
	        response.addHeader("Access-Control-Allow-Origin", "*");
	        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        response.addHeader("Access-Control-Allow-Headers",
	                "Content-Type, Authorization, Origin, Accept, X-Requested-With");
	    	request.setCharacterEncoding("UTF-8");
		    
		    BufferedReader reader = request.getReader();
		    StringBuilder sb = new StringBuilder();
		    String line = null;
		    while ((line = reader.readLine()) != null) {
		        sb.append(line);
		    }
		    
		    JSONObject json = new JSONObject(sb.toString());
		    String userId = json.getString("userId");
		    String userPw = json.getString("userPw");
		    String userClass = json.getString("userClass");

		    System.out.println(userId+userPw+userClass);
		    // Check if the entered data is valid

		    int result = dao.userLogin(userId,userPw,userClass);

		    if (result==1) {
		        // If the login is successful, store the user ID in the session
		        session.setAttribute("userId", userId);
		        session.setAttribute("userClass", userClass);
		        String message = userId+"님 환영합니다";
		        request.setAttribute("message", message);
		        //request.getRequestDispatcher("serviceTiles.jsp").forward(request, response);
		        JSONObject responseData = new JSONObject();
		        responseData.put("success", true); 
		        responseData.put("message", message);
		        
		        // 이 부분은 클라이언트 환경에서 reponse.data에서 user에 관한 정보를 활용하기 위함.
		        // 추후 사용자 인증(토큰)도 필요한데 이 부분도 추가가 필요할 것임.
		        responseData.put("userId", userId); 
		        responseData.put("userPw", userPw);
		        responseData.put("userClass", userClass);
		        
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write(responseData.toString());
		    } else {
		        String message = "로그인 실패";
		        request.setAttribute("message", message);
		        //request.getRequestDispatcher("loginForm.jsp").forward(request, response);
		        JSONObject responseData = new JSONObject();
		        responseData.put("success", false);
		        responseData.put("message", message);
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        response.getWriter().write(responseData.toString());
		    }
		}
       
	}
	


