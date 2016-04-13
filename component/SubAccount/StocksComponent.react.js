/**Created by Administrator on 2015/7/13.*/
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        getInitialState:function(){
            return{
                data:[]
            };
        },
        PropTypes:{
            COLS: ["stock_code","stock_name","cb_price","market_price","market_value", "buy_amount","current_amount","enable_amount","ykb","time_stamp"],
            COLS_MAPPING :{
                "stock_code": "代码",
                "stock_name":"名称",
                "cb_price": "成本",
                "market_price":"市价",
                "market_value":"市值",
                "buy_amount":"买入数量",
                "current_amount":"当前数量",
                "enable_amount":"可用数量",
                "ykb":"赢亏",
                "time_stamp":"时间"
            }
        },
        componentWillReceiveProps :function(){
            var array = [{name:"正在查询请稍候..."}];
                this.setState({
                    "data": array,
                }, function () {
                        if(this.props.account!='')
                        {
                            $.ajax({
                                url: globamParam.url_header+"/api/ths/stock/"+this.props.account,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                type:"GET",
                                dataType:"json",
                                success:function(data){
                                    this.setState({"data": data.list});
                                }.bind(this),
                                error: function (data) {
                                    console.log(data);
                                }.bind(this)
                            });
                        }
                });
        },
        render: function() {
            var title = ''
            if(this.props.account!=undefined && this.props.account!=''){
                title = this.renderTitle();
                return (
                    <div className="system-detail">
                        <div className="row detail-stock detail-line">{title}</div>
                        <div className="detail-stock">
                            {this.state.data.map(function (l) {
                                var cb_price = parseFloat(l.cb_price).toFixed(2);
                                var market_price = parseFloat(l.market_price).toFixed(2);
                                var ykb = parseFloat(l.ykb).toFixed(2);
                                ykb=(ykb>0)?ykb:<span className="warning red">{ykb}</span>
                                return(
                                    <div className="row detail-stock detail-line">
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.stock_code}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.stock_name}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{cb_price}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{market_price}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.market_value}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.buy_amount}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.current_amount}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{l.enable_amount}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-1'>{ykb}</div>
                                        <div className = 'col-xs-4 col-sm-3 col-md-3'>{l.time_stamp}</div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                );
            }else return(<div></div>);

        },
        renderTitle:function(){
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return (<div>
                {
                    COLS.map(function (col) {
                            return <div className='col-xs-4 col-sm-3 col-md-1'>{COLS_MAPPING[col]}</div>;
                    })
                }
            </div>);
        }
    });
});

