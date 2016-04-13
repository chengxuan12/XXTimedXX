/**
 * Created by Administrator on 2015/9/18.
 */
'use strict';

define([
    'react',
    'jquery',
    'jsx!component/Admin/AdminMenu.react'
], function (React,$,AdminMenu) {
    return React.createClass({
        getInitialState:function(){
            return{
                fetch:false
            }
        },
        componentDidMount:function(){
            this.props.user.on('change', function () {
                this.forceUpdate();
            }.bind(this));
            $.Ajax.request("/api/user", {
                method: "post",
                success: function (xhr) {
                    if (xhr.status == 200) {
                        if (xhr.responseText.indexOf("<html>") == -1) {
                            var data = JSON.parse(xhr.responseText);
                            this.props.user.set("user", data.items[0]);
                            window.loginStatus =true;
                            if (location.hash.indexOf("admin") != -1) {
                                this.isManager();
                            }
                        } else {
                            var hash = window.location.hash;
                            if (hash.indexOf("personal") != -1) {
                                routerReact.navigate("/login", {trigger: true});
                            } else if (hash.indexOf("admin") != -1) {
                                routerReact.navigate("/error/403", {trigger: true});
                            }
                        }
                    } else {  //登录超时
                        routerReact.navigate("/error/403", {trigger: true});
                    }
                }.bind(this),
                failure: function (data) {
                }.bind(this)
            });
        },
        isManager: function () {
            $.Ajax.request("/api/user/ismanager", {
                method: "get",
                success: function (xhr) {
                    if (xhr.status == 200) {
                        if (xhr.responseText.indexOf("<html>") == -1) {
                            var data = JSON.parse(xhr.responseText);
                            if (data.code != 6) {//管理员
                                routerReact.navigate("/error/403", {trigger: true});
                            }else{
                                this.setState({fetch:true});
                            }
                        } else {//未登录
                            routerReact.navigate("/error/403", {trigger: true});
                        }
                    }
                }.bind(this),
                failure: function (data) {
                }.bind(this)
            });
        },
        render: function() {
            var menu=new AdminMenu();
            var menus=menu.PropTypes.Menu;
            var mobileNumber=this.props.user.get('user')['mobileNumber'];
            if(this.state.fetch==true){
                var s=this;
                var inClass = "collapse",outerClass = "collapse in";
                var user=this.props.user;
                return (
                    <nav role="navigation" className="navbar navbar-default admin-nav a-navBackWeb" id="navbar-example2">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="navbar-header a-navBack admin-header">
                                        <button data-target=".admin-menu" data-toggle="collapse" type="button" className="navbar-toggle collapsed menu-btn">
                                            <span className="sr-only"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                        <a href="/#/" className="admin-brand">后台管理系统</a>
                                        <div className="nav-no-collapse header-nav">
                                            <ul className="nav_a pull-right admin-ul">
                                                <li> <a className="btn" href="/#/personal/asset"> <i className="icon-user icon-white"></i> {mobileNumber}</a></li>
                                                <li> <a className="btn" href="/#/"> <i className="icon-home icon-white"></i> 返回网站首页</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="collapse navbar-collapse admin-menu ">
                                        <ul className="nav_a navbar-nav admin-Mul visible-mb">
                                            {
                                                menus.map(function(m,index){
                                                    var showHidden = (s.props.title==m.id)?outerClass:inClass;
                                                    var liActive=(s.props.title==m.id)?"liActive":"";
                                                    if(m.items.length==0){
                                                        return (<li>
                                                            <a href={m.href} className={liActive}>{m.icon}&nbsp;{m.title}</a>
                                                        </li>)
                                                    }else{
                                                        return(<li className="dropdown admin-liCo">
                                                                <a  role="button" data-toggle="collapse" href={"#"+m.id} className="dropdown-toggle" >{m.icon}&nbsp;{m.title}</a>
                                                                <ul  role="menu" className={showHidden} id={m.id}>
                                                                    {
                                                                        m.items.map(function(d){
                                                                            return(<li>
                                                                                    <a href={d.href}>{d.icon}&nbsp;{d.title}</a>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </li>
                                                        )
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>);
            }else{
                return( <div className="container" style={{minHeight:"1200px",textAlign:"center"}}>
                    <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                </div>);
            }

        }
    });
});
