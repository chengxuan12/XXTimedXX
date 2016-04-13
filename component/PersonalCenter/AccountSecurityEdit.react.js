/**
 * Created by Administrator on 2015/9/16.
 */
'use strict';

define([
        'react',
        'jquery',
        'Ajax',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
        'jsx!component/FrameWork/ResettingPwd.react'
    ],
    function(React,$,Ajax,InfoAndMenu,ResettingPwd){
        return React.createClass({
            getInitialState:function(){
                return{
                    title:this.props.title,
                    user:this.props.user.get("user"),
                    pass:this.props.pass
                };
            },
            componentDidMount:function() {
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                    this.forceUpdate();
                }.bind(this));
            },
            goBack:function(){
                window.history.back();
            },
            render:function(){
                if(this.state.pass){
                }
                var mobileNumber=this.state.user.mobileNumber;
                return(
                    <div className="container" style={{minHeight:"653px"}}>
                        <div className="row">
                            <div className="visible-xs" style={{marginBottom:"20px"}}>
                                <InfoAndMenu title={this.state.title} user={this.props.user}/>
                            </div>
                            <div className="col-sm-8">
                              <div className="pLeftBorder">
                                  <div  className="securityBack" >
                                      <a onClick={this.goBack} style={{color:"#42b8ff",fontSize:"15px"}} href="javascript:void(0)" className="hidden-xs"><span className="icon-angle-left"></span>&nbsp;返回</a>
                                  </div>
                                  <ResettingPwd title={this.state.pass} mobileNumber={mobileNumber}/>
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