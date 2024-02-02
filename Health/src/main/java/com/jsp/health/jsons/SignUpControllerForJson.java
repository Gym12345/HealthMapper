package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

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

import org.json.JSONObject;

import com.jsp.health.UserDAO;
import com.jsp.health.UserDTO;
//ULID	NUMBER(5,0)	No
//USERID	NVARCHAR2(20 CHAR)	No
//USERPW	NVARCHAR2(40 CHAR)	No
//USERNAME	NVARCHAR2(40 CHAR)	No
//USERCLASS	NVARCHAR2(40 CHAR)	Yes
//예외처리 완료
@WebServlet("/Health1/SignUpControllerForJson")
public class SignUpControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private UserDAO dao;
	
	public void init() throws ServletException {
		dao = UserDAO.getInstance();
	}

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("signUpForm.jsp").forward(request, response);

	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		 // **CORS 코드 추가**
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers",
                "Content-Type, Authorization, Origin, Accept, X-Requested-With");
    	request.setCharacterEncoding("UTF-8");
    	
		response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            JSONObject jsonObject = new JSONObject(sb.toString());

            String userId = jsonObject.getString("userId");
            String userPw = jsonObject.getString("userPw");
            String userName = jsonObject.getString("userName");
            String userClass= jsonObject.getString("userClass");
            
            System.out.println(userId+userPw+ userName+userClass);
         
            
            
            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(userId);
            userDTO.setUserPw(userPw);
            userDTO.setUserName(userName);
            userDTO.setUserClass(userClass);

            int result = dao.userRegister(userDTO);
         
            
            
            	if (result == 1) {
            		JSONObject responseData = new JSONObject();
            		responseData.put("success", true);
            		responseData.put("message", "회원가입을 축하드립니다 로그인을 다시해주시기 바랍니다");
            		responseData.put("userId", userId);
            		responseData.put("userPw", userPw);
            		responseData.put("userName", userName);
            		responseData.put("userClass", userClass);
                
            		out.print(responseData.toString());
            	} else {
            		JSONObject responseData = new JSONObject();
            		responseData.put("success", false);
            		responseData.put("message", "경고문구를 확인해주시기 바랍니다");

            		out.print(responseData.toString());
            	}
            
    }
	}