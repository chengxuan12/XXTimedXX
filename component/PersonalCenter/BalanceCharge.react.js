/**
 * Created by Administrator on 2015/9/8.
 */
'use strict';
define([
        'react',
        'jquery',
        'Confirm',
        'jqueryForm',
        'Ajax',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
        'jsx!component/PersonalCenter/TitleType.react',
        'jsx!component/InvestProduct/Banks.react',
        'jsx!component/InvestProduct/PayMask.react'
    ],
    function(React,$,Confirm,jqueryForm,Ajax,InfoAndMenu,TitleType,Banks,PayMask){
        return React.createClass({
            getInitialState:function(){
                return{
                    user:this.props.user,
                    data:[],
                    default_bank:"",
                    totalFee:""
                };
            },
            componentDidMount:function() {
                $.Ajax.request("/api/public/pay/ebank/banks", {
                    method:"get",
                    success:function(xhr){
                        if(xhr.status == 200) {
                            if(xhr.responseText.indexOf("<html>")==-1){
                                var data = JSON.parse(xhr.responseText);
                                this.setState({data:data.items});
                            }
                        }
                    }.bind(this),
                    failure:function(data){
                    }.bind(this)
                });
            },
            changeFee:function(event){
                var value=event.target.value;
                var regStrs = [
                    [/[^\d.]/g, ''],//清除“数字”和“.”以外的字符
                    [/^\./g, ''],//验证第一个字符是数字而不是.
                    [/\.{2,}/g, ''],//只保留第一个. 清除多余的.
                    ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                    ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                ];
                for(var i=0; i<regStrs.length;i++){
                    var reg = new RegExp(regStrs[i][0]);
                    value=value.replace(reg, regStrs[i][1]);
                }
                this.setState({totalFee:value});
            },
            setDefaultBank:function(value){
                 this.setState({default_bank:value});
            },
            hide:function(){
                $('#charge_light').css("display",'none');
                $('#charge_fade').css("display",'none');
            },
            checkInfo:function(){
                if(!isNaN(this.state.totalFee)&&this.state.totalFee>0){
                    this.submit();
                }else{
                    $.alert({
                        title: '',
                        content:'请输入正确数字的金额'
                    });
                }
            },
            submit:function(){
                var form = $("form[name=chargeForm]");
                var options={
                    url: "/api/public/pay/ebank/request",
                    method:"post",
                    async:false,
                    data:form.serialize(),
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
                            content:data.responseJSON.message
                        });
                    }.bind(this)
                }
                form.ajaxSubmit(options);
            },
            getShowData:function(){
                var data = this.state.data;
                var s = this;
                var showData= <div className="row">
                               <div className="clearfix" style={{padding:"30px 15px"}}>
                                <form name="chargeForm" id="chargeForm" className="form-inline"  method="post" encType="application/x-www-form-urlencoded" target="_blank">
                                    <div  className="clearfix">
                                        <Banks payType="1" setDefaultBank = {this.setDefaultBank}/>
                                    </div>
                                    <div className="clearfix" style={{paddingTop:"20px"}}>
                                        <label htmlFor="totalFee" className="col-xs-12 col-sm-2 col-md-2 control-label chargeFont" style={{paddingRight:"0px"}}>充值金额</label>
                                        <div className="col-xs-12 col-sm-9">
                                            <input type="text" name="defaultBank" value={this.state.default_bank} className="hidden"/>
                                            <input type="text" name="totalFee" value={this.state.totalFee} className="chargeInput" onChange={this.changeFee} id="totalFee"/>&nbsp;元
                                        </div>
                                    </div>
                                    <div className="clearfix" style={{paddingTop:"30px"}}>
                                        <div className="col-xs-12 col-sm-9 col-md-10 col-xs-offset-0 col-sm-offset-3 col-md-offset-2">
                                            <div className="chargeBtn">
                                             <a type="button" href="javascript:void(0)" onClick={this.checkInfo}><div>提交</div></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                           </div>
                        </div>
                return showData;
            },

            render:function(){
                var showData=this.getShowData();
                var detail=<div className="col-sm-8">
                    <div style={{border:"1px solid #CECECE",minHeight:"600px",boxShadow:"0 1px 5px rgba(0,0,0,.15)"}}>
                        <div className="row">
                            <TitleType title={"charge"}/>
                        </div>
                        {showData}
                    </div>
                </div> ;

                return (
                    <div className="container" style={{minHeight:"653px"}}>
                        <div className="row">
                            <div className="visible-xs" style={{marginBottom:"20px"}}>
                                <InfoAndMenu title={this.props.title} user={this.props.user}/>
                            </div>
                            {detail}
                            <div className="hidden-xs">
                                <InfoAndMenu title={this.props.title} user={this.props.user}/>
                            </div>
                            <div className="col-sm-12">
                                <div className="tcdPageCode page-float"></div>
                            </div>
                        </div>
                        <PayMask title="charge"/>
                    </div>
                );
            }
        });
    });