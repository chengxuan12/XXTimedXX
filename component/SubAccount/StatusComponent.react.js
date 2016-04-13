/**
 * Created by Administrator on 2015/7/13.
 */
'use strict';
define([
    'react',
    'jquery',
    'Confirm',
    'jsx!component/SubAccount/StocksComponent.react',
    'jsx!component/SubAccount/LoginComponent.react',
    'jsx!component/Common/LocalStorageComponent.react'
], function (React,$,Confirm,StocksComponent,LoginComponent,LocalStorageComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                account:'',
                data:'',
                login:false,
                toClose:false,
                unit_asset_total:'',
                market_price:'',
                storage:new LocalStorageComponent
            };
        },
        PropTypes:{
            COLS: ["unit_id","unit_name","unit_asset_total","enable_cash","market_value","cordon_left","close_position_left"],
            COLS_MAPPING :{
                "unit_id": "ID",
                "unit_name":"名称",
                "unit_asset_total": "总资产",
                "enable_cash":"可用资产",
                "market_value":"证券市值",
                "cordon_left":"距预警",
                "close_position_left":"距平仓"
            }
        },
        handlechange:function(value){
            this.setState({"login":value?false:true});
            this.componentWillReceiveProps();
        },

        searchDetail:function(){
            this.setState({"account":this.props.account,"toClose":true});
        },
        closeDetail:function(){
            this.setState({"account":"","toClose":false});
        },
        componentWillReceiveProps :function(){
            if(this.props.type == 'ths')
            {
                this.setState({
                    "data": ""
                }, function () {
                    if(this.props.account!='')
                    {
                        $.ajax({
                            url: globamParam.url_header+"/api/ths/fund/"+this.props.account,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            type:"GET",
                            dataType:"json",
                            success:function(data){
                                if(data.list[0]!=undefined) {
                                    this.setState({"data": data.list[0]});
                                }else{
                                    //先登录
                                    this.setState({"login":true});
                                }
                            }.bind(this),
                            error: function (data) {
                                // console.log(data);
                            }.bind(this)
                        });
                    }
                });
            }
            if(this.props.toClose==false){
                this.closeDetail();
            }
        },
        saveHoms:function(){
            var array = {};
            var reg = new RegExp(/^([1-9]\d*|(0|[1-9]\d*)\.\d*[1-9])$/);
            if(this.state.unit_asset_total==''||this.state.market_price=='')
            {
                $.alert({
                    title: '',
                    content:"请输入总资产以及证券市值！"
                });
                return;
            }else if(reg.test(this.state.unit_asset_total) == false || reg.test(this.state.market_price) == false){
                $.alert({
                    title: '',
                    content:"输入的总资产或者证券市值不符合规则！"
                });
                return;
            }
            array.unit_id = this.props.account;
            array.unit_name = '',array.enable_cash = '';
            array.unit_asset_total = this.state.unit_asset_total;
            array.market_value = this.state.market_price;
            this.state.storage.setItem("homs_"+this.props.account,JSON.stringify(array));
            this.props.onChanged();
        },
        handleChange1 : function(event){
            this.setState({"unit_asset_total":event.target.value});
        },
        handleChange2 :function(event){
            this.setState({"market_price":event.target.value});
        },
        render: function() {
            if(this.props.type == 'homs' && this.props.account!='' && this.state.storage.getItem("homs_"+this.props.account)== undefined)
            {
                //1.从localstorage 中读取
                //2.显示
                return(<div className='login-home homes-style'>
                    总资产：<input type = 'text' placeholder='请输入总资产' value={this.state.unit_asset_total} onChange={this.handleChange1}/>
                    &nbsp;证券市值：<input type = 'text' placeholder='请输入证券市值'  value={this.state.market_price} onChange={this.handleChange2}/>
                    <a className='btn'  href="javascript:void(0)" onClick = {this.saveHoms}>&nbsp;确认</a>
                </div>);
            }
            else if(this.props.type == 'homs' && this.props.account!=''){
                var homs_value =  JSON.parse(this.state.storage.getItem("homs_"+this.props.account));
                var cordon_left = (parseFloat(homs_value.unit_asset_total) - this.props.model.get('warn_line')) .toFixed(2);
                cordon_left = (cordon_left > 0) ? cordon_left:<span className = "warning red">{cordon_left}</span>;
                var close_position_left = (parseFloat(homs_value.unit_asset_total) - this.props.model.get('open_line')).toFixed(2);
                close_position_left= (close_position_left> 0) ? close_position_left:<span className = "warning red">{close_position_left}</span>;

                return(<div className = 'row system-detail'>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_id']} : {homs_value.unit_id}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_name']} : {homs_value.unit_name}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_asset_total']} : {homs_value.unit_asset_total}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['enable_cash']} : {homs_value.enable_cash}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['cordon_left']} : {cordon_left}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['close_position_left']} :{close_position_left}</div>
                    <div className='mcol-xs-4 mcol-sm-3 mcol-md-3'>{this.PropTypes.COLS_MAPPING['market_value']} : {homs_value.market_value}</div>
                </div>);
            }
            else if(this.props.account!='')
            {
                var detail = '';
                if(this.state.data!='')
                {
                    //保留小数位后2位，
                    var unit_asset_total= parseFloat(this.state.data.unit_asset_total).toFixed(2);
                    var unit_id=(this.props.account==this.state.data.unit_id)?this.state.data.unit_id:<span className = "warning red">{this.state.data.unit_id}</span>;
                    var cordon_left = (unit_asset_total - this.props.model.get('warn_line')) .toFixed(2);
                    cordon_left = (cordon_left > 0) ? cordon_left:<span className = "warning red">{cordon_left}</span>;
                    var close_position_left = (unit_asset_total - this.props.model.get('open_line')).toFixed(2);
                    close_position_left= (close_position_left> 0) ? close_position_left:<span className = "warning red">{close_position_left}</span>;
                    var market_value =  parseFloat(this.state.data.market_value).toFixed(2);
                   var detailclose=(this.state.toClose==false)?<a  href="javascript:void(0)" onClick = {this.searchDetail}>[详情]</a>:<a href="javascript:void(0)" onClick = {this.closeDetail}>[关闭]</a>;

                    detail = <div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_id']} : {unit_id}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_name']} : {this.state.data.unit_name}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['unit_asset_total']} : {unit_asset_total}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['enable_cash']} : {this.state.data.enable_cash}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['cordon_left']} : {cordon_left}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{this.PropTypes.COLS_MAPPING['close_position_left']} :{close_position_left}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-3'>{this.PropTypes.COLS_MAPPING['market_value']} : {market_value}
                            {detailclose}
                        </div>
                    </div>;
                }
                var detailStyle=(this.state.login==true)?"":"row system-detail";
                return (
                    <div>
                        <div className={detailStyle} >
                            {detail}
                        </div>
                        <div>
                            <StocksComponent account = {this.state.account}></StocksComponent>
                        </div>
                        <div >
                            <LoginComponent login = {this.state.login} onChanged={this.handlechange}></LoginComponent>
                        </div>
                    </div>
                );
            }
            else if(this.state.data.name!=undefined){

                return(<div>{this.state.data.name}</div>);
            }
            else
            {
                return (
                    <div>
                    </div>
                );
            }

        }
    });
});

