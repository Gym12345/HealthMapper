package com.jsp.health.controllers;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jsp.health.HealthDAO;
import com.jsp.health.UserDAO;
//ULID	NUMBER(5,0)	No
//USERID	NVARCHAR2(20 CHAR)	No
//USERPW	NVARCHAR2(40 CHAR)	No
//USERNAME	NVARCHAR2(40 CHAR)	No
//USERCLASS	NVARCHAR2(40 CHAR)	Yes
//예외처리까지 완료
@WebServlet("/Health1/LoginController")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private UserDAO dao;
    
    public void init() {
        // Initialize the DAO
    	dao = UserDAO.getInstance();
    }
    
    
    
    

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("loginForm.jsp").forward(request, response);
		
	}

//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//	    HttpSession session = request.getSession(); // 미리 세션 생성
//	    
//	    BufferedReader reader = request.getReader();
//	    StringBuilder sb = new StringBuilder();
//	    String line = null;
//	    while ((line = reader.readLine()) != null) {
//	        sb.append(line);
//	    }
//	    
//	    JSONObject json = new JSONObject(sb.toString());
//	    String userId = json.getString("userId");
//	    String userPw = json.getString("userPw");
//	    String userClass = json.getString("userClass");
//
//	    System.out.println(userId+userPw+userClass);
//	    // Check if the entered data is valid
//
//	    int result = dao.userLogin(userId,userPw,userClass);
//
//	    if (result==1) {
//	        // If the login is successful, store the user ID in the session
//	        session.setAttribute("userId", userId);
//	        session.setAttribute("userClass", userClass);
//	        String message = userId+"님 환영합니다";
//	        request.setAttribute("message", message);
//	        //request.getRequestDispatcher("serviceTiles.jsp").forward(request, response);
//	        JSONObject responseData = new JSONObject();
//	        responseData.put("success", true); 
//	        responseData.put("message", message);
//	        
//	        // 이 부분은 클라이언트 환경에서 reponse.data에서 user에 관한 정보를 활용하기 위함.
//	        // 추후 사용자 인증(토큰)도 필요한데 이 부분도 추가가 필요할 것임.
//	        responseData.put("userId", userId); 
//	        responseData.put("userPw", userPw);
//	        responseData.put("userClass", userClass);
//	        
//	        response.setContentType("application/json");
//	        response.setCharacterEncoding("UTF-8");
//	        response.getWriter().write(responseData.toString());
//	    } else {
//	        String message = "로그인 실패";
//	        request.setAttribute("message", message);
//	        //request.getRequestDispatcher("loginForm.jsp").forward(request, response);
//	        JSONObject responseData = new JSONObject();
//	        responseData.put("success", false);
//	        responseData.put("message", message);
//	        response.setContentType("application/json");
//	        response.setCharacterEncoding("UTF-8");
//	        response.getWriter().write(responseData.toString());
//	    }
//	}
	
	
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Get the user input from the login form
		String userId = request.getParameter("userId");
		String userPw = request.getParameter("userPw");
		String userClass = request.getParameter("userClass");
		
		System.out.println(userId+userPw+userClass);
		// Check if the entered data is valid
		
		int result = dao.userLogin(userId,userPw,userClass);
		
		if (result==1) {
		    // If the login is successful, create a session and store the user ID
		    request.getSession().setAttribute("userId", userId);
		    request.getSession().setAttribute("userClass", userClass);
		    String message = userId+"님 환영합니다";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("serviceTiles.jsp").forward(request, response);
		} else {
			
			String message = "로그인 실패";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("loginForm.jsp").forward(request, response);
            
		}
	}

}
