
/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax',
], function (React, $, Ajax) {
    return React.createClass({
        PropTypes:{
            types: ["weekly", "monthyly"]
        },
        getInitialState:function(){
            return{
                weekInvest:{title:"",badges:[]},
                monthInvest:{title:"",badges:[]},
                weekLimTitle:"",
                monthLimTitle:"",
            }
        },
        componentDidMount:function(){
            this.getInvest("weekly");
            this.getInvest("monthyly");
        },
        getInvest:function(type){
            $.Ajax.request(globamParam.public_url+"/products/"+type+"?start=0&count=1", {
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.responseText.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.responseText);
                            if(type=="weekly"){
                                this.setState({weekInvest:data.items[0],weekLimTitle:data.items[0].title});
                            }else{
                                this.setState({monthInvest:data.items[0],monthLimTitle:data.items[0].title});
                            }
                        }
                    } else{  //登录超时
                    }
                }.bind(this),
                failure:function(data){
                }.bind(this)
            });
        },
        render: function () {
            var weekInvest=this.state.weekInvest;
            var monthlyInvest=this.state.monthInvest;
            if(weekInvest.title!='' || monthlyInvest.title!=''){
                var url1="/#/invest/product/"+weekInvest.id;
                var url2="/#/invest/product/"+monthlyInvest.id;
                var timeLimit1= (weekInvest.endDate - weekInvest.startDate)/(1000*60*60*24);
                var timeLimit2= (monthlyInvest.endDate - monthlyInvest.startDate)/(1000*60*60*24);
                var status1=(weekInvest.status=="认购中")?"立即投资":weekInvest.status;
                var status2=(monthlyInvest.status=="认购中")?"立即投资":monthlyInvest.status;
                var tieXiValue1 = weekInvest.additionalRate > 0 ? Math.round((weekInvest.additionalRate * 100) * 1000) / 1000 : "";
                var tieXiValue2 = monthlyInvest.additionalRate > 0 ? Math.round((monthlyInvest.additionalRate * 100) * 1000) / 1000 : "";
                var tieXi1 = (tieXiValue1!="")?<span className="tieXiValue">+{tieXiValue1}<span style={{fontSize:"12px"}}>%</span></span>:"";
                var tieXi2 = (tieXiValue2!="")?<span className="tieXiValue">+{tieXiValue2}<span style={{fontSize:"12px"}}>%</span></span>:"";
                var wProfit =  Math.round((weekInvest.profitRate*100)*1000)/1000;
                var mProfit =  Math.round((monthlyInvest.profitRate*100)*1000)/1000;
                return(
                    <div className="container">
                        <div className="row">
                            <div className=" col-xs-12 InHot col-sm-6 ">
                                <div  style={{border:"1px solid #E6E6E6",background:"#fff",position:"relative"}}>
                                    <div className="row">
                                        <div className="wTriangle triangle-topleft1" />
                                        <div className="wTriangle triangle-topleft2" />
                                        <div className="wTriangle triangle-topleft3" />
                                        <div className="wi-status">推&nbsp;荐</div>
                                        <div className="col-xs-9 col-sm-10  wRecordHead col-xs-offset-3 col-sm-offset-2" style={{paddingLeft:"0px"}}>
                                            <div className="wRecordTitle" style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>
                                                <a href={url1} className="rTitle">{this.state.weekLimTitle}</a>
                                            </div>

                                        </div>
                                        <div className="col-xs-9 col-sm-10 col-xs-offset-3 col-sm-offset-2" style={{paddingLeft:"0px"}}>
                                            <div className="row">
                                                <div className="col-xs-4 wProfit" style={{paddingRight:"0px"}}>
                                                    <div className="weiXin-tBottom">预期年化</div>
                                                    <div className="wProfitRate">{wProfit}<span style={{fontSize:"14px"}}>%</span>
                                                        {tieXi1}
                                                    </div>
                                                </div>
                                                <div className="col-xs-3" style={{texAlign:"center",padding:"0px"}}>
                                                    <div className="weiXin-tBottom">产品期限</div>
                                                    <div className="w33">{timeLimit1}<span style={{fontSize:"14px"}}>天</span></div>
                                                </div>
                                                <div className="col-xs-5">
                                                    <div className="weiXin-tBottom">起投金额</div>
                                                    <div className="w33">{weekInvest.minBuy}<span style={{fontSize:"14px"}}>元</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="rengouBtn rgBtnColor">
                                                <a href={url1} style={{color:"#fff"}}>
                                                    <div>{status1}</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-6 InHot InHotTop">
                                <div  style={{border:"1px solid #E6E6E6",background:"#fff",position:"relative"}}>
                                    <div className="row">
                                        <div className="wTriangle triangle-topleft1" style={{borderTop: "85px solid #FFBB93"}}/>
                                        <div className="wTriangle triangle-topleft2" style={{borderTop: "70px solid #FF8C48"}}/>
                                        <div className="wTriangle triangle-topleft3" />
                                        <div className="wi-status">热&nbsp;门</div>
                                        <div className="col-xs-9 col-sm-10  wRecordHead col-xs-offset-3 col-sm-offset-2" style={{paddingLeft:"0px"}}>
                                            <div className="wRecordTitle" style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>
                                                <a href={url2} className="hTitle"> {this.state.monthLimTitle}</a>
                                            </div>
                                        </div>
                                        <div className="col-xs-9 col-sm-10 col-xs-offset-3 col-sm-offset-2" style={{paddingLeft:"0px"}}>
                                            <div className="row">
                                                <div className="col-xs-4 wProfit" style={{paddingRight:"0px"}}>
                                                    <div className="weiXin-tBottom">预期年化</div>
                                                    <div className="wProfitRate">{mProfit}<span style={{fontSize:"14px"}}>%</span>
                                                        {tieXi2}
                                                    </div>
                                                </div>
                                                <div className="col-xs-3" style={{texAlign:"center",padding:"0px"}}>
                                                    <div className="weiXin-tBottom">产品期限</div>
                                                    <div className="w33">{timeLimit2}<span style={{fontSize:"14px"}}>天</span></div>
                                                </div>
                                                <div className="col-xs-5">
                                                    <div className="weiXin-tBottom">起投金额</div>
                                                    <div className="w33">{monthlyInvest.minBuy}<span style={{fontSize:"14px"}}>元</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="rengouBtn rgBtnColor2">
                                                <a href={url2} style={{color:"#fff"}}>
                                                    <div>{status2}</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            }else{
                return(<div style={{minHeight:"500px",textAlign:"center"}}>
                    <i className="icon-spinner icon-spin" style={{fontSize:"36px"}}></i>
                </div>);
            }
        }
    });
});