/**
 * Created by Administrator on 2015/9/23.
 */
'use strict';
define([
    'react',
    'backbone',
    'jquery',
    'jqueryForm',
    'Page',
    'Confirm',
    'jsx!component/Common/FormatDataComponent.react',
], function (React, backbone, $, jqueryForm, Page, Confirm, FormatDataComponent) {
    return React.createClass({
        PropTypes: {
            states: [
                {
                    id: 1,
                    title: "进行中"
                }, {
                    id: 2,
                    title: "未开始"
                }, {
                    id: 0,
                    title: "活动结束"
                }
            ],
            COLS: ["activeName", "startDate",  "endDate", "status","operation"],
            COLS_MAPPING: {
                "activeName": "活动名称",
                "startDate": "开始时间",
                "endDate": "结束时间",
                "status":"状态",
                "operation":"操作"
            },
        },
        getInitialState: function () {
            return {
                totalPage: 1,
                currentPage: 1,
                perCount: 8,
                data: [],
                type: this.props.type,
                fetch:false
            }
        },
        componentDidMount: function () {
            this.goToFetch();
        },
        componentDidUpdate: function () {
            if (this.state.data.length > 0 && this.state.totalPage > 1) {
                $(".tcdPageCode").createPage({
                    pageCount: parseInt(this.state.totalPage),
                    current: parseInt(this.state.currentPage),
                    backFn: function (page) {
                        routerReact.navigate("/admin/event/" + this.state.type + "/" + page, {trigger: true});
                    }.bind(this)
                });
            }
        },
        componentWillReceiveProps:function(nextProps){
            this.setState({currentPage:nextProps.page});
            this.fetchData(nextProps.page);
        },
        goToFetch: function () {
            if (this.props.page) {
                this.fetchData(this.props.page);
            } else {
                this.fetchData(1);
            }
        },
        fetchData: function (page) {
            var start = page ? (page - 1) * this.state.perCount : 0, type = this.state.type;
            var url = "/api/events?start=" + start + "&count=" + this.state.perCount+"&sortField=beginDate:false";
            if (!type || (type != '' && type != 'all')) {
                url += "&status=" + type;
            }
            $.ajax({
                async: false,
                url: url,
                success: function (data) {
                    if (data.code == 200) {
                        this.setState({
                            currentPage: page,
                            data: data.items,
                            totalPage: Math.ceil(data.total / this.state.perCount),
                            fetch:true
                        });
                        this.forceUpdate();
                    }
                }.bind(this),
                error: function (data) {

                }
            });
        },
        fetch: function () {
            var type = $("#type").val(), href = "/admin/event/" + type + "/1";
            routerReact.navigate(href, {trigger: true})
        },
        deleteHelp: function (index) {
            var data = this.state.data;
            var id = data[index].id;
            var s=this;
            $.confirm({
                title: '',
                content: '确定删除此活动？',
                confirm: function(){
                    $.ajax({
                        url: "/api/admin/events/" + id,
                        method: "DELETE",
                        success: function (data) {
                            $.alert({
                                title: '',
                                content: '删除活动成功'
                            });
                            s.fetchData(1);
                            s.forceUpdate();
                        }.bind(this),
                        error: function () {
                            alert("error");
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
                dataList =data.map(function (d, index) {
                    var beginDate = d.beginDate ? newFormatDataComponent.formatData(d.beginDate, 3) : "";
                    var endDate = d.endDate ? newFormatDataComponent.formatData(d.endDate, 3) : "";
                    var editHref = "/#/admin/event/edit/"+d.id;
                    return (
                        <div className="row boxCo-row">
                            <div className="col-xs-12 col-sm-4 ap-r-0" style={{marginBottom:"10px"}}>{d.title}</div>
                            <div className="col-xs-6  col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{beginDate}</div>
                            <div className="col-xs-6  col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{endDate}</div>
                            <div className="col-xs-6  col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{d.states}</div>
                            <div className="col-xs-6  col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>
                                <a className="btn operaBtn" href={editHref}>编辑</a>&nbsp;&nbsp;
                                <button className="btn operaBtnRe" onClick={this.deleteHelp.bind(null,index)}>删除</button>
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
        render: function () {
            if(this.state.fetch==true){
                var title = this.renderTitle();
                var dataList=this.getDataList();
                var pages = <div className="tcdPageCode"></div>
                return (<div>
                            <div className="col-xs-12">
                                <div className="row boxCo-find">
                                    <select id="type" className="boxCo-select" value={this.state.type}
                                            onChange={this.fetch.bind(null,1)}>
                                        <option value="all">全部</option>
                                        {
                                            this.PropTypes.states.map(function (sta) {
                                                return (<option value={sta.id}>{sta.title}</option>);
                                            })
                                        }
                                    </select>&nbsp;&nbsp;
                                    <a className="btn operaBtn" href="/#/admin/event/add/0">新增活动</a>
                                 </div>
                                {title}
                                {dataList}
                                {pages}
                            </div>
                        </div>
                )
            }else{
                return( <div className="row" style={{minHeight:"653px",textAlign:"center"}}>
                    <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                </div>);
            }
        },
        renderTitle: function () {
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return(<div className="row boxCo-title">{
                    COLS.map(function (col) {
                        if (col=="activeName"){
                            return (<div className="col-sm-4 ap-r-0 hidden-xs" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }else{
                            return (<div className="col-xs-6 col-sm-2 ap-r-0" >
                                {COLS_MAPPING[col]}
                            </div>);
                        }
                    }.bind(this))
                }</div>
            );
        }
    });
});