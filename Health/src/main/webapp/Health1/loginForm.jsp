<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 화면</title>
</head>
<body>

<%request.setCharacterEncoding("UTF-8");%>

<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>


  <form action="LoginController" method="post">
    아이디:<input type="text" name="userId"><br>
    비밀번호:<input type="text" name="userPw"><br>
    권한:<select name="userClass">
	<option value="normalUser">일반</option>
	<option value="hospitalOwner">병원소유자</option>
    <option value="admin">관리자</option>
    
    
  </select>
    <input type="submit" value="로그인"><br>
  </form>



<a href="SignUpController">계정이 없으신가요? 회원가입하기-></a>
<br><br>
<a href="serviceTiles.jsp">서비스탭</a>

</body>
</html>