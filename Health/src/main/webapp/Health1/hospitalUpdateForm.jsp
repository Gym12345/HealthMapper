<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>병원업데이트 페이지</title>
</head>
<body>
<%request.setCharacterEncoding("UTF-8");%>
병원 정보 수정 
<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>
<form action="HospitalUpdateController?hId=<%=request.getParameter("hId") %>" method="post">



병원사진파일명:<input type="text" name="hImg" value=<%=request.getParameter("hImg") %>><br>
병원이름:<input type="text" name="hName" value=<%=request.getParameter("hName") %>><br>
병원주소:<input type="text" name="hAddress" value=<%=request.getParameter("hAddress") %>><br>
진료과:<input type="text" name="hDepartment" value=<%=request.getParameter("hDepartment") %>><br>
전문부위:<input type="text" name="hPart" value=<%=request.getParameter("hPart") %>><br>
병원설명:<input type="text" name="hDescription" value=<%=request.getParameter("hDescription") %>><br>
병원홈페이지주소:<input type="text" name="hDomain" value=<%=request.getParameter("hDomain") %>><br>
경도:<input type="text" name="hLongitude" value=<%=request.getParameter("hLongitude") %>><br>
위도:<input type="text" name="hLatitude"value=<%=request.getParameter("hLatitude") %>><br>

<input type="submit" value="병원수정"><br>
</form>
<a href="javascript:history.back()">이전화면으로</a>
</body>
</html>