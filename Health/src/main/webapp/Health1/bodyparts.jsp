<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" type="text/css" href="human.css">
<meta charset="UTF-8">
<title>부위별 화면</title>
</head>
<body>

<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>

<%String part; %>

<% if (session.getAttribute("userId") != null) { %>
	<%=session.getAttribute("userId") %>로 로그인됨
	권한:<%=session.getAttribute("userClass") %>
	<a href="LogoutController">로그아웃하기</a>
<% } %>

<% if (session.getAttribute("userId") == null) { %>
	<button onclick="location.href='LoginController'">로그인하기</button> <!-- url mapping -->
<% } %>

<hr>
<div class="human-body">
  <div class="head" onclick=" location.href='BodyPartsController?part=<%="머리"%>' "></div>
  <div class="torso" onclick=" location.href='BodyPartsController?part=<%="몸통"%>' "></div>
  <div class="shoulder shoulder-left" onclick=" location.href='BodyPartsController?part=<%="어깨"%>' "></div>
  <div class="shoulder shoulder-right" onclick=" location.href='BodyPartsController?part=<%="어깨"%>' "></div>
  <div class="arm arm-left" onclick=" location.href='BodyPartsController?part=<%="팔"%>' "></div>
  <div class="arm arm-right"onclick=" location.href='BodyPartsController?part=<%="팔"%>' "></div>
  <div class="leg leg-left" onclick=" location.href='BodyPartsController?part=<%="다리"%>' "></div>
  <div class="leg leg-right"onclick=" location.href='BodyPartsController?part=<%="다리"%>' "></div>
  <div class="foot foot-left" onclick=" location.href='BodyPartsController?part=<%="발"%>' "></div>
  <div class="foot foot-right"onclick=" location.href='BodyPartsController?part=<%="발"%>' "></div>
  
</div>
<a href="serviceTiles.jsp">서비스메뉴들</a>
<br>

<%if("admin".equals(session.getAttribute("userClass"))) { %>
<a href="HospitalInsertController">병원광고등록</a>
<% } %>

<%if("hospitalOwner".equals(session.getAttribute("userClass"))){ %>
  <a href=HosOwnersRequestController>병원소유주이신가요?병원등록 요청하기</a>
  <%} %>

</body>
</html>

