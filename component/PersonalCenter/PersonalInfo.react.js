/*Created by Administrator on 2015/8/11.*/
'use strict';

define([
        'react',
        'jquery',
        'Confirm',
        'Ajax',
        'jsx!component/Common/Cookie.react'
    ],
    function(React,$,Confirm,Ajax,Cookie){
        return React.createClass({
            getInitialState:function(){
                return{
                    user:this.props.user.get("user"),
                    userIcon:''
                };
            },
            componentDidMount:function(){
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                    this.forceUpdate();
                }.bind(this));
            },
            componentWillUpdate:function(nextProps, nextState){
                if(this.props.user.get('user')!=this.state.user){
                    this.setState({user:this.props.user.get('user')});
                }
            },
            setTmpValue:function(status) {
                window.loginStatus = status;
                new Cookie().setCookie("loginStatus", status);
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
                                if(window.location.hash.indexOf("personal")!=-1){
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
            render:function(){
                var user = this.state.user;
                var edit = "";
                var styles={
                    paddingTop:"40px",
                    color:"#666"
                }
                if (this.props.editIcon!=undefined){
                    styles.paddingTop="20px";
                }
                var loading = '';
                if(user.userIcon==''){
                    loading = <i className="icon-spinner icon-spin" style={{fontSize:"26px",position:"absolute",left:"43.5%",top:"50%",zIndex:"998"}}></i>;
                }
                if(window.location.hash.indexOf("personalData")!=-1 &&((navigator.userAgent.indexOf('Firefox') >= 0 ||
                    navigator.userAgent.indexOf('Opera') >= 0 ||
                    navigator.userAgent.indexOf('Safari') >= 0 ||
                    navigator.userAgent.indexOf('Chrome') >= 0 ||
                    navigator.userAgent.indexOf('WebKit') >= 0))){
                    edit = <a onClick={this.props.editIcon} style={{color:"#fff"}} href="javascript:void(0)">更换头像</a>;
                }
                var showName = user.nickName;
                if(showName==""){
                    showName = (user.userName=="")?user.mobileNumber:user.userName;
                }
                var exit = <a className="visible-display-xs" onClick={this.logout} href="javascript:void(0)">[退出]</a>;
                return (
                    <div>
                        <div style={{position:"relative"}}>
                            {loading}
                            <img src={user.userIcon}  style={{marginTop:"30px",width:"100px",height:"100px"}}>
                                <div className="changeHeadImg">
                                    {edit}
                                </div>
                              </img>
                        </div>
                        <div style={styles}>
                            您好,
                          {showName} {exit}
                        </div>
                    </div>
                );
            }
        });
    });