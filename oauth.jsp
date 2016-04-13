<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="com.xxcaifu.weixin.service.impl.pojo.SNSUserInfo"%>
<%@ page import="com.xxcaifu.weixin.service.impl.util.AdvancedUtil"%>
<%@ page import="com.xxcaifu.weixin.service.impl.pojo.WeixinOauth2Token" %>
<html>
<head>
    <title>OAuth2.0网页授权</title>
    <meta name="viewport" content="width=device-width,user-scalable=0">
    <style type="text/css">
        *{margin:0;padding:0}
        table{border:1px dashed #b9b9dd;font-size:12pt}
        td{border:1px dashed #b9b9dd;word-break:break-all;word-wrap:break-word}
    </style>
</head>
<body>
    <%
        String code=request.getParameter("code");
        out.print(code);
        SNSUserInfo snsUserInfo=null;
        if(!"authdeny".equals(code)) {
            WeixinOauth2Token weixinOauth2Token = AdvancedUtil.getOauth2AccessToken(code);
            snsUserInfo=AdvancedUtil.getSNSUserInfo(weixinOauth2Token.getAccess_token(),weixinOauth2Token.getOpenid());
        }
        if(null!=snsUserInfo){
    %>
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr><td width="20%">属性</td><td width="80%">值</td></tr>
      <tr><td>OpenId</td><td><%=snsUserInfo.getOpenid()%></td></tr>
      <tr><td>NickName</td><td><%=snsUserInfo.getNickname()%></td></tr>
      <tr><td>Sex</td><td><%=snsUserInfo.getSex()%></td></tr>
      <tr><td>Country</td><td><%=snsUserInfo.getCountry()%></td></tr>
      <tr><td>Province</td><td><%=snsUserInfo.getProvince()%></td></tr>
      <tr><td>City</td><td><%=snsUserInfo.getCity()%></td></tr>
      <tr><td>Head</td><td><img src="<%=snsUserInfo.getHeadimgurl()%>" border="0", style="width: 100px; height: 100px;"/></td></tr>
    </table>
<%
  }
  else
    out.print("没获取到用户信息！");
%>
</body>
</html>
