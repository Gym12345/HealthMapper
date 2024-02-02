package com.jsp.health.jsons;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;

@WebServlet("/Health1/ShowHospitalByReviewForJson")
public class ShowHospitalByReviewForJson extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private HealthDAO dao;

    public void init() {
        dao = HealthDAO.getInstance();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // CORS 코드 추가
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers",
                "Content-Type, Authorization, Origin, Accept, X-Requested-With");
        request.setCharacterEncoding("UTF-8");
        
        StringBuilder sb = new StringBuilder();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        
        JSONObject json = new JSONObject(sb.toString());
        
        String hName = json.getString("hName");
        System.out.println(hName);
        
        HealthDTO oneHospital = dao.showMyHospital(hName);
        
        JSONArray hospitalArrByReview = new JSONArray();
        
        JSONObject hospitalJson = new JSONObject();
        hospitalJson.put("id", oneHospital.gethId());
        hospitalJson.put("name", oneHospital.gethName());
        hospitalJson.put("part", oneHospital.gethPart());
        hospitalJson.put("address", oneHospital.gethAddress());
        hospitalJson.put("department", oneHospital.gethDepartment());
        hospitalJson.put("domain", oneHospital.gethDomain());
        hospitalJson.put("image", oneHospital.gethImg());
        hospitalJson.put("hLatitude", Double.parseDouble(oneHospital.gethLatitude()));
        hospitalJson.put("hLongitude", Double.parseDouble(oneHospital.gethLongitude()));
        
        hospitalArrByReview.put(hospitalJson);
        
        JSONObject responseData = new JSONObject();
        responseData.put("hospitalArrByReview", hospitalArrByReview);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseData.toString());
    }
}
