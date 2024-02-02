<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.jsp.health.RequestDTO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.jsp.health.RequestDAO"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Request List</title>
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    th {
        background-color: #4CAF50;
        color: white;
    }
</style>
</head>
<%
ArrayList<RequestDTO> RequestArr=(ArrayList)request.getSession().getAttribute("RequestArr");
%>

<body>
<%
    if(request.getAttribute("message") != null) {
        out.println("<script>alert('" + request.getAttribute("message") + "');</script>");
    }
%>
<%
    
    if (RequestArr == null || RequestArr.isEmpty()) {
    %>
        <p>등록요청이 없습니다.</p>
    <%
    } else {
       
    %>
    <h1>Request List</h1>
    <table>
        <thead>
            <tr>
                <th>|Request ID|</th>
                <th>|Request Part|</th>
                <th>|Request Image|</th>
                <th>|Request Hospital Name|</th>
                <th>|Request Address|</th>
                <th>|Request Department|</th>
                <th>|Request Description|</th>
                <th>|Request Domain|</th>
                <th>|Request Longitude|</th>
                <th>|Request Latitude|</th>
                <th>|Insert to DB|</th>
            </tr>
        </thead>
        <tbody>
            <% for(RequestDTO dto : RequestArr) { %>
                <tr>
                    <td><%= dto.getReqId() %></td>
                    <td><%= dto.getReqPart() %></td>
                    <td><img src="images/<%= dto.getReqImg() %>" alt="Image"></td>
                    <td><%= dto.getReqName() %></td>
                    <td><%= dto.getReqAddress() %></td>
                    <td><%= dto.getReqDepartMent() %></td>
                    <td><%= dto.getReqDescription() %></td>
                    <td><%= dto.getReqDomain() %></td>
                    <td><%= dto.getReqLongitude() %></td>
                    <td><%= dto.getReqLatitude() %></td>
                    
                    <td><a href="HosOwnersRequestCheckController?reqId=<%= dto.getReqId() %>">db에 등록</a></td>
                </tr>
            <% } %>
        </tbody>
    </table>
    <%} %>
    <a href="serviceTiles.jsp">서비스탭으로</a>
    
</body>
</html>