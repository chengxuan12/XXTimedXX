/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define([
    'react',
    'jquery',
    'Page',
    'jsx!component/InvestProduct/InvestRecord.react',
    'jsx!component/OtherPage/CommonProblem.react'
], function (React,$,Page,InvestRecord,CommonProblem) {
    return React.createClass({
        PropTypes : {
            COLS: ["productName", "expectedAnnual", "timeLimit", "minBuy", "InvestProgress", "status"],
            COLS_MAPPING: {
                productName: "产品名称",
                expectedAnnual: "预期年化",
                timeLimit: "期限",
                minBuy: "起投金额",
                InvestProgress: "投资进度",
                status: "状态"
            },
            Type:["周周赚","月月赢"]
        },
        getInitialState:function(){
            return{
                investRecord :new InvestRecord,
                page:1,
            }
        },
        componentWillUpdate:function(nextProps, nextState){
                $('.circle').each(function(index, el) {
                    var num =Math.round( $(this).find('span:first').text() * 3.6);
                    if (num<=180) {
                        $(this).find('.right').css('transform', "rotate(" + num + "deg)");
                    } else {
                        $(this).find('.right').css('transform', "rotate(180deg)");
                        $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
                    };
                });
        },

        componentWillReceiveProps:function(){
            var sort=(this.props.sort==null)?"":"/"+this.props.sort;
            if(this.props.type && this.props.data.length > 0&&this.props.totalPage>1) {
                $(".tcdPageCode").createPage({
                    pageCount: parseInt(this.props.totalPage),
                    current: parseInt(this.props.currentPage),
                    backFn: function (page) {
                        window.location.href="/#/invest/"+this.props.type+"/"+page+sort;
                    }.bind(this)
                });
            }
        },
        getiConf:function(){
            var iconf=[];
            var iconf1,iconf2,iconf3;
            if(this.props.sort==1){
                iconf1=<i className="icon iconfont" id="sAnnual">&#xe64f;</i>;
            }else if(this.props.sort==2){
                iconf1=<i className="icon iconfont" id="sAnnual">&#xe652;</i>;
            }else{
                iconf1=<i className="icon iconfont" id="sAnnual">&#xe66c;</i>;
            }
            if(this.props.sort==3){
                iconf2=<i className="icon iconfont" id="sTime">&#xe64f;</i>;
            }else if(this.props.sort==4){
                iconf2=<i className="icon iconfont" id="sTime">&#xe652;</i>;
            }else{
                iconf2=<i className="icon iconfont" id="sTime">&#xe66c;</i>;
            }
            if(this.props.sort==5){
                iconf3=<i className="icon iconfont" id="sBuy">&#xe64f;</i>;
            }else if(this.props.sort==6){
                iconf3=<i className="icon iconfont" id="sBuy">&#xe652;</i>;
            }else{
                iconf3=<i className="icon iconfont" id="sBuy">&#xe66c;</i>;
            }
            iconf[0]=iconf1;
            iconf[1]=iconf2;
            iconf[2]=iconf3;
            return iconf;
        },
        renderTitle:function(type){
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            var s=this;
            var iconf=this.getiConf();
            var iconf1=iconf[0];
            var iconf2=iconf[1];
            var iconf3=iconf[2];
            return <div>{
                COLS.map(function(col){
                    if(col=='productName')
                    {
                        return <div className="title-item  col-sm-4">{COLS_MAPPING[col]}
                        </div>;
                    }
                    else if(col=='InvestProgress'){
                        return <div className="title-item  col-sm-1 pad-0">{COLS_MAPPING[col]}
                        </div>;
                    }
                    else if(col=='expectedAnnual'){
                        if(type == 'monthyly' || type == 'weekly'){
                            return <div className="title-item  col-sm-2" onClick={s.doSort.bind(null,"sAnnual")} style={{cursor:"pointer"}}>{COLS_MAPPING[col]}
                                       {iconf1}
                                   </div>;
                        }else{
                            return <div className="title-item  col-sm-2">{COLS_MAPPING[col]}
                            </div>;
                        }
                    }
                    else if(col=='timeLimit'){

                        if(type == 'monthyly' || type == 'weekly'){
                            return <div className="title-item col-sm-1 pad-0" onClick={s.doSort.bind(null,"sTime")} style={{cursor:"pointer"}}>{COLS_MAPPING[col]}
                                     {iconf2}
                            </div>;
                        }else{
                            return <div className="title-item col-sm-1 pad-0">{COLS_MAPPING[col]}
                            </div>;
                        }

                    }
                    else if(col=='minBuy'){
                        if(type == 'monthyly' || type == 'weekly'){
                            return <div className="title-item col-sm-2" onClick={s.doSort.bind(null,"sBuy")} style={{cursor:"pointer"}}>{COLS_MAPPING[col]}
                                     {iconf3}
                            </div>;
                        }else{
                            return <div className="title-item col-sm-2">{COLS_MAPPING[col]}
                            </div>;
                        }
                    }else{
                        return <div className="title-item  col-sm-2">{COLS_MAPPING[col]}

                        </div>;
                    }
                })
            }</div>
        },
        doSort:function(a){
            var sort="";
            if(a=="sAnnual"){
                sort=(this.props.sort==1)?"/2":"/1" ;
            }
            if(a=="sTime"){
                sort=(this.props.sort==3)?"/4":"/3" ;
            }
            if(a=="sBuy"){
                sort=(this.props.sort==5)?"/6":"/5" ;
            }
            routerReact.navigate("/invest/"+this.props.type+"/"+this.state.page+sort,{trigger:true});
        },

        render:function(){
            var title = this.renderTitle(this.props.type);
            var records = this.props.data;
            var types = this.props.typeName;
            var active=this.props.type;
            var pages = "";
            return (<div>
                <div className="container" style={{marginBottom:"30px"}}>
                    <div className="ui-header">全部产品</div>
                    <div className="ui-panel">
                        <div className="row invest-type">{
                            types.map(function(type){
                                var style="col-xs-4 col-md-2 invest-type-item";
                                if(type == "全部产品"){
                                    style=(active==null)? style+" active":style;
                                    return (
                                        <div className={style}>
                                            <a href="/#/invest">{type}</a>
                                        </div>
                                    )}
                               if(type=='周周赚'){
                                        style=(active=='weekly')? style+" active":style;
                                        return(
                                            <div className={style}>
                                                <a href="/#/invest/weekly/1">{type}</a>
                                            </div>)
                               }
                                if(type=='月月赢'){
                                       style=(active=='monthyly')? style+" active":style;
                                        return(
                                            <div className={style}>
                                                <a href="/#/invest/monthyly/1">{type}</a>
                                            </div>)
                                }
                            })
                        }</div>
                        <div className="row invest-title hidden-xs">{title}</div>
                      </div>

                      <div className="invest-main ">
                            {
                                records.map(function(record){
                                    if(record.type){
                                        var more = <div className="content-title hidden-xs"><a className="type-more" href="/#/invest/weekly/1">查看更多{record.type}</a></div>;
                                        if(record.type=='月月赢')
                                            more = <div className="content-title hidden-xs"><a className="type-more" href="/#/invest/monthyly/1">查看更多{record.type}</a></div>;
                                    }else{
                                        pages=<div className="tcdPageCode"></div>;
                                    }
                                    if(record.products.length>0){
                                        return (
                                            <div className="invest-content ">
                                                {more}
                                                <div className="content-item">
                                                    {
                                                        record.products.map(function(r){
                                                            return (<InvestRecord record = {r} />)
                                                        })
                                                    }
                                                </div>
                                                {pages}
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className="invest-content">
                                             {more}<div className="content-item clearfix"><div className="text-center" style={{padding:"10px 0px",fontSize:"16px"}}>未找到数据</div>{pages}</div></div>);
                                    }

                                })
                            }

                      </div>
                </div>
                    <CommonProblem type="2"/>
            </div>

            )
        }
    })
});