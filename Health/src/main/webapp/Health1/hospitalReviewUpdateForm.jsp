<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>리뷰업데이트 페이지</title>
</head>
<body>
<%request.setCharacterEncoding("UTF-8");%>
병원 정보 수정 
<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>

<form action="HospitalReviewUpdateController?hrId=<%=request.getParameter("hrId")%>" method="post">

 

병원이름:<input type="text" name="hName" value="<%=request.getParameter("hName")%>"  readonly><br>
작성자아이디:<input type="text" name="userId" value="<%=session.getAttribute("userId")%>" readonly><br>
코멘트:<input type="text" name="hrComment"><br>
점수:<select name="hrRate">
	<option value="0">선택</option>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
<br>




<input type="submit" value="리뷰수정"><br>
</form>
<a href="javascript:history.back()">이전화면</a>
</body>
</html>