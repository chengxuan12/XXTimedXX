/**
 * Created by Administrator on 2015/9/1.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery',
    'MD5',
    'Confirm',
    'jsx!component/Common/Cookie.react'

], function (React,Backbone,$,MD5,Confirm,Cookie) {
    return React.createClass({
        getInitialState:function(){
            return{
                checked:true,
                mobileNumber:"",
                password:"",
                alert:false
            }
        },
        componentWillMount: function () {
            var cookie=new Cookie();
            var mobileNumber=cookie.getCookie('mobileNumber');
            this.setState({mobileNumber :mobileNumber});
        },
        componentDidMount:function(){
            var s=this;
            $('#username').focus();
            document.onkeydown=function(e) {
                // 兼容FF和IE和Opera
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13&&s.state.alert==false) {
                    //回车执行查询
                    $("#ljdl").click();
                }
            }
        },
        redirectUrl: function () {// http://www.xxcaifu.com/#/login?redirectUrl=http://www.xxcaifu.com/api/lanmeng/wechat/bind
            var aQuery = window.location.href.split("?");//取得Get参数
            if (aQuery.length > 1) {
                var aBuf = aQuery[1].split("&");
                for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                    var aTmp = aBuf[i].split("=");//分离key与Value
                    if (aTmp[0] == "redirectUrl") {
                        return aTmp[1];
                    }
                }
            }
        },
        login: function () {
            if (this.state.mobileNumber== "") {
                $("#no1").show();
            }else{
                $("#no1").hide();
            }
            if (this.state.password== "") {
                $("#no2").show();
            }else{
                $("#no2").hide();
            }
            var s=this;
            var mobileNumber=this.state.mobileNumber;
            var password=$.md5(this.state.password);

            var cookie=new Cookie();
            if(this.state.checked==true){
                cookie.setCookie("mobileNumber",mobileNumber);
            }else{
                cookie.setCookie("mobileNumber","");
            }
            var data={username:mobileNumber,password:password};
            if($("#username").val() != ""&&$("#pwd").val() != ""){
                $.ajax({
                    url:"/login",
                    method:"post",
                    data:data,
                    success:function(data){
                        var t = this.redirectUrl();
                        if (t) {
                            window.location.href = t;
                        }else{
                            var href = {};
                            if (window.allHref.length > 1) {
                                href = window.allHref[window.allHref.length - 2];
                            }else{
                                href = window.allHref[window.allHref.length - 1];
                            }
                            if (href.url == "register" || href.url == "findPwd" || href.url == "login" || href.url == "ErrorPage") {
                                routerReact.navigate("/home",{trigger: true});
                            } else if (href.url.indexOf("accountSecurity") != -1) {
                                routerReact.navigate("/personal/accountSecurity", {trigger: true});
                            } else {
                                if (window.history.length > 1) {
                                    window.history.go(-1)
                                } else {
                                    routerReact.navigate("/home", {trigger: true});
                                }
                                ;
                            }
                        }
                    }.bind(this),
                    error:function(data){
                        $.alert({
                            title: '',
                            content: data.responseJSON.message
                        });
                        s.setState({"alert":true});
                        $('.jconfirm-scrollpane').click(function(){
                            s.setState({"alert":false});
                        })
                        $('.jconfirm-scrollpane .btn').click(function(){
                            s.setState({"alert":false});
                        })

                    }
                });
            }

        },
        handleMobile:function(event){
            this.setState({mobileNumber :event.target.value})
        },
        handlePass:function(event){
            this.setState({password :event.target.value})
        },
        handleChecked:function(event){
            this.setState({checked :event.target.checked})
        },
        setCheck:function(){
            if(this.state.checked){
                $('#agreeCheck').css("display","none");
                $('#agreeCheck2').css("display","inline-block");
            }else{
                $('#agreeCheck').css("display","inline-block");
                $('#agreeCheck2').css("display","none");
            }
            this.setState({checked:this.state.checked?false:true});
        },
        getStrength:function(pwd){
            var strength;
            if(pwd==""||pwd.length<=5) {
                strength="";
            }else if(pwd.length<8){
                strength="低";
            }else if(pwd.length<11){
                strength="中";
            }else{
                strength="高";
            }
            return  strength;
        },
        render: function() {
            var strength=this.getStrength(this.state.password);
            var registerHref = "/#/register";
            var t = this.redirectUrl();
            if (t) {
                registerHref += "?redirectUrl=" + t;
            }
            return (
                <div className="walLogin swMarATop">
                    <div className="container">
                        <div className="wLogin">
                            <form role="form">
                                <div className="hidden-xs wl-title">
                                    登录翔翔
                                </div>
                                <div className="wl-main">
                                    <div className="form-group clearfix" style={{marginBottom:"0px"}}>
                                        <label className="hidden-xs col-sm-3 wl-label" htmlFor="username">手机号码</label>
                                        <div className="visible-xs col-xs-1"></div>
                                        <div className="col-xs-10 col-sm-9">
                                            <input className="form-control wl-input" value={this.state.mobileNumber} onChange={this.handleMobile} placeholder="输入手机号码" type="text" id="username"/>
                                        </div>
                                        <div className="visible-xs col-xs-1 w-Required">*</div>
                                        <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 wl-cueHeight" ><span id="no1" className="wl-msg">请输入手机号码</span></div>
                                    </div>
                                    <div className="form-group clearfix" style={{marginBottom:"0px"}}>
                                        <label className="hidden-xs col-sm-3 wl-label" htmlFor="pwd">登入密码</label>
                                        <div className="visible-xs col-xs-1"></div>
                                        <div className="col-xs-10 col-sm-9 ">
                                            <input className="form-control wl-input" value={this.state.password} onChange={this.handlePass} placeholder="输入登录密码" type="password" id="pwd"/>
                                        </div>
                                        <div className="visible-xs col-xs-1 w-Mima">{strength}</div>
                                        <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 wl-cueHeight" > <span id="no2"className="wl-msg">请输入密码</span></div>
                                    </div>

                                    <div className="form-group clearfix">
                                        <div className="col-xs-5 col-sm-6 col-xs-offset-1 col-sm-offset-0 wl-remLeft">
                                            <div onClick={this.setCheck} style={{cursor:"pointer"}}>
                                                <img src="assets/images/icn_agree_agreement_pre.png" className="re-AgreeImg" id="agreeCheck" />
                                                <img src="assets/images/icn_agree_agreement.png" className="re-AgreeImg2"id="agreeCheck2" />
                                                <span style={{paddingLeft:"5px"}} >记住用户名</span>
                                            </div>
                                        </div>
                                        <div className="col-xs-5 col-sm-6 wl-foRight">
                                            <a href="/#/findPwd" className="f-font">忘记密码?</a>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="col-xs-10 col-sm-12 col-xs-offset-1 col-sm-offset-0 text-center" >
                                            <button  className="btn loginBtn" type="button" onClick={this.login} id="ljdl">登录</button>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix ">
                                        <div className="col-xs-12 text-center">
                                            还没有账号？&nbsp;<a href={registerHref}><span
                                            style={{color:"#E9573F"}}>立即注册</span>&nbsp;<img
                                            src="assets/images/icn_login.png"/></a>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix visible-xs">
                                        <img src="assets/images/mobile_login_bg.png" style={{width:"100%",marginTop:"20px"}}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    });
});

