/**
 * Created by Administrator on 2015/8/7.
 */
'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
        'collection/TransactionRecordCollection',
        'jsx!component/Common/FormatDataComponent.react'
    ],
    function(React,$,Page,InfoAndMenu,TransactionRecordCollection,FormatDataComponent){
        return React.createClass({
            PropTypes:{
                COLS:["productName","investMoney","investTime","status"],
                COLS_MAPPING:{
                    "productName":"产品名称",
                    "investMoney":"投资金额",
                    "investTime":"投资时间",
                    "status":"状态"
                },
            },
            getInitialState:function(){
                return{
                    status:"状态"
                };
            },
            componentWillReceiveProps:function(){
                var palState=this.props.palState;
                var status;
                    if(palState=="0"){
                        status="已支付"
                    }else if(palState=="1"){
                        status="未支付";
                    }else{
                        status="状态";
                        palState="all";
                    }
                    this.setState({status:status});
                if(this.props.data.length > 0&&this.props.totalPage>1) {
                    $(".tcdPageCode").createPage({
                        pageCount: parseInt(this.props.totalPage),
                        current: parseInt(this.props.currentPage),
                        backFn: function (page) {
                            routerReact.navigate("/personal/transRecord/" +palState+ "/" + page,{trigger:true});
                        }.bind(this)
                    });
                }

            },
            goTopay:function(href){
                if(href!=""&&href!=undefined&&href!=null){
                    href=href.substring(2);
                    routerReact.navigate(href,{trigger:true});
                }
            },
            render:function(){
                if(this.props.fetch==true){
                    var data = this.props.data;
                    var showData ="";
                    if(data.length>0){
                        showData= this.props.data.map(function(trans){
                            var goToPay = "",href="";
                            var quantity=parseFloat(trans.quantity).toFixed(2);
                            var dateStyle={
                                color:"#A7BE88",
                                border:"1px solid #A7BE88"
                            };
                            var payStyle={};
                            if(trans.palState=="未支付"){
                                var href="/#/investBuy/"+trans.id;
                                goToPay =<a href={href} >
                                      <button className="btn btn-info" style={{padding:"5px 8px"}}>去支付</button>
                                   </a>
                                dateStyle={
                                    color:"#ff6400",
                                    border:"1px solid #ff6400"
                                };
                                payStyle={
                                    cursor:"pointer",
                                };
                            }
                            var palState=(trans.palState=="已支付")?<span className="tran-payFont">{trans.palState}</span>:"";
                            var newFormat = new FormatDataComponent();
                            var date;
                            if(trans.payDate!=0){
                                date= newFormat.formatData(trans.payDate,2);
                            }else{
                                date= newFormat.formatData(trans.orderDate,2);
                            }
                            var pTitle=(trans.product==null)?"":trans.product.title;
                            return(
                                <div>
                                    <div className="row tranDetail-W hidden-xs">
                                        <div className="col-md-4 tran-pBottom">{pTitle}</div>
                                        <div className="col-xs-5 col-sm-4 col-md-3 pa-ri-0" style={{fontSize:"17px",color:"#ff6400"}}>{quantity}元</div>
                                        <div className="col-xs-7 col-sm-4 col-md-3 pa-ri-0 " style={{color:"#666"}}>{date}</div>
                                        <div className="col-xs-7 col-sm-4 col-md-2 cl-xs-offset-5 col-sm-offset-0 tran-Status">{palState} {goToPay}</div>
                                    </div>
                                    <div className="row tranDetail-M visible-xs" onClick={this.goTopay.bind(null,href)} style={payStyle}>
                                        <div className="col-xs-8 t-title">{pTitle}</div>
                                        <div className="col-xs-4" style={{paddingLeft:"0px"}}>
                                            <div className="tran-Status" style={dateStyle}>
                                            {trans.palState}
                                            </div>
                                        </div>
                                        <div className="col-xs-6 pa-ri-0 " ><span className="t-jinEr">购买金额:</span><span className="t-quantity">&nbsp;{quantity}元</span></div>
                                        <div className="col-xs-6 pa-ri-0 pa-le-0" style={{color:"#B6B6B6",textAlign:"center"}}>{date}</div>
                                    </div>
                                </div>
                            );
                        }.bind(this))
                    }else{
                         showData =<div className="row">
                                        <div className="col-xs-12 tAlignCe noTran">
                                            未找到符合要求的订单
                                        </div>
                                  </div>;
                    }

                    var detail=<div className="col-sm-8">
                                  <div style={{border:"1px solid #CECECE",minHeight:"400px"}}>
                                     <div className="trans-title">{this.renderTitle()}</div>
                                        {showData}
                                      </div>
                                </div> ;

                    return (
                        <div className="container" style={{minHeight:"653px"}}>
                            <div className="row">

                                <div className="hidden-xs">
                                    {detail}
                                </div>
                                <InfoAndMenu title={this.props.title} user={this.props.user}/>
                                <div className="visible-xs" style={{marginTop:"20px"}}>
                                    {detail}
                                </div>
                                <div className="col-sm-12">
                                    <div className="tcdPageCode page-float"></div>
                                </div>

                            </div>
                        </div>
                    );
                }else{
                    return( <div className="container" style={{minHeight:"653px",textAlign:"center"}}>
                        <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                    </div>);
                }
            },
            change:function(e){
                if(e.target.value=="all"){
                    routerReact.navigate("/personal/transRecord",{trigger:true});
                }else {
                   routerReact.navigate("/personal/transRecord/" + e.target.value + "/" + 1,{trigger:true});
                }
            },
            renderTitle:function(){
                var COLS = this.PropTypes.COLS;
                var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
                return(<div className="row">{
                        COLS.map(function (col) {
                            if(col=="productName") {
                                return (<div className="col-md-4 hidden-xs hidden-sm">{COLS_MAPPING[col]}</div>);
                            }else if(col=="status"){
                                return (<div className="col-xs-3 col-sm-4 col-md-2 col-xs-offset-9 col-sm-offset-0  dropdown tr-status">
                                        <a  data-toggle="dropdown" href="javascript:void(0)" className="dropdown-toggle" role="button" id="tutorial" style={{color:"#999"}}>{this.state.status}<b className="caret"></b></a>
                                        <ul className="dropdown-menu tran-menu" role="menu" aria-labelledby="tutorial">
                                            <li role="presentation" className="tran-center"><a href="/#/personal/transRecord">全部</a></li>
                                            <li role="presentation" className="tran-center"><a href="/#/personal/transRecord/1/1">未支付</a></li>
                                            <li role="presentation" className="tran-center"><a href="/#/personal/transRecord/0/1">已支付</a></li>
                                        </ul>
                                </div>);
                            }else if(col=="investMoney"){
                                return (<div className="col-sm-4 col-md-3 pa-ri-0 hidden-xs" style={{paddingBottom:"10px"}}>{COLS_MAPPING[col]}</div>);
                            }else{
                                return (<div className="col-sm-4 col-md-3 pa-ri-0 hidden-xs">{COLS_MAPPING[col]}</div>);
                            }
                        }.bind(this))
                      }</div>
                );
            }
        });
    });