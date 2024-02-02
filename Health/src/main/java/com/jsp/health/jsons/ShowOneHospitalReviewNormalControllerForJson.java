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

import com.jsp.health.ReviewDAO;
import com.jsp.health.ReviewDTO;

@WebServlet("/Health1/ShowOneHospitalReviewNormalControllerForJson")
public class ShowOneHospitalReviewNormalControllerForJson extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private ReviewDAO dao;

    public void init() {
        dao = ReviewDAO.getInstance();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, Accept, X-Requested-With");
        request.setCharacterEncoding("UTF-8");
        
        BufferedReader reader = request.getReader();

	    StringBuilder sb = new StringBuilder();
	    String line = null;
	    while ((line = reader.readLine()) != null) {
	        sb.append(line);
	    }
	    
        JSONObject json = new JSONObject(sb.toString());     
        String hName = json.getString("hName");
        ArrayList<ReviewDTO> OneHospitalReviewArr = dao.ShowOneHospitalReviewList(hName);

        System.out.println(OneHospitalReviewArr);

        JSONArray OneHospitalReviewArrJson = new JSONArray();
        for (ReviewDTO review : OneHospitalReviewArr) {
            JSONObject reviewJson = new JSONObject();
            reviewJson.put("hrId", review.getHrId());
            reviewJson.put("hName", review.gethName());
            reviewJson.put("userId", review.getUserId());
            reviewJson.put("hrComment", review.getHrComment());
            reviewJson.put("hrRate", review.getHrRate());
            OneHospitalReviewArrJson.put(reviewJson);
        }

        JSONObject responseData = new JSONObject();

        responseData.put("myHospitalReview", OneHospitalReviewArrJson);

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.getWriter().write(responseData.toString());
    }
}