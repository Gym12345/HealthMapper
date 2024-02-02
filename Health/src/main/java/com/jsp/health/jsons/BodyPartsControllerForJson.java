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

import com.jsp.health.DistanceDAO;
import com.jsp.health.HealthDAO;
import com.jsp.health.HealthDTO;


@WebServlet("/Health1/BodyPartsControllerForJson")
public class BodyPartsControllerForJson extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	 private HealthDAO dao;
	 private DistanceDAO distanceDao;

		public void init() {
			dao = HealthDAO.getInstance();
			distanceDao = DistanceDAO.getInstance();
	    }

	
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		    
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

		    String part = json.getString("part");
		    String userLatitude = json.getString("userLatitude");
		    String userLongitude = json.getString("userLongitude");
		    System.out.println(part);

		    request.getSession().setAttribute("part", part);

		    ArrayList<HealthDTO> healthArr = dao.HPartList(part);

		    request.setAttribute("healthArr", healthArr);
		    System.out.println(healthArr.toString());

		    //배열을 JSON으로 반환하는 방법
		    //JSON 배열 객체를만든 후, JSON배열 객체에 정보 저장
		    JSONArray healthArrJson = new JSONArray();
		    for (HealthDTO health : healthArr) {
		       JSONObject healthJson = new JSONObject();
		       healthJson.put("id", health.gethId());
		       healthJson.put("name", health.gethName());
		       healthJson.put("part", health.gethPart());
		       healthJson.put("address", health.gethAddress());
		       healthJson.put("department", health.gethDepartment());
		       healthJson.put("domain", health.gethDomain());
		       healthJson.put("image", health.gethImg());
		       // 위도와 경도를 숫자형으로 변환하여 JSON에 추가
		       healthJson.put("hLatitude", Double.parseDouble(health.gethLatitude()));
		       healthJson.put("hLongitude", Double.parseDouble(health.gethLongitude()));
		       
		    // 거리 계산하여 JSON에 추가
		       double distance = distanceDao.GiveDistance(Double.parseDouble(userLongitude), Double.parseDouble(userLatitude), health.gethId());
		       healthJson.put("distance", distance);

		        healthArrJson.put(healthJson);
		    }
		    JSONObject responseData = new JSONObject();
		    //저장되어 있는 배열 객체 전달  
		    responseData.put("healthArr", healthArrJson);
		    responseData.put("part", part);

		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
		    //밑에 구문 넣어주셔야 제가 클라이언트에서 쓸수 있는거 같아요 ( 없으면 안돌아감...)
		    response.getWriter().write(responseData.toString());
		}
	
	
	

}
