/**
 * Created by Administrator on 2015/7/27.
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
              password:""
          }
        },
        componentWillMount: function () {
            var cookie=new Cookie();
            var mobileNumber=cookie.getCookie('mobileNumber');
            this.setState({mobileNumber :mobileNumber});
        },
        componentDidMount:function(){
            document.onkeydown=function(e) {
                // 兼容FF和IE和Opera
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    //回车执行查询
                    $("#ljdl").click();
                }
            }
        },
        login: function () {
            if ($("#username").val() == "") {
                $("#no1").show();
            }else{
                $("#no1").hide();
            }
            if ($("#pwd").val() == "") {
                $("#no2").show();
            }else{
                $("#no2").hide();
            }
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
                            window.history.go(-1);
                        },
                        error:function(data){
                            $.alert({
                                title: '',
                                content: "用户名或密码错误"
                            });
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


        render: function() {
            return (
                <div className="wal swMarATop">
                <div className="container">
                        <div className="row">
                         <div className="col-sm-12 login">
                            <div>
                                <span className="msg" id="loginmsg">&nbsp;</span>
                            </div>
                            <div className="title">
                                <div className="fl">翔翔会员</div>
                                <a className="fr" href="/#/register">免费注册</a>
                                <span className="clear_f"></span>
                            </div>
                            <ul className="l-main">
                                <li>
                                    <div style={{position:"relative"}}>
                                     <img src="assets/images/s1.jpg" className="hidden-xs" style={{width:"100%"}}/>
                                     <img src="assets/images/s1-1.jpg" className="visible-xs" style={{width:"100%"}}/>
                                       <div>
                                       <input className="text1 input_hover1" value={this.state.mobileNumber} onChange={this.handleMobile} placeholder="手机号码登录" type="text" id="username"/>
                                       </div>
                                    </div>
                                    <div className="none">
                                        <span className="no no2" id="no1">请输入手机号码</span>
                                    </div>
                                </li>
                                <li>
                                    <div style={{position:"relative"}}>
                                            <img src="assets/images/s2.jpg" className="hidden-xs" style={{width:"100%"}}/>
                                            <img src="assets/images/s2-1.jpg" className="visible-xs" style={{width:"100%"}}/>
                                            <input className="text1 input_hover1" value={this.state.password} onChange={this.handlePass} placeholder="请输入密码" type="password" id="pwd"/>
                                    </div>
                                    <div className="none">
                                            <span className="no no2" id="no2" >请输入密码</span>
                                     </div>
                                </li>
                                <li className="pass-record">
                                              <span className="fl"> <input id="remenbername" onChange={this.handleChecked} checked={this.state.checked} type="checkbox"/>记住用户名</span>
                                              <a className="fr" href="/#/findPwd">忘记密码?</a><span className="clear_f">
                                              </span>
                                </li>
                                <li><input id="ljdl" onClick={this.login} className="btn2" value="登  录" type="button"/></li>
                            </ul>

                        </div>
                      </div>
                    </div>
                  </div>
            );
        }
    });
});

