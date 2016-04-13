/*Created by Administrator on 2015/7/31.*/

'use strict';

define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        getInitialState:function(){
            return {
                bankList:this.props.bankList,
            }
        },
        componentDidMount:function(){
            this.setState({bankList:this.props.bankList});
            if(this.props.bankList.length>0){
                this.props.setAdd("");
            }else{
                this.props.setAdd("noChoose");
            }
        },
        changeAccount:function(event){
            var value = event.target.value;
            if(value=="add"){
                this.props.setAdd(true);
            }else if(value==""){
                this.props.setAdd("noChoose");
            }else{
                this.props.setAdd(false);
            }
        },
        render:function(){
            var bankList = this.state.bankList;
            if(bankList.length > 0){
                return (<div><select className="form-control" id="select_account" onChange={this.changeAccount}>
                    <option value="">请选择账户</option>
                    {
                        bankList.map(function(payType,index){
                            if(index==0){
                                return (
                                    <option name="payType_bank" value={payType.id} selected>
                                        {payType.bankName}  {payType.cardNo}
                                    </option>)
                            }else{
                                return (
                                    <option name="payType_bank" value={payType.id}>
                                        {payType.bankName}  {payType.cardNo}
                                    </option>)
                            }
                          })
                    }
                    <option value="add">添加银行卡</option>
                </select>
                </div>)
            }else{
                return(<div></div>);
            }
        },
    })
});