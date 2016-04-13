/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax',
], function (React,$,Ajax) {
    return React.createClass({
        PropTypes:{
            problemTypes: [
                {
                    id:"register",
                    type:"1",
                    title:"注册"
                },{
                    id:"invest",
                    type:"2",
                    title:"投资"
                },{
                    id:"pay",
                    type:"3",
                    title:"支付"
                },{
                    id:"cash",
                    type:"4",
                    title:"变现"
                },{
                    id:"financial",
                    type:"5",
                    title:"融资"
                }]
        },
        getInitialState:function(){
            return {
                QData:[],
                EData:[]
            }
        },
        componentDidMount:function(){
            $.Ajax.request("/api/public/help/questions", {
                data:"start=0&count=4",
                success:function(xhr){
                    if(xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText).items;
                        this.setState({QData:data});
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
            $.Ajax.request("/api/public/events", {
                data:"start=0&count=4",
                success:function(xhr){
                    if(xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText).items;
                        this.setState({EData:data});
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        render: function () {
            var types = this.PropTypes.problemTypes;
            return(
                <div>
                    <div className="wTitle comProblem" >常见问题<a href="/#/article/about/platform" className="otherLink2" >帮助中心&nbsp;<i className="icon-chevron-right"></i></a></div>
                    <div className="row">
                        <div className="clearfix otherProblems">
                            <div className="col-xs-12">
                                <ul>
                                    {
                                        this.state.QData.map(function(data){
                                            var url = "";
                                            types.map(function(type){
                                               if(type.type == data.type){
                                                    url = type.id;
                                                    return;
                                               }
                                            });
                                            var href = "/#/article/help/"+url+"/"+data.id;
                                            return (<li style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}><a href={href}>{data.title}</a></li>);
                                        }.bind(this))
                                    }
                                </ul>
                            </div>
                          </div>
                    </div>
                    <div className="wTitle" style={{padding:"15px 0px 0px 0px"}}>活动<a href="/#/article/event/all/1" className="otherLink2" >更多&nbsp;<i className="icon-chevron-right"></i></a></div>
                    <div className="row">
                        <div className="clearfix otherProblems">
                            <div className="col-xs-12">
                                <ul>
                                    {
                                        this.state.EData.map(function(data){
                                            var href = "/#/article/event/detail/"+data.id;
                                            return (<li style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}><a href={href}>{data.title}</a></li>);
                                        }.bind(this))
                                    }
                                </ul>
                            </div>
                         </div>
                    </div>
               </div>);
        }
    })
})