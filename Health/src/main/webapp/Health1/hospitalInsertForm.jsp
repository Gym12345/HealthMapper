<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>병원등록 화면</title>
</head>
<body>
<%request.setCharacterEncoding("UTF-8");%>
<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>

<form action="HospitalInsertController" method="post">

<!--진료과 부위 는 복수 응답가능 어깨,발,다리 이런식으로 -->
병원사진파일명:<input type="text" name="hImg"><br>
병원이름:<input type="text" name="hName"><br>
병원주소:<input type="text" name="hAddress"><br>
진료과:<input type="text" name="hDepartment"><br>
병원설명:<input type="text" name="hDescription"><br>
병원홈페이지주소:<input type="text" name="hDomain"><br>
전문부위:<input type="text" name="hPart"><br>
경도:<input type="text" name="hLongitude"><br>
위도:<input type="text" name="hLatitude"><br>
	
 
<br>

<input type="submit" value="병원등록"><br>
</form>
<a href="bodyparts.jsp">부위별메인화면</a>
</body>
</html>