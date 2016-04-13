/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        PropTypes :{
            BADGES_MAP:{
                "贴息":"60px solid #FFB811",
                "返现": "60px solid #49B808"
            },
            STATUS_MAP:{
                "已售罄":"#BEBEBE",
                "认购中":"#F8C134",
                "待开始":"#5bc0de"
            }
        },

        getLevel:function(){
            var star=this.props.record.star;
            var level=[];
            for(var i=0;i<star;i++){
                level.push("level_solid");
            }
            for(var i=star;i<5;i++){
                level.push("level_hollow");
            }
            return level;
        },

        render:function(){
            var record = this.props.record;
            var timeLimit = (record.endDate - record.startDate)/(1000*60*60*24);
            var InvestProgress = parseFloat((record.bought / record.amount)*100).toFixed(2) ;
            var url="/#/invest/product/"+record.id;
            var level=this.getLevel();
            var progressWidth={width:Math.round(InvestProgress)+'%'};
            var triangle={borderTop:this.PropTypes.BADGES_MAP[record.badges[0]]};
            var triangleContent=record.badges[0];
            if(record.status=="已售罄"){
                triangle={borderTop:"60px solid #9E9E9E"};
                triangleContent="售罄";
            }
            var istatus={background:this.PropTypes.STATUS_MAP[record.status]};
            var status=<a href={url} style={{color:"#fff"}}><div>{record.status}</div></a>;
            var tieXiValue = record.additionalRate > 0 ? Math.round((record.additionalRate * 100) * 1000) / 1000 : "";
            var tieXi = (tieXiValue!="")?<span className="tieXiValue">+{tieXiValue}<span style={{fontSize:"12px"}}>%</span></span>:"";
            var recordProfit =  Math.round((record.profitRate*100)*1000)/1000;
            return (
                <div style={{borderBottom:"1px solid #e5e5e5"}}>
                    <div className="row i-record hidden-xs">
                        <div className="pro-name col-xs-4 col-sm-4">
                            <div style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}><a href={url}>{record.title}</a></div>
                        </div>
                        <div className="annual col-xs-2 col-sm-2">{recordProfit}%{tieXi}</div>
                        <div className="time-limit col-xs-1 col-sm-1 pad-0">{timeLimit}天</div>
                        <div className="min-buy col-xs-2 col-sm-2">{record.minBuy}元</div>
                        <div className="i-progress col-xs-1 col-sm-1">
                            <div className="p-radius circle">
                                <div className="pie_left"><div
                                    className="left"></div></div>
                                <div className="pie_right"><div
                                    className="right"></div></div>
                                <div className="mask"><span>{InvestProgress}</span>%</div>
                            </div>
                        </div>
                        <div className="i-status col-xs-2 col-sm-2">
                            <div className="s-border" style={istatus}>
                                <div className="margin-up2">{status}</div>
                            </div>
                        </div>
                    </div>

                    <a href={url}>
                    <div className="row i-record-mobile visible-xs" id="mobileRecord">
                            <div className="triangle-topright" style={triangle}/>
                            <div className="i-status" >{triangleContent}</div>
                            <div className="pro-name col-xs-6 pad-r hidden-mi">
                                 <div style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{record.title}</div>
                            </div>
                           <div className="pro-name col-xs-9 pad-r visible-mi">
                                <div style={{width:"100%",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{record.title}</div>
                           </div>
                            <div className="col-xs-3 pad-r hidden-mi">
                                <div className="time-limit">
                                    <div className="margin-up2"> 期限{timeLimit}天</div>
                                </div>
                            </div>
                            <div className="min-buy-font col-xs-4 pad-r">起购金额</div>
                            <div className="col-xs-3 pad-r">
                                    <div className="time-limit visible-mi">
                                        <div className="margin-up2"> 期限{timeLimit}天</div>
                                    </div>
                                </div>
                           <div className="annual-font col-xs-5">年化收益率</div>

                                <div className="min-buy  col-xs-3 pad-r">
                                       {record.minBuy}元
                                </div>

                                <div className="col-xs-6 pad-r rating">
                                    <i className={level[0]}>★</i>
                                    <i className={level[1]}>★</i>
                                    <i className={level[2]}>★</i>
                                    <i className={level[3]}>★</i>
                                    <i className={level[4]}>★</i>
                                </div>

                             <div className="annual  col-xs-3">{recordProfit}%{tieXi}</div>

                             <div className=" col-xs-9 pad-r">
                                 <div className="progress pro-height">
                                   <div className="progress-bar progress-bar-info" style={progressWidth} role="progressbar"
                                      aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                 </div>
                            </div>
                            <div className=" col-xs-3 pad-r">
                                <div className="i-progress">
                                    <div className="margin-up2">
                                    {InvestProgress}%
                                    </div>
                                </div>
                             </div>
                  </div>
                    </a>
                </div>);
        },

    })
});