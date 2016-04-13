/**
 * Created by Administrator on 2015/8/20.
 */
'use strict';

define([
        'react',
        'jquery',
        'jsx!component/PersonalCenter/Menu.react',
        'jsx!component/PersonalCenter/PersonalInfo.react'
    ],
    function(React,$,Menu,PersonalInfo){
        return React.createClass({

            render:function(){
                return (
                    <div className="col-sm-4 personRight">
                        <div className="row" style={{background:"#fff",border:"1px solid #CECECE",boxShadow:"0 1px 5px rgba(0,0,0,.15)"}}>
                            <div className="col-xs-6 col-sm-6">
                                <Menu title={this.props.title}/>
                            </div>
                            <div className="col-xs-6 col-sm-6" style={{height:"222px",textAlign:"center",borderLeft:"1px solid #CECECE"}}>
                                <PersonalInfo user ={this.props.user} editIcon = {this.props.editIcon}/>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    });