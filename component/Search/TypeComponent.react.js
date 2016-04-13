/**
 * Created by Administrator on 2015/7/7.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        PropTypes:{
            COLS:["all","daily","monthly","one_yuan"],
            CAPCOLS:["all","start_peizi","end_peizi","recharge","withdraw_profit","add_deposit","add_fund","add_profit","admin_expense","retreat_deposit","retreat_admin_expense","withdraw_cash","retreat_withdraw_cash","withdraw_deposit","retreat_add_deposit"],
            COLS_MAPPING :{
                "all":"全部",
                "daily": "天配",
                "monthly": "月配",
                "one_yuan":"免费体验"
            },
            CAPCOLS_MAPPING:{
                "all":"全部",
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
            }
        },
        TypeCheck:function(COLS,type){
            for(var i = 0;i< COLS.length;i++)
            {
                if(COLS[i]==type){
                    return true;
                }
            }
            return false;
        },
        getCOLS:function(){
            var COLS = this.PropTypes.COLS;
            var attributes = this.props.peiziModel.attributes;
            if(attributes.title!=null && attributes.title=='capital'){
                COLS = this.PropTypes.CAPCOLS;
            }
            return COLS;
        },
        getCOLS_MAPPING:function(){
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            var attributes = this.props.peiziModel.attributes;
            if(attributes.title!=null && attributes.title=='capital'){
                COLS_MAPPING = this.PropTypes.CAPCOLS_MAPPING;
            }
            return COLS_MAPPING;
        },
        getRecord:function(){
            var peiziModel=this.props.peiziModel;
            var auid,astatus;

            auid=(peiziModel.get('uid')==null||peiziModel.get('uid')=='')?0:peiziModel.get('uid');
            astatus=(peiziModel.get('status')==null||peiziModel.get('status')=='')?0:peiziModel.get('status');

            var record={
                "auid":auid,
                "astatus":astatus
            }
            return record;
        },
        render:function() {
            var type = this.props.peiziModel.attributes.type;
            if(type == null)
            {
                type = '';
            }
            var COLS = this.getCOLS();
            var COLS_MAPPING = this.getCOLS_MAPPING();
            if(!this.TypeCheck(COLS,type)){
                type = '';
            };
            var record=this.getRecord();
            var title=(this.props.peiziModel.get("title")=='peizi')?'peizi':'capital';

            return <div className="row search-head">
                {
                    COLS.map(function (col,index) {
                        var atype=(col=='all')?0:col;
                        var link=globamParam.url_header+'/#'+title+'/'+record.auid+'/'+atype+'/'+record.astatus;
                        if((type == col)||(type ==''&& col=='all')){
                            return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1"><div className="search-header-a-choose"><a href={link}>{COLS_MAPPING[col]}</a></div>
                            </div>;
                        }
                        return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1"><a className="search-header-a" href={link}>{COLS_MAPPING[col]}</a>
                        </div>;
                    }.bind(this))
                }
            </div>
        }
    });

});
