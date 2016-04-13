/**
 * Created by Administrator on 2015/8/4.
 */
'use strict';

define([
    'react',
    'jquery',
    'Confirm',
], function (React,$,Confirm) {
    return React.createClass({
        PropTypes:{
            Pass_Title:{
                "loginPass": "登录密码",
                "tradePass": "交易密码",
                "findPwd":"找回密码"
            },
            URL_MAPPING:{
                "loginPass": globamParam.login_url + "/user/forget/loginpass",
                "tradePass": globamParam.login_url + "/user/forget/tradepass",
                "findPwd":globamParam.public_url + "/user/forget/loginpass",
            }
        },
        getInitialState:function(){
            return{
                imgSrc:globamParam.public_url+"/get_img.jpg",
                phase:1,
                mobileNumber:"",
                smsVarify:"",
                pwd:"",
                confirmPwd:"",
                pwdMsg:"",
                confirmPwdMsg:"",
                smsCodeBtn:"发送验证码",
                timeWait:"60",
                timeFlag:false,
                sendFlag:false,
                title:this.PropTypes.Pass_Title[this.props.title]
            }
        },
        componentDidMount: function() {
            this.setState({timeFlag:false});
            $('#mobileNumber').focus();
        },
        componentWillUpdate:function (prevProps) {
            var mobileNumber=this.props.mobileNumber;
            if(mobileNumber!=this.state.mobileNumber&&mobileNumber!=undefined&&mobileNumber!=""&&mobileNumber!=null){
                this.setState({mobileNumber:this.props.mobileNumber});
                $("#mobileNumber").attr("disabled", true);
            }
        },
        refresh:function(event){
            this.setState({"imgSrc":"/api/public/get_img.jpg?"+new Date()});
        },
        handleNumber:function(event){
            this.setState({mobileNumber:event.target.value});
        },
        handleSms:function(event){
            this.setState({smsVarify:event.target.value});
        },
        handlePwd:function(event){
            this.setState({pwd:event.target.value});
        },
        handleConfirmPwd:function(event){
            this.setState({confirmPwd:event.target.value});
        },
        varifyPhone:function(){
            var mobileNumber=this.state.mobileNumber;
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
                        if(info.result!="1"){
                            this.setState({numberMsg:info.remark});
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
        varifyPwd:function(){
            var pwd=this.state.pwd;
            if (pwd==''||pwd.length<=5) {
                this.setState({pwdMsg:"请输入至少6位密码"});
            }else{
                this.setState({pwdMsg:""});
            }
        },

        getSmsCode:function(){
            var data={
                registNo:this.state.mobileNumber,
                flag:0
            };
            $.ajax({
                url: globamParam.public_url + "/sms/sendrandcode",
                method: "post",
                data: data,
                success: function (info) {
                    if (info.result == "1") {
                        this.refreshSMSCodeTip();
                    } else {
                        $.alert({
                            title: '',
                            content: info.remark
                        });
                        this.setState({timeFlag:false});
                    }
                }.bind(this),
                error: function () {
                    var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                    $.alert({
                        title: '',
                        content: mess
                    });
                    this.setState({timeFlag:false});
                }
            })
        },

        submit:function(){
            if(this.state.mobileNumber!=""&&this.state.numberMsg==""&&this.state.pwd!=""&&this.state.pwdMsg==""&&this.state.sendFlag==true){
                var data={mobileNumber:this.state.mobileNumber,newPassWord:this.state.pwd,randNum:this.state.smsVarify};
                var url=this.PropTypes.URL_MAPPING[this.props.title]
                $.ajax({
                    url: url,
                    method: "post",
                    data: data,
                    success: function (info) {
                        if (info.result == "1") {
                            $.alert({
                                title: '',
                                content: info.remark
                            });
                            if(this.props.title== "loginPass"||this.props.title== "findPwd"){
                                routerReact.navigate("/login",{trigger: true});
                            }else {
                                history.go(-1);
                            }
                        } else {
                            $.alert({
                                title: '',
                                content:  info.remark
                            });
                        }
                    }.bind(this),
                    error: function (info) {
                        var mess=(info.responseJSON==undefined)?info.statusText:info.responseJSON.remark
                        $.alert({
                            title: '',
                            content: mess
                        });
                    }
                })
            }else{
                $.alert({
                    title: '',
                    content: "填入信息有误"
                });
            }
        },
        preGetSmsCode:function(){
            if(this.state.timeWait==60 && this.state.timeFlag ==false&&this.state.numberMsg==""&&this.state.mobileNumber!=""){
                this.setState({timeFlag:true,sendFlag:true});
                this.getSmsCode();
            }else if(this.state.timeWait!=60){
                $("#smsVarify").focus();
            }else{
                this.varifyPhone();
                $("#mobileNumber").focus();
            }
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
            var strength=this.getStrength(this.state.pwd);
            return (<div className="xxFindPwd">
                            <form role="form">
                                <div className="r-title">
                                    {this.state.title}
                                </div>
                                <div className="r-main" style={{paddingTop:"0px"}}>
                                    <div className="form-group clearfix">
                                        <label className="hidden-xs col-sm-3 span1 resetFont" htmlFor="mobileNumber">手机号码</label>
                                        <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0 span2">
                                            <input className="form-control text1 resetInput" id="mobileNumber" name="mobileNumber" onChange={this.handleNumber} onBlur={this.varifyPhone} value={this.state.mobileNumber}  placeholder="请输入您的注册手机号码" type="text"/><b className="hidden-xs  r-Required">*</b>
                                        </div>
                                        <div className="visible-xs col-xs-1 w-Required">*</div>
                                        <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none">{this.state.numberMsg}</div>
                                    </div>

                                    <div className="form-group clearfix" id="picVerifyCode" style={{paddingBottom:"22px"}}>
                                        <label className="hidden-xs col-xs-12 col-sm-3 span1 resetFont" htmlFor="code">短信验证</label>
                                        <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0  span2">
                                            <input id="smsVarify" className="form-control smsCode resetSms"  placeholder="输入验证码"  onChange={this.handleSms}   type="text"/>
                                            <span className="r-xsInblock" style={{width:"8%"}}></span>
                                            <a href="javascript:void(0)" id="getSMSCode"  type="button" onClick={this.preGetSmsCode}><div className="smsCodeBtn resetSms">{this.state.smsCodeBtn}</div></a><b className="hidden-xs r-Required">*</b>
                                        </div>
                                        <div className="visible-xs col-xs-1 w-Required">*</div>
                                    </div>

                                    <div className="form-group clearfix">
                                        <label className="hidden-xs col-sm-3 span1 resetFont" htmlFor="pwd">重置密码</label>
                                        <div className="col-xs-10 col-sm-9 col-xs-offset-1 col-sm-offset-0 span2">
                                            <input className="form-control text1 resetInput" id="pwd" name="loginPass" onChange={this.handlePwd} onBlur={this.varifyPwd}  placeholder="输入新密码" type="password"/><b className="hidden-xs r-Mima">{strength}</b>
                                        </div>
                                        <div className="visible-xs col-xs-1 w-Mima">{strength}</div>
                                        <div className="col-xs-11 col-sm-9 col-xs-offset-1 col-sm-offset-3 none" >{this.state.pwdMsg}</div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="col-xs-10 col-sm-12 col-xs-offset-1 col-sm-offset-0 text-center">
                                            <button onClick={this.submit} className="btn registerBtn resetBtn" type="button" >立即重置</button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
            );
        }
    });
});