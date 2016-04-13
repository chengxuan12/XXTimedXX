/**
 * Created by Administrator on 2015/8/19.
 */
/**
 * Created by Administrator on 2015/8/19.
 */
define([
    'react',
    'backbone',
    'jquery',
    'Ajax',
    'jsx!component/Common/Cookie.react'
], function (React,Backbone,$,Ajax,Cookie) {
    return React.createClass({
        getInitialState:function(){
            return{
                login:true,
            }
        },
        handleMouserOver:function(){
            if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false){
                $("#myAccount2").css("display","block");
            }else{
                $("#myAccount3").css("display","block");
            }

            $("#myAccount1").css("display","none");
        },
        handleMouserOut:function(){
            $("#myAccount1").css("display","block");
            $("#myAccount2").css("display","none");
            $("#myAccount3").css("display","none");
        },
        handlePhoneOver:function(){
            $("#weiPhoneQRcode").css("display","block");
        },
        handlePhoneOut:function(){
            $("#weiPhoneQRcode").css("display","none");
        },
        componentDidMount: function () {
            this.props.user.on('change', function () {
                this.forceUpdate();
            }.bind(this));

            this.loginCall();
            this.welComeAccount();
            this.getHeadType();
            this.forceUpdate();
        },
        componentDidUpdate:function(){
            this.welComeAccount();
            this.getHeadType();
        },
        componentWillReceiveProps:function(nextProps){
            this.loginCall();
            this.welComeAccount();
            this.getHeadType();
            this.forceUpdate();
        },
        loginCall:function(){
            $.Ajax.request("/api/user", {
                method:"post",
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.responseText.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.responseText);
                            this.setTmpValue(true);
                            this.props.user.set("user",data.items[0]);
                        }else{
                            this.setTmpValue(false);
                            var hash = window.location.hash;
                            if (hash.indexOf("personal") != -1) {
                                routerReact.navigate("/login",{trigger: true});
                            }
                        }
                    } else{  //登录超时
                        this.setTmpValue(false);
                    }
                }.bind(this),
                failure:function(data){
                    this.setTmpValue(false);
                }.bind(this)
            });
        },
        welComeAccount:function(){
            if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false){
                $("#welAccount").css("display","none");
            }else{
                $("#welAccount").css("display","block");
            }
            if(this.props.headType=="homePage"){
                $("#weiBack").css("display","none");
            }else if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0) && history.length == 0 ){
                $("#weiBack").css("display","none");
            }else if((navigator.userAgent.indexOf('Firefox') >= 0 ||
                navigator.userAgent.indexOf('Opera') >= 0 ||
                navigator.userAgent.indexOf('Safari') >= 0 ||
                navigator.userAgent.indexOf('Chrome') >= 0 ||
                navigator.userAgent.indexOf('WebKit') >= 0) && history.length == 1){
                $("#weiBack").css("display","none");
            }
            else{
                $("#weiBack").css("display","block");
            }
        },
        getHeadType:function(){
            var headType=this.props.headType;
            $('#homePage').removeClass("wTChoose");
            $('#invest').removeClass("wTChoose");
            $('#financing').removeClass("wTChoose");
            $('#bianXian').removeClass("wTChoose");
            $('#aboutXX').removeClass("wTChoose");
            $('#helpCenter').removeClass("wTChoose");

            if(headType=="homePage"){
                $('#homePage').addClass("wTChoose");
            }else if(headType=="invest"){
                $('#invest').addClass("wTChoose");
            }else if(headType=="financial"){
                $('#financing').addClass("wTChoose");
            }else if(headType=="cash"){
                $('#bianXian').addClass("wTChoose");
            }else if(headType=="aboutXX"){
                $('#aboutXX').addClass("wTChoose");
            }else if(headType=="helpCenter"){
                $('#helpCenter').addClass("wTChoose");
            }

        },
        logout: function () {
            $.Ajax.request("/api/user/logout", {
                method:"post",
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.response.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.response);
                            this.setTmpValue(false);
                            var hash = window.location.hash;
                            this.props.user.set("user",{});
                            if (hash.indexOf("investBuy") != -1) {
                                routerReact.navigate("/#",{trigger: true});
                            } else if (hash.indexOf("personal") != -1) {
                                routerReact.navigate("/login",{trigger: true});
                            }
                        }
                    } else{
                        //退出失败
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        setTmpValue:function(status){
            window.loginStatus = status;
            new Cookie().setCookie("loginStatus",status);
            if(this.props.cookieModel) {
                this.props.cookieModel.set("loginStatus", status);
            }
        },
        handleBack:function(){
           history.back();
        },
        goPeronalAsset:function(){
            if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false){
                routerReact.navigate("login",{trigger: true});
            }else{
                routerReact.navigate("personal/asset",{trigger: true});
            }
        },
        render: function() {
            var mobileNumber=this.props.user.get('user')['mobileNumber'];
            return (
                <div className="mMarBottom">
                    <div className="main-header hidden-xs">
                       <div className="container">
                           <div className="row">
                               <div className="col-sm-4 col-md-6" style={{padding:"10px 15px"}}>
                                   <a  href="/#/"><img src="assets/images/icn_xxcaifu_logo.png" style={{width:"200px"}}/></a>
                               </div>
                               <div className="col-sm-4 col-md-3" style={{textAlign:"right"}} >
                                   <div className="clearfix welAccount" id="welAccount">
                                    <a  href="/#/personal/asset" style={{color:"right"}}>{mobileNumber}</a> ，欢迎来赚钱
                                    </div>
                               </div>
                               <div className="col-sm-3 col-md-2 myAccount">
                                   <div className="row" onMouseOver={this.handleMouserOver} onMouseOut={this.handleMouserOut}>
                                       <div className="col-sm-12" style={{textAlign:"center"}}>
                                           <div className="clearfix" id="myAccount1" style={{position: "absolute",width:"146px",borderTop:"1px solid #fff"}}>
                                               我的账户&nbsp;<span className=" icon-angle-down  myAccountImg" aria-hidden="true"></span>
                                           </div>
                                           <div className="clearfix accountUl" id="myAccount2">
                                               我的账户&nbsp;<span className="icon-angle-up  myAccountImg" aria-hidden="true"></span>
                                               <ul style={{paddingTop:"14px",marginBottom:"0px"}}>
                                                   <li><a href="/#/register">注册</a></li>
                                                   <li><a href="/#/login">登陆</a></li>
                                               </ul>
                                           </div>
                                           <div className="clearfix accountUl" id="myAccount3">
                                               我的账户&nbsp;<span className="icon-angle-up  myAccountImg" aria-hidden="true"></span>
                                               <ul style={{paddingTop:"14px",marginBottom:"5px"}}>
                                                   <li><a  href="/#/personal/asset">我的资产</a></li>
                                                   <li><a  href="/#/personal/transRecord">交易记录</a></li>
                                                   <li><a  href="/#/personal/assetDetails">余额明细</a></li>
                                                   <li><a  href="/#/personal/personalData">资料修改</a></li>
                                                   <li><a  href="/#/personal/accountSecurity">账号安全</a></li>
                                                   <li><a  href="/#/personal/banksMange">银行卡管理</a></li>
                                                   <li style={{borderTop:"1px solid #e5e5e5",paddingTop:"10px"}}><a href="javascript:void(0)" onClick={this.logout}><span className="icon-off" aria-hidden="true">&nbsp;安全退出</span></a></li>
                                               </ul>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                               <div className="col-sm-1 weiPhoneImg" >
                                   <div onMouseOver={this.handlePhoneOver} onMouseOut={this.handlePhoneOut} style={{position:"relative"}}>
                                       <span className="glyphicon glyphicon-phone" aria-hidden="true" style={{cursor:"pointer"}}></span>
                                       <div className="weiPhoneQRcode" id="weiPhoneQRcode">
                                           <img src="assets/images/qrcode.jpg" style={{width:"150px"}}/>
                                       </div>
                                   </div>
                               </div>
                            </div>
                       </div>
                   </div>
                    <div className="main-nar hidden-xs">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-11 col-md-9">
                                    <div className="row">
                                        <div className="clearfix weiTitles">
                                            <a href="/#/">
                                            <div className=" weiTitle" id="homePage">
                                               首页
                                             </div>
                                            </a>
                                            <a href="/#/invest">
                                            <div className="weiTitle" id="invest">
                                                投资
                                            </div>
                                            </a>
                                            <a href="/#/financial">
                                            <div className="weiTitle" id="financing">
                                                融资
                                            </div>
                                            </a>
                                            <a href="http://peizi.xxcaifu.com">
                                            <div className="weiTitle" id="peizi">
                                                    配资
                                            </div>
                                            </a>
                                            <a href="/#/cash">
                                            <div className="weiTitle" id="bianXian">
                                                变现
                                            </div>
                                            </a>
                                            <a href="/#/aboutXXCaifu">
                                            <div className="weiTitle" id="aboutXX">
                                                关于翔翔
                                            </div>
                                            </a>
                                            <a href="/#/article/help/register">
                                            <div className="weiTitle" id="helpCenter">
                                                帮助中心
                                            </div>
                                             </a>
                                          </div>
                                     </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    <div className="visible-xs container-fluid" style={{position:"fixed",top:"0px",width:"100%",zIndex:"999"}}>
                            <div className="row" >
                                <div className="clearfix wei-mobileTop">
                                     <div className="col-xs-3 wTback">
                                         <div className="wTbackShow" id="weiBack">
                                          <a href="javascript:void(0)" onClick={this.handleBack}>
                                            <i className="icon-chevron-left"></i>
                                          </a>
                                          </div>
                                     </div>
                                    <div className="col-xs-6 wTImg">
                                        <a  href="/#/"><img src="assets/images/icn_xxcaifu_logo.png" style={{height:"35px"}}/></a>
                                    </div>
                                     <div className="col-xs-3 wTPerson">
                                         <a onClick={this.goPeronalAsset} style={{cursor:"pointer"}} href="javascript:void(0)"><img src="assets/images/icn_menu_my_pre.svg" style={{width:"18px"}} /></a>
                                     </div>
                                </div>
                            </div>
                    </div>
                </div>
            );
        }
    });
});
