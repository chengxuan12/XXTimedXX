/**
 * Created by Administrator on 2015/7/6.
 */

'use strict';

define([
    'react',
    'jquery',
    'jsx!component/User/UserComponent.react'
], function (React,$,UserComponent) {
    return React.createClass({
        PropTypes:{
            COLS: ["type","amount","status","account","source","date_time"],
            COLS_MAPPING :{
                "type": "动作类型",
                "amount":"金额",
                "status": "状态",
                "account":"账户",
                "source":"来源",
                "date_time":"发生时间"
            },
            CAPITAL_TYPE_MAP :{
                "start_peizi": "开始配资",
                "end_peizi": "结束配资",
                "recharge": "充值",
                "withdraw_profit":"提取利润",
                "add_deposit":"追加保证金",
                "add_fund":"加仓",
                "add_profit":"加利润",
                "admin_expense":"管理费",
                "retreat_deposit":"退保证金",
                "retreat_admin_expense":"退管理费",
                "withdraw_cash":"提现",
                "retreat_withdraw_cash":"提现撤销",
                "withdraw_deposit":"取保证金",
                "retreat_add_deposit":"追保退回",
            },
          CAPITAL_STATUS_MAP :{
            "completed": "完成",
            "cancelled": "取消",
            "wait_review": "待审核",
            "wait_approve": "待批准",
            "rejected": "已拒绝",
            "wait_bank": "银行处理中",
            "failed": "失败"
         },

        },
        componentDidMount: function() {
            this.props.model.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillUnmount: function() {
            this.props.model.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        getUser:function(){
            return (<UserComponent user={this.props.user} peiziModel={this.props.peiziModel}></UserComponent>)
        },
        formatData: function (now) {
            now = new Date(now);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();
            var sec = now.getSeconds();
            if(hour<10) {
                hour = "0"+hour;
            }
            if(min<10){
                min = "0"+min;
            }
            if(sec<10){
                sec = "0"+sec;
            }
            return year + "-" + month + "-" + date +" "+hour+":"+min+":"+sec;

        },
        getRecord:function(){
            var model=this.props.model;
            var peiziModel=this.props.peiziModel;
            var auid,atype,astatus;

            auid=(peiziModel.get('uid')==null||peiziModel.get('uid')=='')?0:peiziModel.get('uid');
            atype=(peiziModel.get('type')==null||peiziModel.get('type')=='')?0:peiziModel.get('type');
            astatus=(peiziModel.get('status')==null||peiziModel.get('status')=='')?0:peiziModel.get('status');

            var type=this.PropTypes.CAPITAL_TYPE_MAP[model.get('type')];
            var status=this.PropTypes.CAPITAL_STATUS_MAP[model.get('status')];

            var record={
                "auid":auid,
                "atype":atype,
                "astatus":astatus,
                "type_e":type== undefined ?0:model.get('type'),
                "status_e":status== undefined ?0:model.get('status'),
                "type":type== undefined ?model.get('type'):type,
                "status":status== undefined ?model.get('status'):status,
                "date_time":this.formatData(model.get('date_time')),
            }
            return record;
        },
        getCclass:function(){
            var cclass;
            if(this.props.peiziModel.get("uid")== '')
            {
                cclass='col-xs-4 col-sm-3 col-md-1';
            }else{
                cclass='col-xs-4 col-sm-3 col-md-2';
            }
            return cclass;
        },

        renderTitle :function(uid) {
            var  Cclass_Map={
                "source":"",
                "date_time":""
            };
            if(uid!='') {
                Cclass_Map = {
                    "type": "",
                    "amount": "",
                    "status": "",
                    "account": "",
                    "source": "",
                    "date_time": ""
                };
            }
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return <div>
                {
                    COLS.map(function (col) {
                        if(Cclass_Map[col]!=undefined)
                        {
                            return <div className="col-xs-4 col-sm-3 col-md-2">{COLS_MAPPING[col]}
                            </div>;
                        }
                        else {
                            return <div className="col-xs-4 col-sm-3 col-md-1">{COLS_MAPPING[col]}
                            </div>;
                        }
                    })
                }
            </div>
        },

        render: function() {
            var user = '';
            if(this.props.peiziModel.get("uid")== '')
            {
                user = this.getUser();
            }
            var record=this.getRecord();
            var cclass=this.getCclass();
            return (
                <div className="row">
                    <div> {user}</div>
                    <div className={cclass+' mouserPointer'}><a href={globamParam.url_header+'/#capital/'+record.auid+'/'+record.type_e+'/'+record.astatus}>{record.type}</a></div>
                    <div className={cclass}>{this.props.model.get('amount')}</div>
                    <div className={cclass+' mouserPointer'}><a href={globamParam.url_header+'/#capital/'+record.auid+'/'+record.atype+'/'+record.status_e}>{record.status}</a></div>
                    <div className={cclass}>{this.props.model.get('account')}&nbsp;</div>
                    <div className='col-xs-4 col-sm-3 col-md-2'>{this.props.model.get('source')}&nbsp;</div>
                    <div className='col-xs-4 col-sm-3 col-md-2'>{record.date_time}</div>
                </div>
            );
        }
    });
});

