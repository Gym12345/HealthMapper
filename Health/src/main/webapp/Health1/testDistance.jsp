<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="DistanceController" method="post">

위도:<input type="text" name="userLongitude"><br>
경도:<input type="text" name="userLatitude"><br>
병원hId:<input type="text" name="hId"><br>

 
<br>

<input type="submit" value="거리계산"><br>
</form>
</body>
</html>