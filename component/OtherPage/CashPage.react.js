/**
 * Created by Administrator on 2015/8/31.
 */
'use strict';
define([
    'react',
    'jquery',
    'jsx!component/OtherPage/CommonProblem.react'
], function (React,$,CommonProblem) {
    return React.createClass({
        getInitialState:function(){
            return{
                data:[]
            }
        },
        componentDidMount: function () {
            this.setTimer();
            $(window).resize(function() {
                this.setTimer();
            }.bind(this));
        },
        setTimer:function(){
            var t = this;
            if(this.refs.cash_banner){
                var height = 0 ,baseHeight = $(window).height() * 0.28,naturalWidth,naturalHeight;//原始的宽高度
                if(!window.mobilecheck() || (window.mobilecheck() && $(window).height()< 385)){
                    baseHeight = baseHeight > 265 ? baseHeight : 265;
                }
                $("#cash_banner").attr("src", $("#cash_banner").attr("src")).load(function() {
                    naturalWidth = this.naturalWidth;
                    naturalHeight = this.naturalHeight;
                    var prop = this.naturalWidth / this.naturalHeight;
                    var baseWidth = prop * baseHeight;
                    var N = 2;
                    var left = -((baseWidth - $(window).width())/N).toFixed(2) +"px";
                    $("#cash_banner").css("position","absolute").css("height",baseHeight).css("width","auto").css("left",left);
                    if($(window).width() > 1200) {
                        $("#cash_banner").css("position","relative").css("width",'100%').css("height",baseHeight).css("left","0px");
                        baseHeight = "auto";
                    }
                    t.restSwiper(baseHeight);
                });
            }
        },
        restSwiper:function(height){
            $("#cash_banner").height(height);
            $("#cash_div").height(height);
            if($(window).width()>750){
                $("#cash_div").css("margin-top","-20px");
            }else{
                $("#cash_div").css("margin-top","0px");
            }
        },
        render: function () {
            var divider=<div className="row"><div className="col-xs-12"><div style={{borderTop:"1px solid #ccc",height:"1px"}}></div></div></div>;
            return(
                <div>
                <div id="cash_div" style={{background:"#F0F0F0",position:"relative",overflow:"hidden",width:"100%",height:"100%"}}>
                    <img src="assets/images/cash_banner.png" id="cash_banner" ref="cash_banner"/>
                </div>
                <div className="container">
                    <div className="row cash_row">
                            <div className="col-xs-12 col-sm-7">
                                <div className="cashPage-title">什么是变现?</div>
                                <div className="cashPage-content">变现是投资者以持有翔翔财富可变现资产的到期回款作为还款来源而发起的一笔 "个人贷" 借款。</div>
                            </div>
                            <div className="col-xs-12 col-sm-4 text-center">
                                <img src="assets/images/cash_explain_1.png" style={{width:"80%"}}/>
                            </div>
                    </div>
                    {divider}
                    <div className="row cash_row">
                        <div className="col-xs-12 col-sm-4 col-sm-offset-1 text-center">
                            <img src="assets/images/cash_explain_2.png" style={{width:"80%"}}/>
                        </div>
                        <div className="col-xs-12 col-sm-7">
                            <div className="cashPage-title">购买翔翔财富可变现产品即可申请</div>
                            <div className="cashPage-content">
                                注：&nbsp;1.可变现资产自起息日至距到期60个自然日(含)以上可申请变现;<br />
                                <span style={{paddingLeft:"40px"}}>2.起始变现金额为1000元，递增变现金额需为1的整数倍;</span><br/>
                                <span style={{paddingLeft:"40px"}}>3.针对同一可变现产品资产可以全部变现，也可以部分变现。</span></div>
                        </div>
                    </div>
                    {divider}
                    <div className="row cash_row">
                        <div className="col-xs-12 col-sm-7">
                            <div className="cashPage-title">自主设置变现利率，掌握变现主动权</div>
                            <div className="cashPage-content">变现个人贷的融资利率由变现申请人根据市场利率自行填写</div>
                        </div>
                        <div className="col-xs-12 col-sm-4 text-center">
                            <img src="assets/images/cash_explain_3.png" style={{width:"80%"}}/>
                        </div>
                    </div>
                    {divider}
                    <div className="row cash_row">
                        <div className="col-xs-12 col-sm-4 col-sm-offset-1 text-center">
                            <img src="assets/images/cash_explain_4.png" style={{width:"80%"}}/>
                        </div>
                        <div className="col-xs-12 col-sm-7">
                            <div className="cashPage-title">变现的资金去哪儿了?</div>
                            <div className="cashPage-content">变现成功后，变现借款资金自动打款至账户余额，请注意查验哦</div>
                        </div>
                    </div>
                    {divider}
                    <div className="row cash_row">
                        <div className="col-xs-12 col-sm-7">
                            <div className="cashPage-title">变现的借款如何还款?</div>
                            <div className="cashPage-content">变现是变现人发起的个人借款，是需要变现人还款的，但是变现到期日自动还款，无需手工操作，省心省力。</div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-sm-offset-1 text-center">
                            <img src="assets/images/cash_explain_5.png" style={{width:"80%"}}/>
                        </div>
                    </div>
                  </div>

                   <div style={{background:"#f0f0f0"}}>
                      <CommonProblem type="4"/>
                 </div>
                </div>
            );
        }
    });
});