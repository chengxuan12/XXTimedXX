/*Created by Administrator on 2015/7/24.*/
'use strict';
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
              mobile:""
          }
        },
        setTmpValue:function(status){
            window.loginStatus = status;
            new Cookie().setCookie("loginStatus",status);
            if(this.props.cookieModel) {
                this.props.cookieModel.set("loginStatus", status);
            }
        },
        componentDidMount: function () {
            this.props.user.on('change', function () {
                this.forceUpdate();
            }.bind(this));
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
                            if(window.location.hash.indexOf("personal")!=-1){
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
        logout: function () {
            $.Ajax.request("/api/user/logout", {
                method:"post",
                success:function(xhr){
                    if(xhr.status == 200) {
                        if (xhr.responseText.indexOf("<html>") == -1) {
                            var data = JSON.parse(xhr.responseText);
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
                if (window.loginStatus == undefined || window.loginStatus == "" || window.loginStatus == false)
                    return(
                        <ul className="nav navbar-nav navbar-right nav-responsive">
                            <li><a href="/#/register">注册</a></li>
                            <li><a href="/#/login">登陆</a></li>
                            <li className="hidden-xs">关于我们</li>
                            <li className="hidden-xs">服务热线：400-8081-999</li>
                        </ul>
                    );
                else
                    return (
                        <ul className="nav navbar-nav navbar-right nav-responsive" >
                            <li><a href="#/personal/asset">{this.props.user.get('user')['mobileNumber']}</a></li>
                            <li>
                                <a href="javascript:void(0);" onClick={this.logout}>退出</a>
                            </li>
                            <li className="hidden-xs">关于我们</li>
                            <li className="hidden-xs">服务热线：400-8081-999</li>
                        </ul>
                    );
        }
    });
});
