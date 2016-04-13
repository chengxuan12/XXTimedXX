/**
 * Created by Administrator on 2015/8/6.
 */
'use strict';

define([
    'react',
    'jquery',
    'Confirm',
    'jsx!component/Common/FormatDataComponent.react'
], function (React,$,Confirm,FormatDataComponent) {
    return React.createClass({
        getInitialState:function(){
            return {
                payResult:this.props.payResult,
                timeWait:"60"
            }
        },
        componentDidMount:function(){
            var wait=this.state.timeWait;
            var timer = setInterval(function(){
                if (this.state.timeWait == 0) {
                    this.setState({timeWait:20});
                    clearInterval(timer);
                    if(this.state.payResult=="success"){
                        this.returnFirst();
                    }else{
                        this.returnBack();
                    }
                } else {
                    this.setState({timeWait:this.state.timeWait-1});
                }
            }.bind(this),1000);
        },
        returnFirst:function(){
            routerReact.navigate("/personal/transRecord", {trigger: true});
        },
        returnBack:function(){
            window.history.go(-1);
        },
        bindBank:function(){
            $.ajax({
                url:globamParam.login_url+"/account/bank_card/"+this.props.cardId+"/bind",
                method:"post",
                success:function(data,status){
                    if(data.result=="success"){
                        $("#bindcard").prop("disabled",true);
                        $.alert({
                            title: '',
                            content:"绑定成功"
                        });
                    }
                },
                error:function(data){
                    $.alert({
                        title: '',
                        content:"绑定失败"
                    });
                }
            })
        },
        render:function(){
            var payResult = this.state.payResult;
            var bindBankBtn="";
                if(this.props.cardId!="hadBind"){
                    //bindBankBtn=<button id="bindcard" className="btn btn-info" onClick={this.bindBank}>绑定此张银行卡</button>
                };
            if(payResult=="success"){
                var newFormat = new FormatDataComponent();
                var orderDate =  newFormat.formatData(this.props.order.orderDate,2);
                return (
                    <div className="container proPayResult">
                      <div className="row">
                          <div className="col-xs-12 text-center" style={{padding:"10px 15px"}}>
                              <img src="assets/images/w_success.jpg" className="PayResultImg"/>&nbsp;
                              <span className="PayResultImgFont">支付成功&nbsp;&nbsp;&nbsp;</span>
                              {bindBankBtn}
                          </div>
                      </div>
                        <div className="row proBuyRow" >
                            <div className="orderDetail">
                                <ul className="list-group">
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-1" style={{background:"#E5F5FF"}}><span style={{fontSize:"18px",fontWeight:"700"}}>订单详情</span></li>
                                    <li className="list-group-item col-xs-12 col-sm-5 col-sm-offset-1" style={{background:"#E5F5FF"}}><span style={{fontSize:"15px"}}>订单金额:&nbsp;&nbsp;</span>{this.props.order.quantity}元</li>
                                    <li className="list-group-item col-xs-12 col-sm-5" style={{background:"#E5F5FF"}}><span style={{fontSize:"15px"}}>下单日期:&nbsp;&nbsp;{orderDate}</span></li>
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-1" style={{background:"#E5F5FF"}}><span className="hidden-xs" style={{fontSize:"15px"}}>订单号：</span><h5 className="visible-xs" style={{color:"#666",fontSize:"15px"}}>订单号：</h5>{this.props.order.id}</li>
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-1" style={{background:"#E5F5FF"}}><span style={{fontSize:"15px"}}>标&nbsp;题：</span>{this.props.order.product.title}</li>
                                </ul>
                            </div>
                        </div>
                      <div className="row" >
                        <div className="col-xs-12 text-center" style={{padding:"25px 15px"}}>
                            <span style={{fontSize:"17px"}}><span style={{color:"red"}}>{this.state.timeWait}</span>秒后跳转到个人中心页面&nbsp;&nbsp;</span>
                            <button className="btn "style={{background:"#5CB650",color:"#fff"}} onClick={this.returnFirst}>立即跳转</button>
                        </div>
                       </div>
                    </div>)
            }else{
                return(
                    <div className="container proPayResult" >
                    <div className="row">
                        <div className="col-xs-12" >
                            <div  style={{textAlign:"center",padding:"40px 15px 10px 15px",background:"#E5F5FF"}}>
                                <img src="assets/images/w_failure.jpg" className="PayResultImg"/>&nbsp;
                                <span className="PayResultImgFont">支付失败</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div  style={{textAlign:"center",padding:"10px 15px 40px 15px",background:"#E5F5FF"}}>
                                <span style={{fontSize:"17px"}}><span style={{color:"red"}}>{this.state.timeWait}</span>秒后跳转到支付界面&nbsp;&nbsp;</span>
                                <button className="btn "style={{background:"#E05239",color:"#fff"}} onClick={this.returnBack}>重新支付</button>
                            </div>
                        </div>
                    </div>
                </div>);
            }
        },
    })
});