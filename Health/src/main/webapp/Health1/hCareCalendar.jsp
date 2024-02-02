<%@page import="com.jsp.health.hCareDAO"%>
<%@page import="com.jsp.health.hCareDTO"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
    if(request.getAttribute("message") != null) {
        out.println("<script>alert('" + request.getAttribute("message") + "');</script>");
    }
%>
<%

	ArrayList<hCareDTO> hcareArr = (ArrayList<hCareDTO>) request.getAttribute("hcareArr");
    hCareDAO dao = hCareDAO.getInstance();  
%>

<%
    
    if (hcareArr == null || hcareArr.isEmpty()) {
    %>
        <p>메모가 없습니다.</p>
    <%
    } else {
       
    %>

<%
    for (hCareDTO dto : hcareArr) {
%>
    <hr>
    <tr>
        <td>이름: <%= dto.getHcUser() %></td>
        <br>
        <td>연: <%= dto.getHcYear() %></td>
        <br>
        <td>월: <%= dto.getHcMonth() %></td>
        <br>
        <td>일: <%= dto.getHcDate() %></td>
        <br>
        <td>메모: <%= dto.getHcMemo() %></td>
        <br>
        <td><a href="HealthCareMemoDeleteController?hcId=<%=dto.getHcId()%>">삭제</a> </td>
    </tr>
<%  } }%>
<a href=HealthCareMemoCreateController>메모등록</a>
</body>
</html>