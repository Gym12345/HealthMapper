<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" type="text/css" href="human.css">

<meta charset="UTF-8">
<title>Symptom Guide</title>
</head>
<body>
<a href="serviceTiles.jsp">서비스메뉴들</a>
<br>
<hr>

1.어디가 아프신가요? 아픈부분을 클릭해주세요
<div class="human-body">
  <div class="head" onclick=" location.href='GuideController?part=<%="머리"%>' "></div>
  <div class="torso" onclick=" location.href='GuideController?part=<%="몸통"%>' "></div>
   <div class="shoulder shoulder-left" onclick=" location.href='GuideController?part=<%="어깨"%>' "></div>
   <div class="shoulder shoulder-right" onclick=" location.href='GuideController?part=<%="어깨"%>' "></div>
  <div class="arm arm-left" onclick=" location.href='GuideController?part=<%="팔"%>' "></div>
  <div class="arm arm-right"onclick=" location.href='GuideController?part=<%="팔"%>' "></div>
  <div class="leg leg-left" onclick=" location.href='GuideController?part=<%="다리"%>' "></div>
  <div class="leg leg-right"onclick=" location.href='GuideController?part=<%="다리"%>' "></div>
   <div class="foot foot-left" onclick=" location.href='GuideController?part=<%="발"%>' "></div>
  <div class="foot foot-right"onclick=" location.href='GuideController?part=<%="발"%>' "></div>
  
</div>


</body>
</html>