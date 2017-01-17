<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="EUC-KR"%>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%
	String strReturn = "";
	String strMsg= "";
	String strResult = "";

	String strSuccess = "false";
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	
	try {
		Class.forName("org.mariadb.jdbc.Driver");
		request.setCharacterEncoding("utf-8");
		
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String price = request.getParameter("price");
		String date = request.getParameter("date");
		String img = request.getParameter("img");
		
		conn = DriverManager.getConnection(
			"jdbc:mariadb://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf-8", "root", "3169911"	
		);
		stmt = conn.createStatement();
		String sql = "select id from book where id='" + id + "'";
		rs = stmt.executeQuery(sql);
		StringBuffer temp = new StringBuffer();
		temp.append("'books':[");
		int i=0;
		if(rs.next()) {
			strMsg = "이미 등록된 도서가 있습니다.";
			throw new Exception();
		} else {
			String sqlInsert = "insert into book(id, name, price, date, img) values(" + id + "," + name + "," + price + "," + date + "," + img + ")";
			stmt.execute(sqlInsert);
		}
		
		strResult = "등록했습니다.";
		strSuccess = "true";
		
	} catch(Exception e) {
		if(strMsg.trim().length() == 0) {
			strMsg = e.toString();
		}
	} finally {
		try { rs.close(); } catch(Exception exRs) {}
		try { stmt.close(); } catch(Exception exStmt) {}
		try { conn.close(); } catch(Exception exConn) {}
		
	}
	
	strReturn = "{'success':" + strSuccess + ", 'data':{" + strResult + "}, 'msg':" + strMsg + "}";
	out.println(strReturn);
%>

</body>
</html>