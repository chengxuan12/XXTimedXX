/**
 * Created by Administrator on 2015/8/21.
 */
'use strict';
define([
    'react',
    'jquery',
    'Ajax',
    'jsx!component/Common/FormatDataComponent.react'
], function (React, $, Ajax, FormatDataComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                notices:[],
            }
        },
        componentDidMount:function(){
            window.noticeFlag = 0;
            $.Ajax.request(globamParam.public_url+"/events?sortField=beginDate:false", {
                async:false,
                data:"start=0&count=5",
                success:function(xhr){
                    if(xhr.status == 200) {
                        if(xhr.responseText.indexOf("<html>")==-1){
                            var data = JSON.parse(xhr.responseText);
                            this.setState({notices:data.items});
                        }
                    } else{  //登录超时

                    }
                }.bind(this),
                failure:function(data){

                }.bind(this)
            });
        },
        componentDidUpdate:function(){
            if($("#scrollNotices")!=null && window.noticeFlag == 0){
                $("#scrollNotices").Scroll({line: 1, speed: 500, timer: 3000, up: "but_up", down: "but_down"});
                window.noticeFlag = 1;
            }
        },
        getScroll:function(){
            var scroll = "";
            if(this.state.notices.length!=0) {
                scroll=<div className="scrollNotices col-xs-8 col-sm-8 col-lg-9" id="scrollNotices">
                    <ul style={{padding:"0px"}}>{
                        this.state.notices.map(function (notice) {
                            var eventHref = "/#/article/event/detail/" + notice.id;
                            if (notice != null){
                                var newFormat = new FormatDataComponent();
                                var beginDate =  newFormat.formatData(notice.beginDate,1);
                                return (<li style={{padding:"0px",overflow:"hidden"}}>
                                    <div className="col-sm-12"><a style={{color:"#433"}}
                                                                  href={eventHref}>&nbsp;{notice.title}:&nbsp;{beginDate}</a>
                                    </div>
                                </li>)
                            }
                        })
                    }</ul>
                </div>
                return scroll;
            }else{
                return <div className="scrollNotices col-xs-8 col-sm-8 col-lg-9 "></div>
            }

        },
        render: function () {
            var scroll=this.getScroll();
                return (<div className="container">
                    <div className="row">
                        <div className="clearfix wLatestNotice">
                            <div className="col-sm-2 col-lg-1 wLatestName hidden-xs">最新活动</div>
                            {scroll}
                            <div className="col-sm-2 moreNotice hidden-xs"><a href="/#/article/event/all/1"
                                                                              style={{color:"#777"}}>更多活动&nbsp;<span
                                className="glyphicon glyphicon-chevron-right"></span></a></div>
                            <div className="col-xs-4 moreNotice visible-xs"><a href="/#/article/event/all/1"
                                                                               style={{color:"#777"}}>更多<span
                                className="glyphicon glyphicon-chevron-right"></span></a></div>
                        </div>
                    </div>
                </div>);
            }
    });
});