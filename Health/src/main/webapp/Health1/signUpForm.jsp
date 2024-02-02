<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입 화면</title>
</head>
<body>

<!-- 
ULID	NUMBER(5,0)	No
USERID	NVARCHAR2(20 CHAR)	No
USERPW	NVARCHAR2(40 CHAR)	No
USERNAME	NVARCHAR2(40 CHAR)	No
USERCLASS	NVARCHAR2(40 CHAR)	Yes
 -->
<%request.setCharacterEncoding("UTF-8");%>
<% if(request.getAttribute("message") != null) { %>
    <script>
        alert("<%= request.getAttribute("message") %>");
    </script>
<% } %>
<form action="SignUpController" method="post">

 
회원가입 아이디:<input type="text" name="userId"><br>
회원가입 비밀번호:<input type="text" name="userPw"><br>
회원가입 이름:<input type="text" name="userName"><br>
권한:<select name="userClass">
	<option value="">선택</option>
	<option value="normalUser">일반</option>
    <option value="hospitalOwner">병원소유자</option>
</select>
<br>

<input type="submit" value="회원가입 정보제출"><br>
</form>
<a href="LoginController">로그인화면으로 돌아가기</a>

</body>
</html>