package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.jsp.health.hCareDAO;
import com.jsp.health.hCareDTO;

@WebServlet("/Health1/HealthCareMemoListControllerForJson")
public class HealthCareMemoListControllerForJson extends HttpServlet {
    private static final long serialVersionUID = 1L;

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

        String hcUser = json.getString("hcUser");
        request.getSession().setAttribute("hcUser", hcUser);

        hCareDAO dao = hCareDAO.getInstance();
        ArrayList<hCareDTO> hcareArr = dao.HealthCareMemoList(hcUser);

        JSONArray hcareArrJson = new JSONArray();

        for (hCareDTO hcare : hcareArr) {
            JSONObject hcareJson = new JSONObject();
            hcareJson.put("hcId", hcare.getHcId());
            hcareJson.put("hcUser", hcare.getHcUser());
            hcareJson.put("hcYear", hcare.getHcYear());
            hcareJson.put("hcMonth", hcare.getHcMonth());
            hcareJson.put("hcDate", hcare.getHcDate());
            hcareJson.put("hcMemo", hcare.getHcMemo());
            hcareArrJson.put(hcareJson);
        }

        JSONObject responseData = new JSONObject();
        responseData.put("hcareArr", hcareArrJson);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseData.toString());
    }
}