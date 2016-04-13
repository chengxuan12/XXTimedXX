/*Created by Administrator on 2015/8/3.*/
'use strict';
define([
    'react',
    'jquery',
    'Confirm',
    'Ajax'
], function (React,$,Confirm,Ajax) {
    return React.createClass({
        getInitialState:function(){
            return{
                bankChecked:"0",
                payMoney: "0",
                mobileNumber:this.props.mobileNumber,
                cardNo:this.props.cardNo,
                banks:[],
                payType:this.props.payType
            }
        },
        componentDidMount:function () {
             this.setState({payType:this.props.payType});
            if(this.props.payType==0) {
                this.getAllBanks();
            }else{
                this.getOnlineBanks();
            }
        },
        doMonitor:function(){
            var s = this;
            var fistBank=$(".bank_radio:first");
            fistBank.find(".cTriangle").css("display","block");
            fistBank.find(".cTriangle-font").css("display","block");
            $(".bank_radio").click(function(){
                $(".bank_radio").each(function(){
                    var rInput=$(this).find("input[type=radio]");
                    if(rInput.prop("disabled")==false){
                        $(this).find("input[type=radio]").removeAttr("checked");
                        $(this).find(".cTriangle").css("display","none");
                        $(this).find(".cTriangle-font").css("display", "none")
                    }
                });
                var thisInput=$(this).find("input[type=radio]");
                if(thisInput.prop("disabled")==false){
                    thisInput.prop("checked", 'checked');
                    $(this).find(".cTriangle").css("display","block");
                    $(this).find(".cTriangle-font").css("display","block");
                }
                $(".bank_radio").each(function(index){
                    var rInput=$(this).find("input[type=radio]");
                    if(rInput.prop("checked")!=false){
                        s.setState({bankChecked:index});
                    }
                });
                var value = $(this).find("input[type=radio]")[0].value;
                var all_options = document.getElementById("bank_select").options;
                for (var i=0; i<all_options.length; i++){
                    if (all_options[i].value == value) {
                        all_options[i].selected = true;
                        break;
                    }
                }
                if(s.props.payType==1) {
                    s.setDefaultBank(thisInput.val());
                }
            });
        },
        getAllBanks: function () {//0 快捷支付
            $.ajax({
                url: "/api/public/pay/mobile_fast/banks",
                method:"get",
                success:function(data,status){
                    if(data.result=="success"){
                       data.items.map(function(d){
                          d.bankCode = d.bankName;
                       });
                       this.setState({banks:data.items});
                        this.doMonitor();
                    }
                }.bind(this),
                error:function(data){
                    $.alert({
                        title: '',
                        content: "获取银行列表失败"
                    });
                }
            });
        },
        getOnlineBanks: function () {//1 网银支付
            $.Ajax.request("/api/public/pay/ebank/banks", {
                method:"get",
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.responseText.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.responseText);
                            this.setState({banks:data.items});
                            this.doMonitor();
                        }
                    }
                }.bind(this),
                failure:function(data){
                }.bind(this)
            });
        },
        getBanks:function(bankIndex,count){
            var banks =this.state.banks;
            var bankCss="bank_radio";
            if(this.props.col=="10"){
                bankCss="bank_radio bank_radio10";
            }
            return (<div className="row hidden-xs">{
                banks.map(function (bank,index) {
                    var bankInput;
                    if(index==bankIndex){
                        bankInput=<input type="radio" name="bank_select" id="bRadio" value={bank.bankCode} className="hidden" checked="checked"/>;
                    }else{
                        bankInput= <input type="radio" name="bank_select" id="bRadio" value={bank.bankCode} className="hidden"/>;
                    }
                    return (
                    <div className="col-xs-6  col-md-4 p-r-0">
                        <div className={bankCss} name="bank_radio">
                            {bankInput}
                            <img src={bank.bankIco} className="cBankImg"/>&nbsp;{bank.bankName}
                            <div className="cTriangle"/>
                            <div className="cTriangle-font"><i className="icon-ok"></i></div>
                        </div>
                    </div>);
                }.bind(this))
            }</div>)
        },
        getSelectBanks:function(){
            var banks = this.state.banks;
            return (<select className="form-control visible-xs" id="bank_select" onChange={this.setBanks}>{
                banks.map(function (bank) {
                    return (<option value={bank.bankCode}>{bank.bankName}</option>);
                }.bind(this))
            }</select>)
        },
        setBanks:function(event){
            var value = event.target.value;
            var all_selects = document.getElementById("bank_select").options;
            for (var i=0; i<all_selects.length; i++){
                if (all_selects[i].value == value) {
                    all_selects[i].selected = true;
                    this.setState({bankChecked:i});
                    break;
                }
            }
            $("input[type='radio'][value="+value+"]").prop("checked",'checked');
            $(".bank_radio").find(".cTriangle").css("display","none");
            $(".bank_radio").find(".cTriangle-font").css("display","none");
            $("#bRadio:checked").parent().find(".cTriangle").css("display","block");
            $("#bRadio:checked").parent().find(".cTriangle-font").css("display","block");
            if(this.props.payType==1) {
                this.setDefaultBank(value);
            }
        },
        setDefaultBank:function(value){
            if(this.props.setDefaultBank) {
                this.props.setDefaultBank(value);
            }
        },
        handleMobile:function(event){
            this.setState({mobileNumber:event.target.value});
            this.props.mobileChange(event.target.value);
        },
        handleCardNo:function(event){
            this.setState({cardNo:event.target.value});
            this.props.cardNoChange(event.target.value);
        },
        render:function(){
            var banks = this.getBanks(this.state.bankChecked);
            if (this.state.banks[this.state.bankChecked]) {
                if (this.props.col != "10") {
                    var minPay = this.state.banks[this.state.bankChecked].moneyMinPay;
                    $("#payMoney").val(minPay);
                }
            }
           if(this.props.addBank=="personBankAdd"){
               banks = this.getBanks(this.state.bankChecked,"sm6");
           }else{
               banks = this.getBanks(this.state.bankChecked);
           }
            var selectBanks = this.getSelectBanks();
            var showAdd = "";
            if(this.props.payType==0){
                showAdd = <div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" style={{paddingRight:"0px"}} htmlFor="cardNo">银行卡号</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder="请输入银行卡号" id="cardNo" value={this.state.cardNo} onChange={this.handleCardNo}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="mobileNumber">手机号</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="mobileNumber" placeholder="请输入手机号" value={this.state.mobileNumber} onChange={this.handleMobile}/>
                        </div>
                    </div>
                </div>
            }
            return (
                <div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" style={{textAlign:"right"}}>银&nbsp;&nbsp;行</label>
                            <div className="col-sm-10">
                                <div id="modal_banks"></div>
                                {banks}
                                {selectBanks}
                            </div>
                        </div>
                       {showAdd}
                </div>
            );
        }
    })
});
