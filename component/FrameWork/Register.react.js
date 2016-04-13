/**
 * Created by Administrator on 2015/8/5.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery',
    'Confirm',
    'model/RegisterModel'
], function (React,Backbone,$,Confirm,RegisterModel) {
    return React.createClass({
        getInitialState: function () {
            var registerModel = new RegisterModel;
            return {
                registerModel: registerModel,
                imgSrc:globamParam.public_url+"/get_img.jpg",
                numberMsg:"",
                pwdMsg:"",
                rePwdMsg:"",
                refereeMsg:"",
                smsCodeBtn:"发送验证码",
                timeWait:"60",
                protocolChecked:true,
                timeFlag:false,
                sendFlag:false
            };
        },
        refresh:function(event){
            this.setState({"imgSrc":globamParam.public_url+"/get_img.jpg?"+new Date()});
        },
        componentDidMount: function() {
            this.setState({timeFlag:false});
            $('#mobileNumber').focus();
        },
        handleInput: function (event) {
            this.state.registerModel.set(event.target.id, event.target.value);
            this.forceUpdate();
        },
        varifyPhone:function(){
            var mobileNumber=this.state.registerModel.get('mobileNumber');
            var reg = /^\d{11}$/;
            if (mobileNumber == null || mobileNumber == "") {
                this.setState({numberMsg:"手机号不能为空"});
            }
            else if(!reg.test(mobileNumber)) {
                this.setState({numberMsg:"请输入正确的手机号码"});
            }else{
                this.setState({numberMsg:""});
                $.ajax({
                    url:globamParam.public_url+"/user/valuser?value="+mobileNumber,
                    method:"post",
                    success:function(info){
                        if(info.result=="1"){
                            this.setState({numberMsg:"此手机号码已注册过"});
                        }
                    }.bind(this),
                    error:function(info){
                        var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                        $.alert({
                            title: '',
                            content: mess
                        });
                    }
                })
            }
        },

        varifyPwd:function(){
           var pwd=this.state.registerModel.get('pwd');
            if (pwd==''||pwd.length<=5) {
                this.setState({pwdMsg:"请输入至少6位密码"});
            }else{
                this.setState({pwdMsg:""});
            }
            this.varifyConfirmPwd();
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
        varifyConfirmPwd:function(){
            var pwd=this.state.registerModel.get('pwd');
            var confirmPwd=this.state.registerModel.get('confirmPwd');
            if(pwd!=confirmPwd){
                this.setState({rePwdMsg:"两次输入密码不一致"});
            }else{
                this.setState({rePwdMsg:""});
            }
        },
        varifyReferee:function(){
            var refereeNumber=this.state.registerModel.get('refereeNumber');
            var reg = /^\d{11}$/;

            if (refereeNumber == null || refereeNumber == "") {
                this.setState({refereeMsg:""});
            }else if(!reg.test(refereeNumber)) {
                this.setState({refereeMsg:"推荐人手机号不合法"});
            }else{
                $.ajax({
                    url:globamParam.public_url+"/user/valuser?value="+refereeNumber,
                    method:"post",
                    success:function(info){
                        if(info.result!="1"){
                            this.setState({refereeMsg:"此推荐人号码未注册过"});
                        }else{
                            this.setState({refereeMsg:""});
                        }
                    }.bind(this),
                    error:function(info){
                        var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                        $.alert({
                            title: '',
                            content:mess
                        });
                    }
                })
            }
        },
        preGetSmsCode:function(){
            if(this.state.timeWait==60 && this.state.timeFlag ==false&&this.state.numberMsg==""&&this.state.registerModel.get('mobileNumber')!=""){
                 this.setState({timeFlag:true,sendFlag:true});
                 this.getSmsCode();
            }else if(this.state.timeWait!=60){
                $("#smsVarify").focus();
            }else{
                this.varifyPhone();
                $("#mobileNumber").focus();
            }
        },
        getSmsCode:function(){
                var data={
                    registNo:this.state.registerModel.get('mobileNumber'),
                    flag:1
                };
                $.ajax({
                    url:globamParam.public_url+"/sms/sendrandcode",
                    method:"post",
                    data:data,
                    success:function(info){
                        if(info.result=="1"){
                            this.refreshSMSCodeTip();
                        }else{
                            $.alert({
                                title: '',
                                content: info.remark
                            });
                            this.setState({timeFlag:false});
                        }
                    }.bind(this),
                    error:function(info){
                        var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                        $.alert({
                            title: '',
                            content:mess
                        });
                        this.setState({timeFlag:false});
                    }
                })
        },

        refreshSMSCodeTip:function() {
            var wait=this.state.timeWait;
            var timer = setInterval(function(){
                if (this.state.timeWait == 0) {
                    this.setState({smsCodeBtn:"重发验证码"});
                    this.setState({timeWait:60,timeFlag:false});
                    clearInterval(timer);
                } else {
                    this.setState({smsCodeBtn:"重新发送(" + this.state.timeWait + ")"});
                    this.setState({timeWait:this.state.timeWait-1});
                }
            }.bind(this),1000);
        },
        checkForm:function(){
            var model=this.state.registerModel;
            if(model.get('mobileNumber')!=""&&model.get('pwd')!=""&& model.get('confirmPwd')!=""&&model.get('smsVarify')!=""&&
                this.state.numberMsg==""&&this.state.pwdMsg==""&&this.state.rePwdMsg==""&&this.state.refereeMsg==""&&this.state.protocolChecked==true&&this.state.sendFlag==true){
                      this.subForm();
            }else{
                $.alert({
                    title: '',
                    content: "注册信息不完整"
                });
            }
        },

        subForm:function(){
            var model=this.state.registerModel;
            var num = model.get("refereeNumber")!=""?model.get("refereeNumber"):null;
            var data='{"mobileNumber":"'+model.get('mobileNumber')+'","loginPass":"'+model.get('pwd')+'","reference":'+num+'}';
            $.ajax({
                url:globamParam.public_url+"/user/register/"+model.get('smsVarify'),
                method:"post",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data:data,
                success:function(info,state){
                       this.successAndLogin();
                }.bind(this),
                error:function(info){
                    var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                    $.alert({
                        title: '',
                        content: mess
                    });
                }
            })
        },
        successAndLogin:function(){
            var model=this.state.registerModel;
            var username=model.get('mobileNumber');
            var password=$.md5(model.get('pwd'));
            var data={username:username,password:password};
                $.ajax({
                    url:"/login",
                    method:"post",
                    data:data,
                    success:function(data){
                        var t = this.redirectUrl();
                        if (t) {
                            window.location.href = t;
                        } else {
                            routerReact.navigate("registerSuccess", {trigger: true});
                        }
                    }.bind(this),
                    error:function(data){
                        $.alert({
                            title: '',
                            content: "用户名或密码错误"
                        });
                    }
                });
        },

        setCheck:function(){
            if(this.state.protocolChecked){
                $('#agreeCheck').css("display","none");
                $('#agreeCheck2').css("display","inline-block");
                $('#registerNow').attr("disabled",true);
                $('#registerNow').css("background","#BEBEBE");
            }else{
                $('#agreeCheck').css("display","inline-block");
                $('#agreeCheck2').css("display","none");
                $('#registerNow').css("background","#e9573f");
                $('#registerNow').attr("disabled",false);
            }
            this.setState({protocolChecked:this.state.protocolChecked?false:true});

        },
        redirectUrl: function () {
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
    render: function() {
            var strength=this.getStrength(this.state.registerModel.get('pwd'));
        var loginHref = "/#/login";
        var t = this.redirectUrl();
        if (t) {
            loginHref += "?redirectUrl=" + t;
        }
            return (
                <div className="wal_register swMarATop">
                    <div className="container">
                            <div className="xxRegister">
                                <form role="form">
                                <div className="hidden-xs r-title">
                                    加入翔翔
                                </div>
                                <div className="r-main">
                                          <div className="form-group clearfix">
                                            <label className="hidden-xs col-sm-3 span1" htmlFor="mobileNumber">手机号码</label>
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0 span2">
                                                <input className="form-control text1" id="mobileNumber" name="mobileNumber" onChange={this.handleInput} onBlur={this.varifyPhone}   placeholder="输入手机号码" type="text"/><b className="hidden-xs  r-Required">*</b>
                                            </div>
                                              <div className="visible-xs col-xs-1 w-Required">*</div>
                                            <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none">{this.state.numberMsg}</div>
                                        </div>

                                        <div className="form-group clearfix" id="picVerifyCode" style={{paddingBottom:"22px"}}>
                                            <label className="hidden-xs col-xs-12 col-sm-3 span1" htmlFor="smsVarify">短信验证</label>
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0  span2">
                                                <input id="smsVarify" className="form-control smsCode"  placeholder="输入验证码" onChange={this.handleInput}  type="text"/>
                                                <span className="r-xsInblock" style={{width:"8%"}}></span>
                                                <a href="javascript:void(0)" id="getSMSCode"  type="button" onClick={this.preGetSmsCode}><div className="smsCodeBtn">{this.state.smsCodeBtn}</div></a><b className="hidden-xs r-Required">*</b>
                                            </div>
                                            <div className="visible-xs col-xs-1 w-Required">*</div>
                                        </div>
                                        <div className="form-group clearfix">
                                            <label className="hidden-xs col-xs-12 col-sm-3 span1" htmlFor="pwd">登录密码</label>
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0 span2">
                                                <input className="form-control text1" id="pwd" name="loginPass" onBlur={this.varifyPwd} onChange={this.handleInput}  placeholder="输入登录密码" type="password"/><b className="hidden-xs r-Mima">{strength}</b>
                                            </div>
                                            <div className="visible-xs col-xs-1 w-Mima">{strength}</div>
                                            <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none" >{this.state.pwdMsg}</div>
                                        </div>
                                    <div className="form-group clearfix"  id="confimPasswd">
                                            <label className="hidden-xs col-xs-12 col-sm-3 span1" htmlFor="confirmPwd">确认密码</label>
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0  span2">
                                                <input  className="form-control text1" id="confirmPwd" onBlur={this.varifyConfirmPwd} onChange={this.handleInput}  placeholder="输入确认密码" type="password"/><b className="hidden-xs r-Required">*</b>
                                            </div>
                                             <div className="visible-xs col-xs-1 w-Required">*</div>
                                             <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none" >{this.state.rePwdMsg}</div>
                                     </div>
                                    <div className="form-group clearfix">
                                            <label className="hidden-xs col-xs-12 col-sm-3 span1" htmlFor="refereeNumber">&nbsp;推&nbsp;&nbsp;荐&nbsp;&nbsp;人</label>
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0 span2">
                                                <input className="form-control text1" id="refereeNumber"  onBlur={this.varifyReferee} onChange={this.handleInput}    placeholder="推荐人账户名"/>
                                            </div>
                                            <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none">{this.state.refereeMsg}</div>
                                     </div>


                                    <div className="form-group clearfix  r-agreeTop">
                                            <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-3" style={{fontSize:"16px"}}>
                                                <div onClick={this.setCheck}  style={{display:"inline-block",cursor:"pointer"}}>
                                                    <img src="assets/images/icn_agree_agreement_pre.png" className="re-AgreeImg" id="agreeCheck" />
                                                    <img src="assets/images/icn_agree_agreement.png" className="re-AgreeImg2"id="agreeCheck2" />
                                                    <span style={{paddingLeft:"10px"}} >我已阅读并同意</span>
                                                </div>
                                                <a href="/#/protocol/user" target="_blank"  style={{color:"#01abff"}} >《翔翔财富注册协议》</a>
                                            </div>
                                       </div>
                                    <div className="form-group clearfix">
                                            <div className="col-xs-10 col-sm-12 col-xs-offset-1 col-sm-offset-0" style={{textAlign:"center"}}>
                                                <button onClick={this.checkForm} className="btn registerBtn" type="button" id="registerNow">立即注册</button>
                                            </div>
                                     </div>
                                    <div className="form-group clearfix">
                                        <div className="col-xs-12" style={{fontSize:"16px",textAlign:"center",paddingBottom:"15px"}}>
                                            已注册？&nbsp; <a href={loginHref}><span
                                            style={{color:"#E9573F"}}>立即登录</span>&nbsp;<img
                                            src="assets/images/icn_login.png"/></a>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix visible-xs">
                                        <img src="assets/images/mobile_sign_up_bg.png" style={{width:"100%"}}/>
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
