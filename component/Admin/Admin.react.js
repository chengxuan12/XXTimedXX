/**
 * Created by Administrator on 2015/9/18.
 */
'use strict';
define([
    'react',
    'backbone',
    'jquery',
    'Ajax',
    'jqueryForm',
    'jsx!component/Admin/RichTextBoxEdit.react',
    'jsx!component/Admin/AdminMenu.react',
    'jsx!component/Admin/ProductManage.react',
    'jsx!component/Admin/ProductEdit.react',
    'jsx!component/Admin/AdvList.react',
    'jsx!component/Admin/AdvEdit.react',
    'jsx!component/Admin/HelpList.react',
    'jsx!component/Admin/HelpEdit.react',
    'jsx!component/Admin/EventList.react',
    'jsx!component/Admin/EventEdit.react',
    'jsx!component/Admin/AdminNotice.react',
    'jsx!component/Admin/AdminOpinIndex.react',
], function (React, backbone, $, Ajax, jqueryForm, RichTextBoxEdit, AdminMenu, ProductManage, ProductEdit, AdvList, AdvEdit, HelpList, HelpEdit, EventList, EventEdit,AdminNotice,AdminOpinIndex) {
    return React.createClass({
        PropTypes: {
            headers: [
                {
                    title: "messNotice",
                    type: "",
                    showTitle: "短信通知",
                },
                {
                    title: "appNotice",
                    type: "",
                    showTitle: "APP推送通知",
                },
                {
                    title: "opinion",
                    type: "",
                    showTitle: "意见反馈管理",
                },
                {
                    title: "product",
                    type: "edit/add",
                    showTitle: "产品管理",
                    showEditTitle: "产品新增/修改"
                },
                {
                    title: "event",
                    type: "edit/add",
                    showTitle: "活动管理",
                    showEditTitle: "活动新增"
                },
                {
                    title: "adv",
                    type: "edit/add",
                    showTitle: "广告管理",
                    showEditTitle: "广告新增"
                },
                {
                    title: "help",
                    type: "edit/add",
                    showTitle: "帮助管理",
                    showEditTitle: "问题新增/修改"
                },
            ]
        },
        getComponent: function () {
            var content = "" ,title = this.props.title ,type = this.props.type;
            if(title == "product" && (type!='add'&&type!='edit')){
                content = <ProductManage title={this.props.title} type={this.props.type} page = {this.props.page} />;
            }else if(title == "product"){
                content = <ProductEdit type = {this.props.type} id = {this.props.page}/>
            }else if(title == "adv" && type!='add'){
                content = <AdvList title = {this.props.title} type={this.props.type} page={this.props.page}/>
            }else if(title == "adv"){
                content = <AdvEdit title = {this.props.title} />
            } else if (title == "help" && (type != 'add' && type != 'edit')) {
                content = <HelpList title={this.props.title} type={this.props.type} page={this.props.page}/>
            } else if (title == "help") {
                content = <HelpEdit title={this.props.title} id={this.props.page}/>
            } else if (title == "event" && (type!='add'&&type!='edit')) {
                content = <EventList title={this.props.title} type={this.props.type} page={this.props.page}/>
            } else if (title == "event") {
                content = <EventEdit title={this.props.title} id = {this.props.page}/>
            }else if(title=="messNotice"||title=="appNotice"){
                var userId=type;
                userId=((userId=="all")?"":userId);
                content=<AdminNotice title={title} userId={userId}/>;
            }else if(title=="opinion"){
                var page=type;
                page=((page=="all")?"1":page);
                content=<AdminOpinIndex title={title} page={page}/>;
            }
            return content;
        },
        goBack: function () {
            history.go(-1);
        },
        render: function() {
            var content = this.getComponent();
            var title = this.props.title, type = this.props.type;
            var showTitle = "", showEditTitle = "", nexTitle = "", backBtn = "";
            this.PropTypes.headers.map(function (h) {
                if (h.title == title) {
                    var href = "/#/admin/" + title;
                    showTitle = <a href={href} className="admin-a">{h.showTitle}</a>;
                    showEditTitle = h.showTitle;
                    nexTitle = "";
                    if (h.type.indexOf(type) != -1) {
                        showEditTitle = h.showEditTitle;
                        nexTitle = "/ " + showEditTitle;
                        if (history.length > 1) {
                            backBtn = <div style={{paddingTop:"6px"}}><a onClick={this.goBack} href="javascript:void(0)" className="btn operaBtn">返回</a></div>
                        }
                    }
                }
            }.bind(this))
            return (<div className="container-fluid">
                <div className="row" style={{background: "#1A1A1A"}}>
                    <div className="col-sm-3 col-md-2 hidden-xs ">
                        <AdminMenu title={this.props.title} />
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-10 admin-content">
                        <div className="row">
                            <div className="c-title clearfix">
                                <div className="col-xs-12">
                                    <a href="/#/admin" className="admin-a">首页</a>&nbsp;&nbsp;/&nbsp;&nbsp;{showTitle}&nbsp;&nbsp;{nexTitle}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                {backBtn}
                            </div>
                            <div className="c-box">
                                <div className="box-header clearfix">
                                    <i className="icon-edit" style={{margin:"0 12px 0 18px"}}></i>

                                    <div className="box-hRight">{showEditTitle}</div>
                                </div>
                                <div className="box-content clearfix">
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
               </div>
            );
        }
    });
});