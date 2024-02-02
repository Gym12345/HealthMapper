<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>진료과 선택</title>
</head>
<body>

<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>

<% if (session.getAttribute("userId") == null) { %>
	<button onclick="location.href='LoginController'">로그인하기</button> <!-- url mapping -->
<% } %>

<% if (session.getAttribute("userId") != null) { %>
	<%=session.getAttribute("userId") %>로 로그인됨
	권한:<%=session.getAttribute("userClass") %>
	<a href="LogoutController">로그아웃하기</a>
<% } %>

<hr> 

<button onclick="location.href='MedicalDepartmentListController?department=척추관절'">척추관절</button>
<button onclick="location.href='MedicalDepartmentListController?department=외과'">외과</button>
<button onclick="location.href='MedicalDepartmentListController?department=이비인후과'">이비인후과</button>
<button onclick="location.href='MedicalDepartmentListController?department=산부인과'">산부인과</button>


<br>
<br>
<br>
<br>
<br>
<br>
<%if("hospitalOwner".equals(session.getAttribute("userClass"))){ %>
  <a href=HosOwnersRequestController>병원소유주이신가요?병원등록 요청하기</a>
  <%} %>
<br>

<a href="serviceTiles.jsp">서비스메뉴들</a>



</body>
</html>