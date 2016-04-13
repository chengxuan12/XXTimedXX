/**
 * Created by Administrator on 2015/9/10.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax'
], function (React,$,Ajax) {
    return React.createClass({
        PropTypes : {
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
            return{
                data:[]
            }
        },
        componentDidMount:function(){
            $.Ajax.request("/api/public/help/questions", {
                data:"start=0&count=4&type="+this.props.type,
                success:function(xhr){
                    if(xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText).items;
                        this.setState({data:data});
                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        render: function () {
            var problemTypes = this.PropTypes.problemTypes;
            if(this.state.data.length>0) {
                return (
                    <div className="container">
                        <div className="comTyProblem"><span className="ui-header">常见问题</span><a
                            href="/#/article/about/platform" className="otherLink2"
                            style={{height:"42px",lineHeight:"42px"}}>帮助中心&nbsp;<span
                            className="glyphicon glyphicon-chevron-right"></span></a></div>
                        <div className="row">
                            <div className="clearfix otherProblems comTyProBottom">
                                <div className="col-xs-12" style={{padding:"0 20px 0 40px"}}>
                                    <ul>
                                        {
                                            this.state.data.map(function (data) {
                                                var url = "";
                                                problemTypes.map(function (type) {
                                                    if (type.type == data.type) {
                                                        url = type.id;
                                                        return;
                                                    }
                                                });
                                                var href = "/#/article/help/" + url + "/" + data.id;
                                                return (
                                                    <li><a href={href} style={{fontSize:"16px"}}>{data.title}</a></li>);
                                            }.bind(this))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return(<div></div>);
            }
        }
    });
});
