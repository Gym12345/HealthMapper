<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="HealthCareMemoCreateController" method="post">

유저이름:<input type="text" name="hcUser" value=<%=request.getSession().getAttribute("hcUser")%> ><br>
연:<input type="text" name="hcYear"><br>
월:<input type="text" name="hcMonth"><br>
일:<input type="text" name="hcDate"><br>
메모:<input type="text" name="hcMemo"><br>

 
<br>

<input type="submit" value="메모등록"><br>
</form>
</body>
</html>