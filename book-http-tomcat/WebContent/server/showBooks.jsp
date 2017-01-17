<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>

<%
	String strReturn = "";
	String strMsg= "";
	String strResult = "[]";

	String strSuccess = "false";
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	
	try {
		Class.forName("org.mariadb.jdbc.Driver");
		request.setCharacterEncoding("utf-8");
		String name = request.getParameter("name");
		conn = DriverManager.getConnection(
			"jdbc:mariadb://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf-8", "root", "3169911"	
		);
		stmt = conn.createStatement();
		String sql = "select id, name, price, date, img from book";
		if(name != null && name.trim().length() >0){
			sql += "where name like '%" + name + "%";
		}
		rs = stmt.executeQuery(sql);
		StringBuffer temp = new StringBuffer();
		temp.append("'books':[");
		int i=0;
		while(rs.next()) {
			if(i !=0) {
				temp.append(",");
			}
			temp.append("{'id':'").append(rs.getString("id")).append("'")
				.append(",'name':'").append(rs.getString("name")).append("'")
				.append(",'price':'").append(rs.getLong("price")).append("'")
				.append(",'date':'").append(rs.getString("date")).append("'")
				.append(",'img':'").append(rs.getString("img")).append("'")
				.append("'}");
			i++;
			
		}
		temp.append("]");
		strResult = temp.toString();
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
	
	strReturn = "{'success':" + strSuccess + ", 'info':{" + strResult + "}, 'msg':" + strMsg + "}";
	out.println(strReturn.replace('\'', '\"').trim());
%>
