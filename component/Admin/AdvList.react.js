/**
 * Created by Administrator on 2015/9/22.
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
        PropTypes:{
            states:[
                {
                    id:1,
                    title:"展示"
                },
                {
                     id:0,
                     title:"关闭"
                 },
                 {
                   id:2,
                   title:"草稿"
                 }
            ],
            COLS: ["adId", "adName",  "adType", "adTime","adStatus","operation"],
            COLS_MAPPING: {
                "adId": "广告ID",
                "adName": "广告名称",
                "adType": "广告类型",
                "adTime": "创建时间",
                "adStatus": "状态",
                "operation":"操作"
            },
        },
        getInitialState:function(){
            return{
                totalPage:1,
                currentPage:1,
                perCount:8,
                data:[],
                type:this.props.type,
                fetch:false
            }
        },
        componentDidMount:function(){
            this.goToFetch();
        },
        componentDidUpdate:function(){
            if(this.state.data.length > 0&&this.state.totalPage>1) {
                $(".tcdPageCode").createPage({
                    pageCount: parseInt(this.state.totalPage),
                    current: parseInt(this.state.currentPage),
                    backFn: function (page) {
                        routerReact.navigate("/admin/adv/"+this.state.type+"/"+page,{trigger:true});
                    }.bind(this)
                });
            }
        },
        componentWillReceiveProps:function(nextProps){
            this.setState({currentPage:nextProps.page});
            this.fetchData(nextProps.page);
        },
        goToFetch:function(){
            if(this.props.page) {
                this.fetchData(this.props.page);
            }else{
                this.fetchData(1);
            }
        },
        fetchData:function(page){
            var start = page?(page-1)*this.state.perCount:0,type=this.state.type;
            var url = "/api/public/ads?start="+start+"&count="+this.state.perCount+"&sortField=id:false";
            if(!type || (type!=''&& type!='all')){
                url += "&states="+type;
            }
            $.ajax({
                async:false,
                url:url,
                success:function(data){
                    if(data.code==200){
                        this.setState({currentPage:page,data:data.items,totalPage:Math.ceil(data.total/this.state.perCount),fetch:true});
                        this.forceUpdate();
                    }
                }.bind(this),
                error:function(data){

                }
            });
        },
        fetch:function(){
            var type=$("#type").val(),href="/admin/adv/"+type+"/1";
            routerReact.navigate(href,{trigger:true})
        },
        deleteAdv:function(index){
            var data = this.state.data;
            var id = data[index].id;
            var s=this;
            $.confirm({
                title: '',
                content: '确定删除此广告？',
                confirm: function(){
                    $.ajax({
                        url:"/api/admin/ads/"+id,
                        method:"DELETE",
                        success:function(data){
                            $.alert({
                                title: '',
                                content: '删除广告成功'
                            });
                            s.fetchData(1);
                            s.forceUpdate();
                        }.bind(this),
                        error:function(){
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
                dataList =data.map(function (d,index) {
                    var createdAt = d.createdAt ? newFormatDataComponent.formatData(d.createdAt, 3) : "";
                    return (
                        <div className="row boxCo-row">
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{d.id}</div>
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{d.title}</div>
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{d.type}</div>
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{createdAt}</div>
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>{d.states}</div>
                            <div className="col-xs-6 col-sm-2 ap-r-0" style={{marginBottom:"10px"}}>
                                <button className="btn operaBtnRe" onClick={this.deleteAdv.bind(null,index)}>删除</button>
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
                return (<div>
                            <div className="col-xs-12">
                                <div className="row boxCo-find">
                                    <select id="type" className="boxCo-select" value={this.state.type}
                                            onChange={this.fetch.bind(null,1)}>
                                        <option value="all">全部</option>
                                        {
                                            this.PropTypes.states.map(function(sta){
                                                return(<option value={sta.id}>{sta.title}</option>);
                                            })
                                        }
                                    </select>&nbsp;&nbsp;
                                    <a className="btn operaBtn" href="/#/admin/adv/add/0" >新增广告</a>
                                </div>
                                {title}
                                {dataList}
                                {pages}
                        </div>
                    </div>
                );
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
                        return (<div className="col-xs-6 col-sm-2 ap-r-0" >
                            {COLS_MAPPING[col]}
                        </div>);
                    }.bind(this))
                }</div>
            );
        }
    });
});