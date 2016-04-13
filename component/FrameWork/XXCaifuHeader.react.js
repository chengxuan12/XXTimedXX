/**
 * Created by Administrator on 2015/7/24.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery',
    'Ajax',
    'jsx!component/FrameWork/LoginHeader.react',
    'jsx!component/Common/Cookie.react'
], function (React,Backbone,$,Ajax,LoginHeader,Cookie) {
    return React.createClass({
        componentDidMount: function () {
            this.props.user.on('change', function () {
                this.forceUpdate();
            }.bind(this));

            $(".navbar-nav a").on("click", function () {
                $(".collapse").collapse('hide')
            });
        },
        setTmpValue:function(status){
            window.loginStatus = status;
            new Cookie().setCookie("loginStatus",status);
            if(this.props.cookieModel) {
                this.props.cookieModel.set("loginStatus", status);
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
                            this.props.user.set("user",{});
                            if(window.location.hash.indexOf("investBuy")!=-1){
                                routerReact.navigate("/#",{trigger: true});
                            }else if(window.location.hash.indexOf("personal")!=-1){
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
        render: function () {
            var collapse = ($(window).width()>768)?"":"collapse navbar-collapse";
            var RegisterAndMobile,LoginAndOut;
            if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false){
                RegisterAndMobile= <li className="visible-xs"><a href="/#/register">注册</a></li> ;
                LoginAndOut=<li className="visible-xs"><a href="/#/login">登陆</a></li> ;
            }else{
                RegisterAndMobile=<li className="visible-xs"><a href="#/personal/asset">{this.props.user.get('user')['mobileNumber']}</a></li> ;
                LoginAndOut=<li className="visible-xs"> <a href="javascript:void(0);" onClick={this.logout}>退出</a></li> ;
            }
            return (
                <nav className="navbar navbar-default" style={{backgroundColor:"#fff"}}>
                    <div style={{backgroundColor:"#f9f9f9",borderBottom:"1px solid #dfdfdf"}}>
                       <div className="container hidden-xs topper-header">
                            <div className="nav-responsive-header-login">
                                <LoginHeader user={this.props.user} cookieModel={this.props.cookieModel}/>
                            </div>
                            <div style={{clear:"both"}}></div>
                       </div>
                     </div>

                    <div className="container">
                        <div className="navbar-header navbar-index-header">
                            <img src="assets/images/logo.jpg" className="visible-xs"
                                 style={{float:"left",width:"170px"}}/>
                            <button type="button" className="navbar-toggle collapsed navbar-index-toggle" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>


                        <div className={collapse} id="bs-example-navbar-collapse-1">
                            <div className="nav-responsive-header">
                                <a href="/#/"> <img src="assets/images/logo.jpg" className="hidden-xs home-top-image"/></a>
                                <ul className="nav navbar-nav colla-bottom">
                                    {RegisterAndMobile}
                                    <li className="hidden-xs"><a href="#/">首页</a></li>
                                    {LoginAndOut}
                                    <li><a href="/#/">我要投资</a></li>
                                    <li><a href="/#/">免费体验</a></li>
                                    <li><a href="/#/">天天赢</a></li>
                                    <li><a href="/#/">月月赢</a></li>
                                    <li><a href="/#/">安全保障</a></li>
                                    <li><a href="/#/">新手指引</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
    });
});