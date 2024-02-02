package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.jsp.health.hCareDAO;

@WebServlet("/Health1/HealthCareMemoUpdateControllerForJson")
public class HealthCareMemoUpdateControllerForJson extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private hCareDAO dao;

    public void init() throws ServletException {
        dao = hCareDAO.getInstance();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("hCareUpdateForm.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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

        
        String chMemo = json.getString("chMemo");
        int hcId = json.getInt("hcId");

        int result = dao.MemoUpdate(chMemo, hcId);
        JSONObject responseData = new JSONObject();

        if (result == 1) {
            String message = "수정이 완료되었습니다.";
	        responseData.put("message", message);
	        responseData.put("success", true); 
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseData.toString());
        } else {
            String message = "수정에 실패하였습니다.";
	        responseData.put("message", message); 
	        responseData.put("success", false); 
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseData.toString());
        }
    }
}