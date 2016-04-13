/**
 * Created by Administrator on 2015/9/16.
 */
'use strict';

define([
        'react',
        'jquery',
        'Ajax',
        'jsx!component/PersonalCenter/InfoAndMenu.react'],
    function(React,$,Ajax,InfoAndMenu){
        return React.createClass({
            getInitialState:function(){
                return{
                    title:this.props.title,
                    user:this.props.user.get("user")
                };
            },
            componentDidMount:function() {
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                    this.forceUpdate();
                }.bind(this));
            },
            render:function(){
                var user = this.state.user,
                setLogin = <span><a href="/#/personal/accountSecurityEdit/loginPass" style={{color:"#45b8ef"}}>重置</a></span>,
                tradePass="未设置",
                tradeStyle={color:"#999"},
                setTradePass =<a href="/#/personal/accountSecurityEdit/tradePass" style={{color:"#45b8ef"}}>设置</a>,

                realSys="未认证",
                realStyle={color:"#999"},
                mobileReal=<div className="visible-xs">
                            <div className="col-xs-5 visible-xs s-font3 pRight-0">实名认证</div>
                            <div className="col-xs-4 visible-xs col-sm-2 s-font3"><a href="/#/personal/banksMange" style={{color:"#45b8ef"}}>认证</a></div>
                          </div> ,
                webReal=<div>
                            <div className="col-sm-5 hidden-xs s-fontB ">您尚未进行实名制认证</div>
                            <div className="col-sm-3 hidden-xs"><a href="/#/personal/banksMange" style={{color:"#45b8ef"}}>认证</a></div>
                      </div>
                if(user.userName!="" && user.idNo!=""){
                    realStyle={color:"#45b8ef"};
                    realSys="已认证";
                    webReal=<div className="hidden-xs">
                        <div className="col-sm-8  s-font3 pRight-0">姓名:{user.userName}&nbsp;&nbsp;&nbsp;身份证:{user.idNo}</div>
                    </div>
                    mobileReal=<div className="visible-xs">
                        <div className="col-xs-9  s-font3 pRight-0" style={{paddingBottom:"5px"}}>姓名:{user.userName}</div>
                        <div className="col-xs-9 col-xs-offset-3  s-font3"><span>身份证:</span>{user.idNo}</div>
                    </div>
                }
                if(user.tradePassStates!=0){
                      tradePass="已设置",
                      tradeStyle={color:"#45b8ef"},
                      setTradePass = <span><a href="/#/personal/accountSecurityEdit/tradePass" style={{color:"#45b8ef"}}>重置</a></span>
                }
                return(
                       <div className="container" style={{minHeight:"653px"}}>
                           <div className="row">
                             <div className="visible-xs" style={{marginBottom:"20px"}}>
                                   <InfoAndMenu title={this.state.title} user={this.props.user}/>
                             </div>
                            <div className="col-sm-8">
                                <div className="pLeftBorder security">
                                    <div className="row s-title">
                                        <div className="col-xs-12">
                                           安全认证
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="row s-row">
                                                <div className="col-xs-3 col-sm-2 s-font pRight-0" style={{color:"#45b8ef"}}><span className="seNone"><i className="icon-ok"></i></span>已设置</div>
                                                <div className="col-xs-5 col-sm-2 s-font3 pRight-0">登录密码</div>
                                                <div className="col-sm-5 hidden-xs s-fontB ">建议密码由6位以上数字、字母和特殊字符组成</div>
                                                <div className="col-xs-4 col-sm-3 s-font45">{setLogin}</div>
                                            </div>
                                            <div className="row s-row">
                                                <div className="col-xs-3 col-sm-2 s-font pRight-0" style={tradeStyle}><span className="seNone"><i className="icon-ok"></i></span>{tradePass}</div>
                                                <div className="col-xs-5 col-sm-2 s-font3 pRight-0">交易密码</div>
                                                <div className="col-sm-5 hidden-xs s-fontB ">建议密码由6位以上数字、字母和特殊字符组成</div>
                                                <div className="col-xs-4 col-sm-3 s-font45">{setTradePass}</div>
                                            </div>
                                            <div className="row s-row">
                                                <div className="col-xs-3 col-sm-2 s-font pRight-0" style={realStyle}><span className="seNone"><i className="icon-ok"></i></span>{realSys}</div>
                                                <div className="col-sm-2 hidden-xs s-font3 pRight-0">实名认证</div>
                                                {webReal}
                                                {mobileReal}
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                             </div>
                             <div className="hidden-xs">
                                   <InfoAndMenu title={this.state.title} user={this.props.user}/>
                             </div>
                          </div>
                   </div>);
            }
        });
    });