/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax',
    'Confirm',
], function (React,$,Ajax,Confirm) {
    return React.createClass({
        getInitialState:function(){
            return{
                invests:[],
            }
        },
        componentDidMount:function(){
            $.Ajax.request(globamParam.public_url+"/order/shopprush", {
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.responseText.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.responseText);
                            this.setState({invests:data.items});
                        }
                    } else{  //登录超时
                    }
                }.bind(this),
                failure:function(data){
                }.bind(this)
            });
        },
        componentDidUpdate:function(){
            if($("#scrollInvest")!=null){
                $("#scrollInvest").Scroll({line: 1, speed: 500, timer: 3000, up: "but_up", down: "but_down"});
            }
        },
        getScroll:function(){
            var scroll = "";
            if(this.state.invests.length!=0) {
                scroll=<div className="scrollInvest col-xs-12 col-md-3" id="scrollInvest">
                    <ul style={{fontSize:"12px"}}>{
                        this.state.invests.map(function(invest){
                            if(invest!=null && invest.userSimple && invest.product)
                                return(<li>
                                    <div className="col-xs-3" style={{paddingLeft:"0px",textAlign:"right"}}>
                                        <img style={{width:"42px",paddingLeft:"0px"}} src="assets/images/avatar_investor.png" />
                                    </div>
                                    <div className="col-xs-9">
                                        <div className="row">
                                            <div className="col-xs-12" style={{fontSize:"14px",width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>
                                                {invest.product.title}
                                            </div>
                                            <div className="col-xs-12" style={{paddingTop:"5px"}}>
                                                {invest.userSimple.mobile}&nbsp;投资{invest.quantity}元
                                            </div>
                                        </div>
                                    </div>
                                </li>)
                        })
                    }</ul>
                </div>
                return scroll;
            }else{
                return <div className="scrollInvest col-xs-12 col-md-3 hidden-xs hidden-sm"></div>
            }
        },
        render: function () {
            var scroll=this.getScroll();
            return(
                <div className="container wInvestNotes">
                        <div className="row hidden-xs">
                            <div className="clearfix"  style={{margin:"0px 15px"}}>
                                <div className="col-sm-9 wTitle">他们是怎么理财的？</div>
                                <div className="col-sm-3 wTitle hidden-sm">大家都在抢</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="clearfix wInContent">
                                <div className="col-mxs-12 col-xs-4 col-md-3" style={{textAlign:"center",padding:"15px 0"}}>
                                    <div><a href="/#/invest"><img className="wInImg1" src="assets/images/investor_type_1.png" /></a></div>
                                    <div className="wTitle-3">稳定收益&nbsp;灵活变现</div>
                                    <div className="wTitle-3">起投金额 &nbsp;<span style={{color:"#FF795F"}}>100元</span></div>
                                </div>
                                <div className="col-mxs-12 col-xs-4  col-md-3" style={{textAlign:"center",padding:"15px 0"}}>
                                    <div><a href="/#/invest"><img className="wInImg1" src="assets/images/investor_type_2.png" /></a></div>
                                    <div className="wTitle-3">定期理财&nbsp;未来消费</div>
                                    <div className="wTitle-3">起投金额 &nbsp;<span style={{color:"#FF795F"}}>100元</span></div>
                                </div>
                                <div className="col-mxs-12 col-xs-4  col-md-3" style={{textAlign:"center",padding:"15px 0"}}>
                                    <div><a href="/#/invest"><img className="wInImg1" src="assets/images/investor_type_3.png"/></a></div>
                                    <div className="wTitle-3">财富增值&nbsp;灵活变现</div>
                                    <div className="wTitle-3">起投金额 &nbsp;<span style={{color:"#FF795F"}}>100元</span></div>
                                </div>
                                {scroll}
                            </div>
                      </div>
                  </div>
            );
        }
    });
});