<%@page import="com.jsp.health.HealthDTO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.jsp.health.HealthDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>진료과: <%= request.getParameter("department") %> 화면</title>
</head>
<body>

<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>

<%
    String department = request.getParameter("department");
	request.getSession().setAttribute("CurrentDepartment", department);
	ArrayList<HealthDTO> departmentArr = (ArrayList<HealthDTO>) request.getAttribute("departmentArr");

%>

<h>진료과: <%= department %></h>
<a href="medicalDepartment.jsp">진료과 선택화면으로</a>


<%
    for (HealthDTO dto : departmentArr) {
%>
    <hr>
    <tr>
        <td><a href="http://<%= dto.gethDomain() %>"><img src="images/<%=department%>/<%= dto.gethImg() %>" style="width:175px; height:175px;"></a></td>
        <br>
        <td>병원이름: <%= dto.gethName() %></td>
        <br>
        <td>병원주소: <%= dto.gethAddress() %></td>
        <br>
        <td>진료과: <%= dto.gethDepartment() %></td>
        <br>
        <td>설명: <%= dto.gethDescription() %></td>
        <br>
        <td>경도: <%= dto.gethLongitude() %></td>
        <br>
        <td>위도: <%= dto.gethLatitude() %></td>
    </tr>

 <%
    if ("admin".equals(session.getAttribute("userClass"))) {
%>
    <a href="HospitalUpdateController?hId=<%= dto.gethId() %>&amp;hImg=<%= dto.gethImg() %>&amp;hName=<%= dto.gethName() %>&amp;hPart=<%= dto.gethPart() %>&amp;hAddress=<%= dto.gethAddress() %>&amp;hDepartment=<%= dto.gethDepartment() %>&amp;hDescription=<%= dto.gethDescription() %>&amp;hDomain=<%= dto.gethDomain() %>&amp;hLongitude=<%=dto.gethLongitude()%>&amp;hLatitude=<%=dto.gethLatitude()%>">수정</a>
<%
    }
%>

<%
    if ("admin".equals(session.getAttribute("userClass"))) {
%>
    <a href="HospitaldeleteController?hId=<%= dto.gethId() %>">삭제</a>
<%
    }
%>

    <a href="HospitalReviewListController?hName=<%= dto.gethName() %>">리뷰</a>
<%
    }
%>

<hr>

<%
    if ("hospitalOwner".equals(session.getAttribute("userClass"))) {
%>
    <a href="HosOwnersRequestController">병원소유주이신가요?병원등록 요청하기</a>
<%
    }
%>
<br>
<a href="medicalDepartment.jsp">진료과 선택화면으로</a>
</body>
</html>