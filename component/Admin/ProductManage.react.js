/**
 * Created by Administrator on 2015/9/21.
 */

'use strict';
define([
    'react',
    'backbone',
    'jquery',
    'jqueryForm',
    'Page',
    'collection/InvestProductCollection',
    'jsx!component/Common/FormatDataComponent.react',
], function (React, backbone, $, jqueryForm, Page, InvestProductCollection, FormatDataComponent) {
    return React.createClass({
        PropTypes:{
            types:["全部产品","周周赚","月月赢"],
            COLS: ["pName", "pType",  "profit", "startDate","endDate","status","operation"],
            COLS_MAPPING: {
                "pName": "产品名称",
                "pType": "产品类型",
                "profit": "预期收益",
                "startDate": "起始时间",
                "endDate": "终止时间",
                "status": "状态",
                "operation":"操作"
            },
        },
        getInitialState:function(){
            return{
                investProducts:new InvestProductCollection,
                totalPage:1,
                currentPage:1,
                perCount:8,
                data:[],
                type:this.props.type,
                fetch:false
            }
        },
        goToFetch:function(){
            if(this.props.page) {
                this.fetchData(this.props.page);
            }else{
                this.fetchData(1);
            }
        },
        componentDidMount:function(){
            this.setState({currentPage:this.props.page});
            this.goToFetch();
        },
        fetchData:function(page){
            var start = page?(page-1)*this.state.perCount:0,type=this.state.type;
            if(type == 'weekly' ||type == 'monthyly') {
                this.state.investProducts.url = "/api/public/products/"+type+"?start="+start+"&count="+this.state.perCount;
            }else{
                this.state.investProducts.url = "/api/public/products?start=" + start + "&count=" + this.state.perCount;
            }
            this.state.investProducts.fetch({
                success: function (model, data) {
                    this.setState({data:data.items,totalPage:Math.ceil(data.total/this.state.perCount),fetch:true});
                    this.forceUpdate();
                }.bind(this)
            });
        },
        componentDidUpdate:function(){

            if(this.state.type && this.state.data.length > 0&&this.state.totalPage>1) {
                $(".tcdPageCode").createPage({
                    pageCount: parseInt(this.state.totalPage),
                    current: parseInt(this.state.currentPage),
                    backFn: function (page) {
                        routerReact.navigate("/admin/product/"+this.state.type+"/"+page,{trigger:true});
                    }.bind(this)
                });
            }

        },
        componentWillReceiveProps:function(nextProps){
            this.setState({currentPage:nextProps.page});
            this.fetchData(nextProps.page);
       },
        fetch:function(){
            var type=$("#type").val(),href="/admin/product/"+type+"/1";
            routerReact.navigate(href,{trigger:true})
        },
        deleteProduct:function(index){
            var s=this;
            $.confirm({
                title: '',
                content: '确定删除此产品？',
                confirm: function(){
                    var data = s.state.data;
                    var id = data[index].id;
                    $.ajax({
                        url:"/api/admin/products/"+id,
                        method:"DELETE",
                        success:function(xml){
                            $.alert({
                                title: '',
                                content: '删除产品成功'
                            });
                            s.fetchData(1);
                            s.forceUpdate();
                        }.bind(this),
                        error:function(){
                            alert("error"+data);
                        }.bind(this)
                    })
                },
                cancel: function(){
                }
            });

        },
        getDataList:function(){
            var dataList;
            var data = this.state.data;
            var newFormatDataComponent = new FormatDataComponent();
            if(data.length > 0) {
                dataList = data.map(function (d,index) {
                        var tieXiValue = d.additionalRate > 0 ? Math.round((d.additionalRate * 100) * 1000) / 1000 : "";
                        var tieXi = (tieXiValue != "") ?
                            <span>+{tieXiValue}<span style={{fontSize:"12px"}}>%</span></span> : "";
                        var recordProfit = Math.round((d.profitRate * 100) * 1000) / 1000;
                        var startDate = d.startDate ? newFormatDataComponent.formatData(d.startDate, 3) : "";
                        var endDate = d.endDate ? newFormatDataComponent.formatData(d.endDate, 3) : "";
                    var editHref = "/#/admin/product/edit/" + d.id, lookHref = "/#/invest/product/" + d.id;
                        return (
                            <div className="row boxCo-row">
                                <div className="col-xs-12 col-sm-12 col-md-3" style={{marginBottom:"10px"}}>{d.title}</div>
                                <div className="col-xs-6 col-sm-3 col-md-1 ap-wlr-0" style={{marginBottom:"10px"}}>{d.typeName}</div>
                                <div className="col-xs-6 col-sm-3 col-md-1 ap-wlr-0" style={{marginBottom:"10px"}}>{recordProfit} {tieXi}</div>
                                <div className="col-xs-6 col-sm-3 col-md-2 " style={{marginBottom:"10px"}}>{startDate}</div>
                                <div className="col-xs-6 col-sm-3 col-md-2 " style={{marginBottom:"10px"}}>{endDate}</div>
                                <div className="col-xs-4 col-sm-3 col-md-1 ap-wlr-0" style={{marginBottom:"10px"}}>{d.status}</div>
                                <div className="col-xs-8 col-sm-5 col-md-2 ap-lr-0" style={{marginBottom:"5px"}}>
                                    <a className="btn operaBtn operaBtnEdit" href={lookHref} target="_blank" style={{margin:"0 5px 5px 0"}}>查看</a>
                                    <a className="btn operaBtn" href={editHref} style={{margin:"0 5px 5px 0"}}>编辑</a>
                                    <button className="btn operaBtn operaBtnRe"  onClick={this.deleteProduct.bind(null,index)} style={{margin:"0 5px 5px 0"}}>删除</button>
                                </div>
                            </div>
                        );
                    }.bind(this))
            }else{
                dataList=<div className="col-xs-12  aNoData">
                    未找到符合要求的记录
                </div>
            }
            return dataList;
        },
        render: function() {
            if(this.state.fetch==true){
                var title = this.renderTitle();
                var dataList=this.getDataList();
                var pages = <div className="tcdPageCode"></div>
                return (
                    <div>
                                <div className="col-xs-12">
                                    <div className="row boxCo-find">
                                        <select id="type" className="boxCo-select" value={this.state.type}
                                                onChange={this.fetch.bind(null,1)}>
                                            <option value="all">全部</option>
                                            <option value="weekly">周周赚</option>
                                            <option value="monthyly">月月赢</option>
                                        </select>&nbsp;&nbsp;
                                        <a className="btn operaBtn"  href="/#/admin/product/add/0" >新增产品</a>
                                      </div>
                                    {title}
                                    {dataList}
                                    {pages}
                                </div>
                    </div>)
            }else{
                return( <div className="row" style={{minHeight:"653px",textAlign:"center"}}>
                    <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                </div>);
            }
        },
        renderTitle:function(){
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return(<div className="row boxCo-title">{
                    COLS.map(function (col) {
                        if (col=="pName"){
                            return (<div className="col-xs-5 col-sm-6 col-md-3 hidden-xs hidden-sm" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }else if(col=="pType"||col=="profit"||col=="status"){
                            return (<div className="col-xs-6 col-sm-3 col-md-1 ap-wlr-0" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }else if(col=="operation"){
                            return (<div className="col-xs-6 col-sm-3 col-md-2 ap-r-0" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }else{
                            return (<div className="col-xs-6 col-sm-3 col-md-2" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }
                    }.bind(this))
                }</div>
            );
        }
    });
});