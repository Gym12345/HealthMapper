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


@WebServlet("/Health1/HealthCareMemoDeleteControllerForJson")
public class HealthCareMemoDeleteControllerForJson extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private hCareDAO dao;

    public void init() {
        // Initialize the DAO
        dao = hCareDAO.getInstance();
    }
    

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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

        int hcId = json.getInt("hcId");

        System.out.println(hcId);

        int result = dao.MemoDelete(hcId);
        JSONObject responseData = new JSONObject();

        if (result == 1) {
            System.out.println("delete successed");
	        responseData.put("success", true); 
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseData.toString());
        } else {
            System.out.println("delete failed");response.setContentType("application/json");
	        responseData.put("success", false); 
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(responseData.toString());
        }
        
        

        
    }
}
