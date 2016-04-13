/**
 * Created by Administrator on 2015/8/18.
 */
'use strict';

define([
        'react',
        'jquery',
        'Confirm',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
        'jsx!component/InvestProduct/Banks.react',],

    function(React,$,Confirm,InfoAndMenu,BanksReact){
        return React.createClass({
            getInitialState:function(){
                return{
                    title:this.props.title,
                    phase:1,
                    bankList:[],
                    user:this.props.user.get('user'),
                    realName:this.props.user.get('user').userName,
                    identityCardId:this.props.user.get('user').idNo,
                    mobileNumber:"",
                    cardNo:"",
                    smsId:"",
                    authenCode:"",
                    fetch:false
                }
            },
            componentDidMount:function() {
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get('user'),realName:this.props.user.get('user').userName,identityCardId:this.props.user.get('user').idNo});
                    this.forceUpdate();
                }.bind(this));
                this.getBanks();
            },
            getBanks:function(){
                $.ajax({
                    url:globamParam.login_url+"/account/banks",
                    method:"get",
                    success:function(info,state){
                        if(info.result=="success"){
                            this.setState({bankList:info.items,fetch:true});
                        }
                    }.bind(this)
                });
            },
            componentDidUpdate: function () {
                if(this.state.phase==3){
                    this.handleDisabled(true);
                }
                if(this.state.phase==2){
                    this.handleDisabled(false);
                }
            },
            menuInfo:function(){
                var menuInfo=<InfoAndMenu title={this.state.title} user={this.props.user}/>;
                return menuInfo;
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
            handleAuthenCode:function(value){
                this.setState({authenCode:value});
            },
            setCode:function(){
                var code = <div></div>;
                if(this.state.phase ==3){
                    code =<div className="form-group" id="code_show">
                            <label className="col-sm-2 control-label">输入验证码</label>
                            <div className="col-sm-10">
                                <input type="text" placeholder="请输入验证码" id="authenCode" style={{width:"200px"}} onChange={this.handleAuthenCode}/>
                            </div>
                        </div>
                }
                return code;
            },
            getCode:function(){
                var data= {
                    bankName:$("input[name='bank_select']:checked").val(),
                    mobileNumber:this.state.mobileNumber,
                    userName:this.state.realName,
                    identityCardId:this.state.identityCardId,
                    payMoney: parseFloat($("#payMoney").val()),
                    cardNo: this.state.cardNo,
                    isBindBank: 1
                };
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
                            this.setState({smsId: info.items[0].payHistoryId});
                        }
                    }.bind(this),
                    error:function(info){

                    }
                })
            },
            handleDisabled:function(disable) {
                if (this.state.bankList.length != 0) {
                    $('#realName').attr("disabled", true);
                    $('#identityCardId').attr("disabled", true);
                }else{
                    $('#realName').attr("disabled", disable);
                    $('#identityCardId').attr("disabled", disable);
                }
                $('#mobileNumber').attr("disabled",disable);
                $("#cardNo").attr("disabled",disable);//银行卡号
                $('#bank_select').attr("disabled", disable);
                $('.bank_radio').attr("disabled", disable);
                $(".bank_radio").each(function(){
                    $(this).find("input[type=radio]").attr("disabled",disable);
                });
            },
            handleMouserOver:function(spanId){
                var id="#"+spanId;
                $("#"+spanId).css("display","block");
            },
            handleMouserOut:function(spanId){
                $("#"+spanId).css("display","none");
            },
            deleteBank:function(bankId){
                var s=this;
                $.confirm({
                    title: '',
                    content: '确定解绑银行卡？',
                    confirm: function(){
                        $.ajax({
                            url:globamParam.login_url+"/account/bank_card/"+bankId,
                            method:"delete",
                            success:function(info,state){
                                if(info.result=="1"){
                                    $.alert({
                                        title: '',
                                        content:"解绑成功"
                                    });
                                    s.getBanks();
                                }
                            }.bind(this),
                            error:function(info){
                                if(info.responseText.indexOf("<html>")==-1){
                                    var data = JSON.parse(info.responseText);
                                    $.alert({
                                        title: '解绑失败',
                                        content:data.message
                                    });
                                }

                            }
                        })
                    },
                    cancel: function(){

                    }
                });
            },
            getPersonBanks:function(){
                var bankList = this.state.bankList;
                var s=this;
                if(this.state.fetch==true){
                    if(bankList.length!=0){
                        return <div>
                            <div className="panel panel-default" style={{border:"0px",marginBottom:"0px"}}>
                                <div className="panel-body">
                                    <div className="col-xs-12 " style={{textAlign:"right"}}>
                                        <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,2)} style={{width:"150px",height:"40px"}}>添加银行卡</button>
                                    </div>
                                </div>
                            </div>
                            {
                                bankList.map(function(bank){
                                    var deleteSpan="aa"+bank.id;
                                    return ( <div className="panel panel-default personBank">
                                        <div className="panel-body">
                                            <div className="col-xs-3 col-sm-2" style={{textAlign:"right"}}>
                                                <img src={bank.bankIconUrl} className="personBankImg"/>
                                            </div>
                                            <div className="col-xs-5 col-sm-7" >
                                                <div className="row">
                                                    <div className="col-xs-12 bankName">
                                                        {bank.bankName}
                                                    </div>
                                                    <div className="col-xs-12">
                                                        {bank.cardNo}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-4 col-sm-3">
                                                <div className="row" style={{cursor:"pointer"}} onMouseOver={s.handleMouserOver.bind(null,deleteSpan)} onMouseOut={s.handleMouserOut.bind(null,deleteSpan)}>
                                                    <div className="col-xs-12" style={{textAlign:"center"}}>
                                                        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                                    </div>
                                                    <div id={deleteSpan} className="col-xs-12 deleteImg" style={{textAlign:"center"}} onClick={s.deleteBank.bind(null,bank.id)}>
                                                        <span className="glyphicon glyphicon-trash" aria-hidden="true" ></span>&nbsp;删除
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>);
                                })
                            }
                        </div>
                    }else{
                        return <div className="col-xs-12 tAlignCe" style={{padding:"160px 0px"}}>
                            <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,2)} style={{width:"150px",height:"40px"}}>添加银行卡</button>
                        </div>
                    }
                }else{
                    return( <div className="container" style={{minHeight:"653px",textAlign:"center"}}>
                        <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                    </div>);
                }

            },
            getAddBank:function(){
                var bankReact= <BanksReact mobileChange={this.handleMobile} cardNoChange={this.handleCardNo} mobileNumber={this.state.mobileNumber} cardNo={this.state.cardNo} addBank={"personBankAdd"} payType={0}/>;
                var code=this.setCode();
                var nextStep=this.getNextStep();
                var payStep=this.getPayStep();
                var addBank=<div >
                    <form className="form-horizontal" style={{padding:"30px 15px"}}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">姓&nbsp;&nbsp;名</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="realName" placeholder="请输入姓名" value={this.state.realName} onChange={this.handleRealName}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" style={{paddingRight:"0px"}}>身份证号</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="identityCardId" placeholder="请输入身份证号" value={this.state.identityCardId} onChange={this.handleIdentityCard}/>
                                <input type="hidden" id="payMoney"/>
                            </div>
                        </div>
                        {bankReact}
                        {code}
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                               {nextStep} {payStep}
                            </div>
                        </div>
                    </form>
                </div>
                return addBank;
            },
            getNextStep:function(){
                var code;
                if(this.state.realName==""||this.state.identityCardId==""||this.state.mobileNumber==""||this.state.cardNo=="") {
                    code= <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,3)} style={{width:"95px",height:"35px"}}  disabled="true">获取验证码</button>
                }else{
                    code= <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,3)} style={{width:"95px",height:"35px"}}>获取验证码</button>;
                }
                if(this.state.phase==2) {
                    return <div>
                            {code}
                            <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,1)} style={{width:"95px",height:"35px",marginLeft:"14px"}}>返回</button>
                            </div>
                }else{
                    return (<div></div>);
                }
            },
            getPayStep:function(){
                if(this.state.phase==3){
                    return <div>
                              <button className="btn  btn-info" type="button" onClick={this.setPhase.bind(null,2)} style={{width:"95px",height:"35px"}}>上一步</button>
                              <button className="btn  btn-info" type="button" onClick={this.checkBank} style={{width:"95px",height:"35px",marginLeft:"14px"}}>添加</button>
                           </div>
                }
                else{
                    return (<div></div>);
                }
            },
            checkBank:function(){
                if(this.state.authenCode==""){
                    $.alert({
                        title: '',
                        content:"请输入验证码"
                    });
                }else{
                    var data= {
                        bankName:$("input[name='bank_select']:checked").val(),
                        mobileNumber:this.state.mobileNumber,
                        cardNo:this.state.cardNo,
                    };
                    $.ajax({
                        url:globamParam.login_url+"/account/bank_card/check",
                        method:"post",
                        data:data,
                        success:function(info,state){
                            if(info.result=="success"){
                                this.addBank();
                            }else{
                                $.alert({
                                    title: '',
                                    content:"此银行卡有误,无法添加"
                                });
                            }
                        }.bind(this),
                        error:function(info){
                            $.alert({
                                title: '',
                                content:"此银行卡有误,无法添加"
                            });
                        }
                    })
                }
            },
            addBank:function(){
                var data= {
                    payHistoryId: this.state.smsId,
                    verifyCode: $("#authenCode").val(),
                };
                $.ajax({
                    url: "/api/public/pay/mobile_fast/pay",
                    method:"post",
                    data:data,
                    success:function(info,state){
                        if(info.result=="success"){
                            this.setPhase(1);
                            this.getBanks();
                            $.alert({
                                title: '',
                                content:"添加成功"
                            });
                        }
                    }.bind(this),
                    error:function(info){
                        $.alert({
                            title:"",
                            content:info.responseJSON.message
                        })
                    }
                })
            },
            setPhase:function(value){
                if(value==3){
                    this.getCode();
                }
                this.setState({phase:value});
            },

            render:function(){
                var menuInfo=this.menuInfo();
                var personBanks,addBank;
                if(this.state.phase==1){
                    personBanks=this.getPersonBanks();
                }else{
                    addBank=this.getAddBank();
                }
                    return (
                        <div className="container" style={{minHeight:"653px"}}>
                            <div className="row">
                                <div className="visible-xs" style={{marginBottom:"20px"}}>
                                    {menuInfo}
                                </div>

                                <div className="col-sm-8" style={{padding:"0px 30px"}}>
                                    <div className="row personBanks" style={{minHeight:"400px"}}>
                                        {personBanks}
                                        {addBank}
                                    </div>
                                </div>

                                <div className="hidden-xs">
                                    {menuInfo}
                                </div>
                        </div>
                      </div>

                    );
            }
        });
    });