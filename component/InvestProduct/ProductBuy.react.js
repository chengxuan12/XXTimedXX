/**
 * Created by Administrator on 2015/7/31.
 */
'use strict';
define([
    'react',
    'jquery',
    'Confirm',
    'Ajax',
    'MD5',
    'jsx!component/InvestProduct/ProductPayType.react',
    'jsx!component/InvestProduct/Banks.react',
    'jsx!component/InvestProduct/PayMask.react',
    'jsx!component/Common/FormatDataComponent.react'
], function (React,$,Confirm,Ajax,MD5,ProductPayType,BanksReact,PayMask,FormatDataComponent) {
    return React.createClass({
        PropTypes:{
            payType:[
                {
                    id:"2",
                    title:"余额支付"
                },
                {
                    id:"0",
                    title:"快捷支付"
                },
                {
                    id:"1",
                    title:"网银支付"
                }
            ]
        },
        getInitialState:function(){
            return{
                checked:true,
                bindChecked:true,
                order:this.props.order,
                bankList:[],
                add:false,
                phase:1,
                smsId:'',
                realName:this.props.user.get('user')['userName'],
                identityCardId:this.props.user.get('user')['idNo'],
                mobileNumber:'',
                cardNo:'',
                payType:0,
                inputTradePass:""
           }
        },
        componentDidMount:function(){
            this.props.user.on('change', function() {
                this.setState({realName:this.props.user.get('user')['userName'],identityCardId:this.props.user.get('user')['idNo']});
                this.forceUpdate();
            }.bind(this));
            $.ajax({
                url:"/api/account/banks",
                method:"get",
                success:function(info,state){
                    if(info.result=="success"){
                        this.setState({bankList:info.items});
                    }
                }.bind(this)
            });
            if (!window.XXCaifu.allowOnlinePay) {
                 delete this.PropTypes.payType[2];
           }
            $(".pPayWay:first").find(".cTriangle").css("display","block");
            $(".pPayWay:first").find(".cTriangle-font").css("display","block");
        },
        changePayType:function(value){
            this.setState({payType:value});
        },
        setCheck:function(){
          this.setState({checked:this.state.checked?false:true});
        },
        setBindChecked:function(){
            var t = this;
            if(this.state.bindChecked==true){
                $.confirm({
                    title: '',
                    content: '是否绑定银行卡？',
                    confirm: function(){
                        t.setState({bindChecked:true});
                    },
                    cancel: function(){
                        t.setState({bindChecked:false});
                    }
                });
            }else{
                this.setState({bindChecked:true});
            }
        },
        setAdd:function(flag){
            this.setState({add:flag});
        },
        bindCard:function(id){
          $.ajax({
              url:"/api/account/bank_card/"+id+"/bind",
              method:"post",
              success:function(data,status){
                if(data.result=="success"){
                    $.alert({
                        title: '',
                        content: "银行卡绑定成功"
                    });
                }
              },
              error:function(data){
                  $.alert({
                      title: '',
                      content: "银行卡绑定失败"
                  });
              }
          })
        },
        quickPay: function () {//快捷支付
            if($("#authenCode").val()==""){
                $.alert({
                    title: '',
                    content: "请输入验证码"
                });
                return;
            }
                var data = {
                    verifyCode: $("#authenCode").val(),
                    payHistoryId: this.state.smsId
                };
            $.ajax({
                url: "api/public/pay/mobile_fast/pay",
               method:"post",
               data:data,
               success:function(data,status){
                  if(data.result=="success"){//支付成功
                      var bankCardId=data.info['bankCardId'];
                      routerReact.navigate("/payResult/" + this.state.order.id + "/" + data.result + "/" + bankCardId, {trigger: true});
                  }
               }.bind(this),
               error:function(data){
                   $.alert({
                       title: '',
                       content: data.responseJSON.message
                   });
               }
            });
        },
        checkBankCard:function(){
            var data={bankName:$("input[name='bank_select']:checked").val(),mobileNumber:this.state.mobileNumber,cardNo:this.state.cardNo};
            var flag =false;
            $.ajax({
                url:"/api/account/bank_card/check",
                method:"post",
                data:data,
                async:false,
                success:function(info,state){
                    if(info.result=="success"){//可以添加
                       flag = true;
                    }
                },
                error:function(data,status){
                    $.alert({
                        title: '',
                        content: data.responseJSON.message
                    });
                }
            });
            return flag;
        },
        getCode: function (value) {//获取验证码
            var data= {
                orderId: this.state.order.id,
                mobileNumber:this.state.mobileNumber,
                userName:this.state.realName,
                bankName: $("input[name='bank_select']:checked").val(),
                identityCardId:this.state.identityCardId,
                payMoney: parseFloat($("#payMoney").val()),
                cardNo: this.state.cardNo,
                isBindBank: 1
            };
            if($("#select_account").val()!="add" && $("#select_account").val()!=undefined ){
                data = {
                    orderId: this.state.order.id,
                    bankCardId:$("#select_account").val(),
                    payMoney:parseFloat($("#payMoney").val()),
                }
            }
            $.ajax({
                url: "/api/public/pay/mobile_fast/request",
                method:"post",
                data:data,
                headers:{
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-type':'application/x-www-form-urlencoded;charset=utf-8'
                },
                success:function(info,state){
                    if (info.result == "success" && info.items[0]) {
                        this.setState({smsId: info.items[0].payHistoryId, phase: parseInt(this.state.phase) + value});
                    }
                }.bind(this),
                error:function(info){
                    $.alert({
                        title: '',
                        content: info.responseJSON.message
                    });
                }
            })
        },
        setCode:function(){
            var code = <div></div>;
            if(this.state.phase > 1){
                code = <div>
                        <label className="col-sm-2 control-label" htmlFor="authenCode">输入验证码</label>
                        <div className="col-sm-10">
                        <input type="text" placeholder="请输入验证码" id="authenCode" style={{width:"245px"}}/></div></div>;
                $("#code_show").show();
            }else{
                $("#code_show").hide();
            }
            return code;
        },
        setPhase:function(value){
          if(value > 0){//下一步
                  if($("#select_account").val()=="add" || $("#select_account").val()==undefined) {//新增
                      if(this.checkBankCard()){
                          this.handleDisabled(true);
                          this.getCode(value);
                      }
                  }else{
                      this.handleDisabled(true);
                      this.getCode(value);
                  }
          }else {
              this.handleDisabled(false);
              this.setState({phase:parseInt(this.state.phase)+value});
          }
        },
        handleDisabled:function(disable){
            if(this.state.bankList.length==0){
                $('#realName').attr("disabled", disable);
                $('#identityCardId').attr("disabled", disable);
            }
                $('#mobileNumber').attr("disabled",disable);
                $("#cardNo").attr("disabled",disable);//银行卡号
                $('#bank_select').attr("disabled", disable);
                $('#select_account').attr("disabled", disable);//选择帐号
                $('.bank_radio').attr("disabled", disable);
                $("#bank_checkbox").attr("disabled",disable);
                $("#bindBank_checkbox").attr("disabled",disable)

            $(".bank_radio").each(function(){
                $(this).find("input[type=radio]").attr("disabled",disable);
            });
       },
        getPreStep:function(){
            if(this.state.phase > 1) {
                return <a type="button" href="javascript:void(0)" className="btn btn-info btn-lg" onClick={this.setPhase.bind(null,-1)}>上一步</a>;
            }else{
                return (<div></div>);
            }
        },
        getNextStep:function(){
            if(this.state.payType != 0){
                if(this.state.checked==true){
                    return <a type="button" className="btn btn-info btn-lg" onClick={this.goToPay.bind(null,this.state.payType)}>支付</a>;
                }else{
                    return <a type="button" className="btn btn-info btn-lg" onClick={this.goToPay.bind(null,this.state.payType)} disabled="true">支付</a>;
                }
            }
            else if(this.state.phase > 1) {
                return (<a></a>);
            }
            if(this.state.checked==false||this.state.realName==""||this.state.identityCardId=="") {
                return <a type="button" className="btn btn-info btn-lg" disabled="true">获取验证码</a>;
            }
            if(this.state.bankList.length==0||this.state.add==true) {
                if (this.state.mobileNumber == "" || this.state.cardNo == "") {
                    return <a type="button" className="btn btn-info btn-lg" disabled="true">获取验证码</a>;
                }
            }
            if(this.state.add=="noChoose"){
                return <a type="button" className="btn btn-info btn-lg" disabled="true">获取验证码</a>;
            }
           return <a type="button" className="btn btn-info btn-lg" onClick={this.setPhase.bind(null,1)}>获取验证码</a>;
        },
        getPayStep:function(){
            if(this.state.phase > 1){
                return <a type="button"  href="javascript:void(0)" className="btn btn-info btn-lg" onClick={this.quickPay}>支付</a>;
            }
            else{
                return (<a></a>);
            }
        },
        handleRealName:function(event){
            this.setState({realName:event.target.value});
        },
        handleIdentityCard:function(event){
            this.setState({identityCardId:event.target.value});
        },
        handleMobile:function(value){
            this.setState({mobileNumber:value});
        },
        handleCardNo:function(value){
            this.setState({cardNo:value});
        },
        SureNameId:function(){
          $("#realName").attr("disabled", true);
          $("#identityCardId").attr("disabled", true);
        },
        goToPay:function(type){
            if(type==1){//网银支付
                $.ajax({
                    url: "/api/public/pay/ebank/request",
                    method:"post",
                    async:false,
                    data:{
                        orderId:this.state.order.id,
                        defaultBank: $("input[name='bank_select']:checked").val(),
                        bankName: $("input[name='bank_select']:checked").val(),
                        mobileNumber: this.state.mobileNumber,
                        realName: this.state.realName,
                        identityCardId: this.state.identityCardId,
                        payMoney: parseFloat($("#payMoney").val()),
                        cardNo: this.state.cardNo,
                    },
                    headers:{
                        'Accept':'application/json;charset=UTF-8',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    success:function(data,status) {
                        if (status == "success") {
                            $('#charge_light').css("display",'block');
                            $('#charge_fade').css("display",'block');
                            //开启新页面支付
                            var w = window.open();
                            w.location = data.items[0].payUrl;
                        }
                    }.bind(this),
                    error:function(data){
                        $.alert({
                            title: '',
                            content: data.responseJSON.message
                        });
                    }.bind(this)
                });
            }else{//余额支付
                $.ajax({
                    url:"/api/account/pay",
                    method:"post",
                    async:false,
                    data:{
                        orderId:this.state.order.id,
                        tradePass:$.md5(this.state.inputTradePass)
                    },
                    headers:{
                        'Accept':'application/json;charset=UTF-8',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    success:function(data,status) {
                        if (status == "success") {
                            if(data.result==1){
                                routerReact.navigate("/payResult/"+this.state.order.id+"/success/hadBind",{trigger:true});
                            }else{
                                $.alert({
                                    title: '',
                                    content:data.remark
                                });
                            }
                        }
                    }.bind(this),
                    error:function(data){
                        $.alert({
                            title: '',
                            content:data.message
                        });
                    }.bind(this)
                });
            }
        },
        changeIradePass:function(event){
            this.setState({inputTradePass:event.target.value});
        },
        render:function(){
            if(this.state.order.product){
                var order = this.state.order;
                var bankList = [],code="",preStep="",nextStep="",payStep="",bindCard="",bankReact="",chooseAccount="",choosePayAccount="",balancePay="";
                var newFormat = new FormatDataComponent();
                var startDate=  newFormat.formatData(order.orderDate,2);
                var prototalUrl = "/#/invest/product/"+order.product.id+"/protocol";
                if(this.state.payType==0){//快捷支付
                     bankList = this.state.bankList;
                     code = this.setCode();
                     preStep = this.getPreStep();
                     nextStep = this.getNextStep();
                     payStep = this.getPayStep();
                     bindCard="", bankReact="", chooseAccount=<div className="form-group"><label className="col-sm-2 control-label">选择账户</label><div className="col-sm-10"><ProductPayType bankList={bankList} setAdd = {this.setAdd} type={this.state.payType}/></div></div>;
                        if(this.state.bankList.length==0) {
                            chooseAccount = "";
                    }
                    if(this.state.bankList.length == 0 || this.state.add==true){
                        bankReact = <BanksReact mobileChange={this.handleMobile} cardNoChange={this.handleCardNo} mobileNumber={this.state.mobileNumber} cardNo={this.state.cardNo}  payType = {this.state.payType} col="10"/>;
                        bindCard = <div><input type="checkbox" id="bindBank_checkbox" checked={this.state.bindChecked} onClick={this.setBindChecked}/>绑定银行卡</div>;
                    }
                    if(this.state.bankList.length !=0){
                        this.SureNameId();
                    }
                }else if(this.state.payType==1){//网银支付
                    choosePayAccount = <BanksReact payType = {this.state.payType} col="10"/>;
                    nextStep=this.getNextStep();
                }else{//余额支付
                    nextStep=this.getNextStep();
                    var inputTradePass = <input type="password" id="payPwd" className="form-control" placeholder="请输入支付密码" value={this.state.inputTradePass} onChange={this.changeIradePass}/>;
                    if(this.props.user.get("user").tradePassStates == 0) {//已经设置过余额支付密码
                        inputTradePass = <span>你尚未设置余额支付密码，<a href="/#/personal/accountSecurityEdit/tradePass" target="_blank">前往设置</a></span>;
                    }
                    balancePay = <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="payPwd">支付密码</label>
                        <div className="col-sm-10">{inputTradePass}</div>
                    </div>;
                }
                return (
                    <div className="container">
                        <div className="row proBuyRow">
                            <div className="orderDetail">
                                <ul className="list-group">
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-2"><span style={{fontSize:"15px"}}>下单日期:&nbsp;&nbsp;</span>{startDate}</li>
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-2"><span className="hidden-xs" style={{fontSize:"15px"}}>订单号：</span><h5 className="visible-xs" style={{color:"#666",fontSize:"15px"}}>订单号：</h5>{order.id}</li>
                                    <li className="list-group-item col-xs-12 col-sm-10 col-sm-offset-2"><span style={{fontSize:"15px"}}>标&nbsp;题：</span>{order.product.title}</li>
                                </ul>
                            </div>
                        </div>

                        <form className="form-horizontal" style={{padding:"30px 0px"}}>
                            <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="payMoney">购买金额</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="payMoney" placeholder="请输入购买金额" value={order.quantity} disabled="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label"  htmlFor="realName">姓名</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="realName" placeholder="请输入姓名" value={this.state.realName} onChange={this.handleRealName}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label"  htmlFor="identityCardId">身份证号</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="identityCardId" placeholder="请输入身份证号" value={this.state.identityCardId} onChange={this.handleIdentityCard}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">支付方式</label>
                                <div className="col-sm-10">
                                    <div className="row">
                                        {
                                            this.PropTypes.payType.map(function(pay,index){
                                                if(pay.id == this.state.payType){
                                                    return (
                                                        <div className="col-xs-6 col-sm-3 col-md-2">
                                                            <div className="pPayWay">
                                                              <a href="javascript:void(0)" onClick={this.changePayType.bind(null,pay.id)}><div>{pay.title}</div></a>
                                                                <div className="cTriangle" style={{display:"block"}}/>
                                                                <div className="cTriangle-font" style={{display:"block",bottom:"-14px"}}><i className="icon-ok"></i></div>
                                                            </div>
                                                        </div>
                                                        )
                                                }else{
                                                    return (
                                                        <div className="col-xs-6 col-sm-3 col-md-2">
                                                            <div className="pPayWay">
                                                                <a href="javascript:void(0)" onClick={this.changePayType.bind(null,pay.id)}><div>{pay.title}</div></a>
                                                            </div>
                                                        </div>
                                                        )
                                                }
                                            }.bind(this))
                                        }
                                    </div>
                                </div>
                            </div>
                            {chooseAccount}
                            {choosePayAccount}
                            {bankReact}
                            {balancePay}
                            <div className="form-group">
                                <div className="col-xs-12 col-sm-offset-2 col-sm-10">
                                    <input type="checkbox" id="bank_checkbox" checked={this.state.checked} onClick={this.setCheck}/>已阅读并同意
                                    <a href={prototalUrl}>《合同协议》</a>
                                    {bindCard}
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className="form-group" id="code_show">
                                {code}
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    {preStep} {nextStep} {payStep}
                                </div>
                            </div>
                        </form>
                        <PayMask title="buy"/>
                    </div>
                );
            }else{
                return(<div></div>);
            }
        }
    })
});
