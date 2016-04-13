/**
 * Created by Administrator on 2015/9/21.
 */

'use strict';

define([
        'react',
        'jquery',
        'Page',
        'jsx!component/Common/FormatDataComponent.react',
    ],
    function(React,$,Page,FormatDataComponent){
        return React.createClass({
            PropTypes: {
                COLS: ["userName","mobile","heading","content", "time", "img","operation"],
                COLS_MAPPING: {
                    "userName":"姓名",
                    "mobile":"手机号",
                    "heading": "标题",
                    "content": "内容",
                    "time": "时间",
                    "img": "图片",
                    "operation": "操作",
                },
            },
            componentWillReceiveProps:function(){
                if(this.props.data.length >0&&this.props.totalPage>1) {
                    $(".tcdPageCode").createPage({
                        pageCount: parseInt(this.props.totalPage),
                        current: parseInt(this.props.currentPage),
                        backFn: function (page) {
                            routerReact.navigate("/admin/opinion/" + page,{trigger:true});
                        }.bind(this)
                    });
                }
            },
            renderTitle:function(){
                var COLS = this.PropTypes.COLS;
                var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
                return(<div className="row boxCo-title">{
                        COLS.map(function (col) {
                            if (col=="heading"||col=="time"){
                                return (<div className="col-xs-5 col-sm-4 col-md-2 ap-r-0" >
                                    {COLS_MAPPING[col]}
                                </div>);
                            }else if(col=="content"||col=="mobile"){
                                return (<div className="col-xs-7 col-sm-8 col-md-2 ap-r-0" >
                                    {COLS_MAPPING[col]}
                                </div>);
                            }else if(col=="userName"){
                                return (<div className="col-xs-5 col-sm-4 col-md-1 ap-r-0" >
                                    {COLS_MAPPING[col]}
                                </div>);
                            }else if(col=="img"){
                                return (<div className="col-xs-4 col-sm-4 col-md-2" >
                                    {COLS_MAPPING[col]}
                                </div>);
                            }else{
                                return (<div className="col-xs-3 col-sm-4 col-md-1  ap-r-0" >
                                    {COLS_MAPPING[col]}
                                </div>);
                            }
                        }.bind(this))
                    }</div>
                );
            },
            alertImg:function(imgUrl){
                $('#charge_light').css("display",'block');
                $('#charge_fade').css("display",'block');
                $("#charge_light").attr("src",imgUrl);
            },
            hide:function(){
                $('#charge_light').css("display",'none');
                $('#charge_fade').css("display",'none');
            },
            getDataList:function(){
                var dataList;
                var data = this.props.data;
                var s=this;
                var newFormat = new FormatDataComponent();
                if(data.length > 0) {
                    dataList =data.map(function(d){
                        var date= newFormat.formatData(d.createdAt,2);
                        var name=(d.userSimple.name=="")?0:encodeURI(d.userSimple.name);
                        var mobile=(d.userSimple.mobile=="")?0:d.userSimple.mobile;
                        return(<div className="row boxCo-row">
                            <div className="col-xs-5 col-sm-4 col-md-1 ap-r-0" style={{marginBottom:"15px"}}>{d.userSimple.name}</div>
                            <div className="col-xs-7 col-sm-8 col-md-2 ap-r-0" style={{marginBottom:"15px"}}>{d.userSimple.mobile}</div>
                            <div className="col-xs-5 col-sm-4 col-md-2 ap-r-0" style={{marginBottom:"15px",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}>{d.title}</div>
                            <div className="col-xs-7 col-sm-8 col-md-2 ap-r-0" style={{marginBottom:"15px"}}>{d.content}</div>
                            <div className="col-xs-5 col-sm-4 col-md-2 ap-r-0">{date}</div>
                            <div className="col-xs-4 col-sm-4 col-md-2 ap-r-0">
                                <img src={d.imgUrl} className="opinionImg"  onClick={s.alertImg.bind(null,d.imgUrl)}/>
                            </div>
                            <div className="col-xs-3 col-sm-4 col-md-1 ap-r-0"><a className="btn operaBtn" href={"/#/admin/appNotice/"+d.userId+"?name="+name+"&mobile="+mobile}>推送</a></div>
                        </div>)
                    })
                }else{
                    dataList=<div className="col-xs-12  aNoData">
                        未找到符合要求的记录
                    </div>
                }
                return dataList;
            },
            render:function(){
                if(this.props.fetch==true){
                    var opinionTitle=this.renderTitle();
                    var dataList=this.getDataList();
                    var pages = <div className="tcdPageCode"></div>
                    return (<div>
                            <div className="col-xs-12">
                                            {opinionTitle}
                                            {dataList}
                                            {pages}
                            </div>
                            <img  id="charge_light" onClick={this.hide} className="ad_opImg"/>
                            <div id="charge_fade" className="black_overlay"></div>
                        </div>
                        )
                }else{
                    return( <div className="row" style={{minHeight:"653px",textAlign:"center"}}>
                        <i className="icon-spinner icon-spin" style={{fontSize:"36px",marginTop:"100px"}}></i>
                    </div>);
                }
            }
        });
    });