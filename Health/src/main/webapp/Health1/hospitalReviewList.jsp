<%@page import="com.jsp.health.ReviewDAO"%>
<%@page import="com.jsp.health.ReviewDTO"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>병원 리뷰</title>
</head>
<body>
   
    <%
    String hName = request.getParameter("hName");
    ReviewDAO dao = ReviewDAO.getInstance();
    ArrayList<ReviewDTO> reviewArr = dao.HospitalReviewList(hName);
%>
    <h1><%=hName%>의 병원 리뷰</h1>
    
    <%if (session.getAttribute("userId")!=null ){ %>
    <a href="HospitalReviewInsertController?hName=<%=hName%>"><%=hName%>의 리뷰 작성하기</a>
    <%} %>
    
    <%
    
    if (reviewArr == null || reviewArr.isEmpty()) {
    %>
        <p>리뷰가 없습니다.</p>
    <%
    } else {
        for (ReviewDTO dto : reviewArr) {
            String userId = dto.getUserId();
            String comment = dto.getHrComment();
            int rate = dto.getHrRate();
    %>
        <hr>
        <p><b>사용자 이름: <%= userId %></b></p>
        <p>리뷰: <%= comment %></p>
        <p>병원 서비스 평가: <%= rate %></p>
        
        
        <%if (userId.equals(session.getAttribute("userId")) || "admin".equals(session.getAttribute("userClass"))){ %>
        	<a href="HospitalReviewUpdateController?hrId=<%=dto.getHrId()%>&hName=<%=hName %>">수정</a>
        <%} %>
         <%if (userId.equals(session.getAttribute("userId")) || "admin".equals(session.getAttribute("userClass"))){ %>
        	<a href="HospitalReviewDeleteController?hrId=<%=dto.getHrId()%>">삭제</a>
        <%} %>
    <%
        }
    }
    %>
    
    <hr>
    <p><a href="javascript:history.back()">이전화면으로</a></p>
</body>
</html>
