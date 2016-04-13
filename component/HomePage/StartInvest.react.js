/**
 * Created by Administrator on 2015/8/24.
 */
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        componentDidMount: function () {
            this.props.user.on("change", function () {
                this.forceUpdate();
            }.bind(this));
            $('#goTop').hide();
            $(window).scroll(function() {
                this.setTopShow();
            }.bind(this));
        },
        startNow:function(){
            var userMobile = this.props.user.get('user')['mobileNumber'];
            if (userMobile == undefined || userMobile == "" || userMobile == null) {
                routerReact.navigate("register",{trigger: true});
            }else{
                routerReact.navigate("invest",{trigger: true});
            }
        },
        setRightTop:function(){
            $('html, body').animate({scrollTop: 0}, 800);
        },
        setTopShow:function(){
            if ($(window).scrollTop() >500){
                $('#goTop').show();
            } else{
                $('#goTop').hide();
            }
        },
        render: function () {
            return(<div style={{background:"#ebebeb"}}>
                <div className="container">
                    <div className="row">
                        <div className="clearfix startInvest">
                            <div className="col-xs-12 tAlignCe">
                                <span className="stInFont">准备好开始您的轻松投资之旅了吗？</span>
                            </div>
                            <div className="col-xs-12 tAlignCe">
                                <a href="javascript:void(0)" onClick={this.startNow}><div className="startInBtn">立即开始</div></a>
                            </div>
                        </div>
                   </div>
                </div>
                <a href="javascript:void(0)" onClick={this.setRightTop} id="goTop">
                    <div className="queEvRiMobile queEvRiMoImg">
                        <i className=" icon-circle-arrow-up"/>
                    </div>
                </a>
            </div>);
        }
    });
});

