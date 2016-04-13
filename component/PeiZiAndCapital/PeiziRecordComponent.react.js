/**
 * Created by Administrator on 2015/7/3.
 */
'use strict';

define([
    'react',
    'jquery',
    'jsx!component/User/UserComponent.react',
    'jsx!component/SubAccount/StatusComponent.react',
    'jsx!component/Common/LocalStorageComponent.react'
], function (React,$,UserComponent,StatusComponent,LocalStorageComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                account:'',
                toClose:false,
                type:'ths',
                data:"",
                login:false,
                storage:new LocalStorageComponent
            };
        },
        PropTypes:{
            COLS: ["type","warn_line","open_line","initial_deposit","deposit","lever","loan","open_account_time","cycle_count","system","account","status"],
            COLS_MAPPING :{
                "type": "产品类型",
                "warn_line":"警戒线",
                "open_line":"平仓线",
                "initial_deposit":"初始保证金",
                "deposit":"保证金",
                "lever":"杠杆",
                "loan":"配资额",
                "open_account_time":"开户时间",
                "cycle_count":"使用期限",
                "system":"配资系统",
                "account":"账户",
                "status": "状态"
            },
            PEIZI_TYPE_MAP:{
                "daily": "天配",
                "monthly": "月配",
                "weekly":"周配",
                "one_yuan":"免费体验"
            },
            PEZI_STATUS_MAP:{
                "wait_review":"待审核",
                "wait_approve":"待批准",
                "in_progress":"操盘中",
                "ended":"已结算",
                "exploded":"已爆仓",
                "rejected":"已拒绝",
                "in_review_settlement":"结算审批中",
                "in_settlement":"结算中"
            },
            PEZI_SYSTEM_MAP:{
                "3":"同花顺",
                "8":"HOMS"
            },

        },
        componentDidMount: function() {
            this.props.model.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillMount:function(){
            this.setState({"account":""});
        },
        componentWillUnmount:function(){
            this.setState({"account":""});
        },
        getUser:function(){
            return (<UserComponent user={this.props.user} peiziModel={this.props.peiziModel}></UserComponent>)
        },
        handleChanged : function(){
            this.setState({"model":JSON.parse(this.state.storage.getItem("homs_"+this.props.model.get('account')))});
        },
        searchDetail : function(){
            var type = (this.getRecord().system == 'HOMS')?'homs':'ths';
            this.setState({"account":this.props.model.get("account"),"toClose":true,"type":type});
        },
        closeDetail:function(){
            this.setState({"account":"","toClose":false});
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

            var cyCount;
            if(model.get('type')=='daily') {cyCount=model.get('cycle_count')+'日';}
            if(model.get('type')=='monthly'){cyCount=model.get('cycle_count')+'月';}
            if(model.get('type')=='one_yuan'){cyCount=model.get('cycle_count')+'日';}

            var initDeposit=(model.get('loan')/model.get('lever')).toFixed(0);

            var openTime=this.formatData(model.get('open_account_time'));
            if(openTime=='NaN-NaN-NaN NaN:NaN:NaN'){openTime='';}

            var type=this.PropTypes.PEIZI_TYPE_MAP[model.get('type')];
            var status=this.PropTypes.PEZI_STATUS_MAP[model.get('status')];
            var record={
                "auid":auid,
                "atype":atype,
                "astatus":astatus,
                "type_e":type== undefined ?0:model.get('type'),
                "status_e":status== undefined ?0:model.get('status'),
                "type":type== undefined ?model.get('type'):type,
                "status":status== undefined ?model.get('status'):status,
                "initDeposit":initDeposit,
                "openTime":openTime,
                "cyCount":cyCount,
                "system":this.PropTypes.PEZI_SYSTEM_MAP[model.get('account').charAt(0)]
            }
            return record;
        },
        getPclass:function(){
            var pclass;
            if(this.props.peiziModel.get("uid")== '')
            {
                pclass='mcol-xs-4 mcol-sm-3 mcol-md-1';
            }else{
                pclass='mcol-xs-4 mcol-sm-3 mcol-md-2';
            }
            return pclass;

        },
        getDetail:function(){
            var system=this.PropTypes.PEZI_SYSTEM_MAP[this.props.model.get('account').charAt(0)]
            var detail = '';
            if(this.state.toClose==false){//HOMS详情，如果不存在，则手动录入。
                detail = <a  href="javascript:void(0)" onClick = {this.searchDetail}>[详情]</a>;
            }
            if(this.state.toClose==true){
                detail = <a  href="javascript:void(0)" onClick = {this.closeDetail}>[关闭]</a>;
            }
            return detail;
        },
        renderTitle :function(uid) {
            var  Uclass_Map={
                open_account_time:""
            };
            if(uid!=''){
                Uclass_Map={
                    open_account_time:"",
                    system:"",
                    account:""
                };
            }

            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;

            return <div>
                {

                    COLS.map(function (col) {

                        if(Uclass_Map[col]!=undefined)
                        {
                            return <div className="mcol-xs-4 mcol-sm-3 mcol-md-2">{COLS_MAPPING[col]}
                            </div>;
                        }
                        else {
                            return <div className="mcol-xs-4 mcol-sm-3 mcol-md-1">{COLS_MAPPING[col]}</div>;
                        }

                    })
                }
            </div>
        },

        render: function() {
            var user = '';
            var status = '';
            var record=this.getRecord();
            var detail=this.getDetail();
            var pclass=this.getPclass();

            if(this.props.peiziModel.get("uid")== '')
            {
                user = this.getUser();
            }
            return (
                <div>
                    <div className="row">
                        <div>{user}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1 peizi-left'><a href={globamParam.url_header+'/#peizi/'+record.auid+'/'+record.type_e+'/'+record.astatus}>{record.type}</a></div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1'>{this.props.model.get('warn_line')}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1'>{this.props.model.get('open_line')}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1'>{record.initDeposit}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1'>{this.props.model.get('deposit')}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1 peizi-left' >{this.props.model.get('lever')}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1'>{this.props.model.get('loan')}</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-2'>{record.openTime}&nbsp;</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1 peizi-left' >{record.cyCount}</div>
                        <div className={pclass}>{record.system}<a/>{detail}&nbsp;</div>
                        <div className={pclass}>{this.props.model.get('account')}&nbsp;</div>
                        <div className='mcol-xs-4 mcol-sm-3 mcol-md-1 peizi-status'><a href={globamParam.url_header+'/#peizi/'+record.auid+'/'+record.atype+'/'+record.status_e}>{record.status}</a></div>
                    </div>
                    <div>
                        <StatusComponent account = {this.state.account} toClose={this.state.toClose} model = {this.props.model} type = {this.state.type} onChanged = {this.handleChanged}></StatusComponent>
                    </div>
                </div>
            );
        },
    });
});

