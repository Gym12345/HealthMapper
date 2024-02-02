package com.jsp.health.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//ULID	NUMBER(5,0)	No
//USERID	NVARCHAR2(20 CHAR)	No
//USERPW	NVARCHAR2(40 CHAR)	No
//USERNAME	NVARCHAR2(40 CHAR)	No
//USERCLASS	NVARCHAR2(40 CHAR)	Yes

import com.jsp.health.UserDAO;
import com.jsp.health.UserDTO;
//ULID	NUMBER(5,0)	No
//USERID	NVARCHAR2(20 CHAR)	No
//USERPW	NVARCHAR2(40 CHAR)	No
//USERNAME	NVARCHAR2(40 CHAR)	No
//USERCLASS	NVARCHAR2(40 CHAR)	Yes
//예외처리 완료
@WebServlet("/Health1/SignUpController")
public class SignUpController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private UserDAO dao;
	
	public void init() throws ServletException {
		dao = UserDAO.getInstance();
	}

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("signUpForm.jsp").forward(request, response);

	}
	
	

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Handle form submission
    	request.setCharacterEncoding("UTF-8");
    	
        String userId = request.getParameter("userId");
        String userPw = request.getParameter("userPw");
        String userName = request.getParameter("userName");
        String userClass= request.getParameter("userClass");
        
       
        
        if(userId.equals("")) {
        	String message = "사용할 아이디를 입력해주세요";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("signUpForm.jsp").forward(request, response);
            
        }
        else if(userPw.equals("")) {
        	String message = "사용할 비밀번호를 입력해주세요";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("signUpForm.jsp").forward(request, response);
            
        }
        else if(userName.equals("")) {
        	String message = "사용할 이름을 입력해주세요";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("signUpForm.jsp").forward(request, response);
            
        }
        else if(userClass.equals("")) {
        	String message = "권한을 선택해주세요";
        	request.setAttribute("message", message);
            request.getRequestDispatcher("signUpForm.jsp").forward(request, response);
            
        }else {
        
	        UserDTO userDTO = new UserDTO();
	        userDTO.setUserId(userId);
	        userDTO.setUserPw(userPw);
	        userDTO.setUserName(userName);
	        userDTO.setUserClass(userClass);
	        
	        
	        
	        
	        int result = dao.userRegister(userDTO);
	        
	        if (result == 1) {
	        	
	        	String message = "회원가입을 축하드립니다 로그인을 다시해주시기 바랍니다";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("loginForm.jsp").forward(request, response);
	        	
	        } else {
	        	String message = "서버 실패";
	        	request.setAttribute("message", message);
	            request.getRequestDispatcher("signUpForm.jsp").forward(request, response);
	
	        }
        }
	}

}
