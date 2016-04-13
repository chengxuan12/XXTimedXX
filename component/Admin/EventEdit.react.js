/**
 * Created by Administrator on 2015/9/23.
 */
'use strict';
define([
    'react',
    'backbone',
    'jquery',
    'jqueryForm',
    'Confirm',
    'jsx!component/Admin/RichTextBoxEdit.react',
    'jsx!component/Common/FormatDataComponent.react',
], function (React, backbone, $, jqueryForm, Confirm, RichTextBoxEdit,FormatDataComponent) {
    return React.createClass({
        getInitialState: function () {
            return {
                id: this.props.id,
                title: this.props.title,
                showRich: "",
                data: {richId:0,
                        imgUrl:0,
                        activityUrl:0}
            }
        },
        componentDidMount: function () {
            if (!$('input[name="chooseRich"]').prop("checked")) {
                this.setState({showRich: "hidden"});
            }
            $('#chooseRich').click(function () {
                var style = "hidden";
                if ($('input[name="chooseRich"]').prop("checked")) {
                    style = "";
                }
                this.setState({showRich: style});
            }.bind(this));
            if (this.state.id!=0&&this.state.id!=null&&this.state.id!=undefined) {
                this.fetchData(this.state.id);
            }
        },
        fetchData:function(){
            var url = "/api/events/"+this.state.id;
            $.ajax({
                async: false,
                url: url,
                success: function (data) {
                    if(data.items.length>0) {
                        var item = data.items[0];
                        var newFormat = new FormatDataComponent();
                        item["beginDate"]= newFormat.formatData(item["beginDate"],3);item["endDate"]=newFormat.formatData(item["endDate"],3);
                        var content =item["content"];
                        var reg = new RegExp("\\[(.| )+?\\]", "igm");
                        var t = content.match(reg);
                        var going = "";
                        if (t != null) {
                            var rich = t[t.length - 1];
                            item["content"] = content.substring(0, content.length - rich.length);
                            item["richId"] = rich.substring(1, rich.length - 1);
                            $('#chooseRich').click();
                        }
                        this.setState({data:item});
                    }else{
                        this.setState({data:null});
                    }
                }.bind(this),
                error:function(){
                    $.alert({
                        title: '',
                        content: '查询活动失败'
                    });
                }
            });
        },
        setRichValue: function (uuid) {
            //提交所有值
            this.submitAll(uuid);
        },
        submitUrl: function (id, content) {
            var url = "/api/admin/events";
            var data = '{"title":"' + $("#title").val() + '","content":"' + content + '","beginDate":"' + $("#beginDate").val() + '","endDate":"' + $("#endDate").val() + '","imgUrl":"'+this.state.data.imgUrl+'","activityUrl":"/#/article/event/detail/' + id + '","id":"' + id + '"}';
            $.ajax({
                url: url,
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: "post",
                data: data,
                success: function (data) {
                    if (data.result == "success") {
                    } else {
                        $.alert({
                            title: '',
                            content: data.message
                        });
                    }
                }.bind(this),
                error: function (data) {
                    $.alert({
                        title: '',
                        content: data.responseJSON.message
                    });
                }.bind(this)
            });
        },
        submitAll: function (uuid) {
            var content = $("#content").val(), title = $("#title").val();
            if (uuid) {
                content += "[" + uuid + "]";
            }
            var reg = new RegExp('\"', "g"); //创建正则RegExp对象
            content = content.replace(reg, "\'");
            title = title.replace(reg, "\'");
            var url = "/api/admin/events";
            var data="",imgUrl=this.state.data.imgUrl,activityUrl=this.state.data.activityUrl;
            if (this.state.id!=0&&this.state.id!=null&&this.state.id!=undefined) {
                data = '{"id":"' + this.state.id + '","title":"' + title + '","content":"' + content + '","beginDate":"' + $("#beginDate").val() + '","endDate":"' + $("#endDate").val() + '","imgUrl":"'+imgUrl+'","activityUrl":"'+activityUrl+'"}';
            }else{
                data = '{"title":"' + title + '","content":"' + content + '","beginDate":"' + $("#beginDate").val() + '","endDate":"' + $("#endDate").val() + '","imgUrl":"'+imgUrl+'","activityUrl":"'+activityUrl+'"}';
            }
            $.ajax({
                url: url,
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method: "post",
                data: data,
                success: function (data) {
                    if (data.result == "success" && data.items[0]) {
                        $("#eventId").val(data.items[0].id);
                        this.submitUrl(data.items[0].id, content);
                        if(this.state.id!=0&&this.state.id!=null&&this.state.id!=undefined&&$("#imgFile").val() == ""){
                            $.alert({
                                title: '',
                                content: "修改成功"
                            });
                            routerReact.navigate("/admin/event",{trigger:true});
                        } else{
                            this.submitPic();
                        }
                    } else {
                        $.alert({
                            title: '',
                            content: data.message
                        });
                    }
                }.bind(this),
                error: function (data) {
                    $.alert({
                        title: '',
                        content: data.responseJSON.message||data.statusText
                    });
                }.bind(this)
            });
        },
        submitPic: function () {
            var form = $("form[name=event_pic_form]");
            var options = {
                url: "/api/admin/events/upload/images",
                method: "post",
                async: false,
                data: form.serialize(),
                success: function (data) {
                    if (data.result == "success") {
                        if(this.state.id!=0&&this.state.id!=null&&this.state.id!=undefined){
                            $.alert({
                                title: '',
                                content: "修改成功"
                            });
                        }else{
                            $.alert({
                                title: '',
                                content: "添加成功"
                            });
                        }
                        routerReact.navigate("/admin/event",{trigger:true});
                    } else {
                        $.alert({
                            title: '',
                            content: data.message
                        });
                    }
                }.bind(this),
                error: function (data) {
                    alert("error");
                }
            }
            form.ajaxSubmit(options);
        },

        checkForm: function () {
            var beginDate=$("#beginDate").val();
            var endDate=$("#endDate").val();
            var time=1;
            if(beginDate!= ""&&endDate!= ""){
                var b=new Date(beginDate.replace(/-/g,"/"));
                var e=new Date(endDate.replace(/-/g,"/"));
                time=e.getTime()-b.getTime();
            }
            if ($("#title").val() == "") {
                this.alertForm("标题不为空");
            } else if ($("#content").val() == "") {
                this.alertForm("内容不为空");
            } else if (beginDate== "") {
                this.alertForm("开始时间不为空");
            } else if (endDate== "") {
                this.alertForm("结束时间不为空");
            } else if(time<=0){
                this.alertForm("开始时间不能大于结束时间");
            }else if ($("#imgFile").val() == ""&&this.state.id==0) {
                this.alertForm("图片未上传");
            } else{
                this.submit();
            }
        },
        alertForm: function (mess) {
            $.alert({
                title: '',
                content: mess
            });
            return;
        },
        submit: function () {
            //加入方法，判断每个字段都是必填的，图片也是必须上传的
            if (this.state.showRich == "hidden") {//不提交富文本
                this.submitAll();
            } else {
                //提交富文本框
                $("#rich_btn")[0].click();
            }
        },
        change: function (title, event) {
            this.state.data[title] = event.target.value;
            this.setState({data: this.state.data});
        },
        checkImg: function () {
            return window.loadLocalImage("imgFile", "imgFileDiv", 1920, 306);
        },
        render: function () {
            var event = this.state.data;
            var showRich = this.state.showRich;
            return (<div>
                    <div className="col-xs-12 form-horizontal" name="eventForm">
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="title"><i
                                        className="ad-required">*</i>标题</label>

                                    <div className="col-sm-7 col-lg-5">
                                        <input type="text" className="form-control inputAStyle" id="title"
                                               name="title"  value={event.title} onChange={this.change.bind(null,"title")}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="content"><i
                                        className="ad-required">*</i>内容</label>

                                    <div className="col-sm-9 col-lg-8">
                                        <textarea className="form-control textAStyle" id="content" name="content"  value={event.content} onChange={this.change.bind(null,"content")}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="chooseRich"></label>

                                    <div className="col-sm-7 col-lg-5">
                                        <input type="checkbox" name="chooseRich" id="chooseRich"/>添加富文本内容
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className={showRich}>
                                        <label className="col-sm-3 col-md-2 control-label">富文本内容</label>

                                        <div className="col-sm-9 col-lg-8">
                                            <RichTextBoxEdit setRichValue={this.setRichValue} richId={event.richId}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="value"><i
                                        className="ad-required">*</i>开始时间</label>

                                    <div className="col-sm-7 col-lg-5">
                                        <input type="date" className="form-control inputAStyle" id="beginDate"
                                               name="beginDate" value={event.beginDate} onChange={this.change.bind(null,"beginDate")}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="value"><i
                                        className="ad-required">*</i>结束时间</label>

                                    <div className="col-sm-7 col-lg-5">
                                        <input type="date" className="form-control inputAStyle" id="endDate"
                                               name="endDate" value={event.endDate} onChange={this.change.bind(null,"endDate")}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <form name="event_pic_form" className="form-inline" encType="multipart/form-data"
                                          method="post">
                                        <label className="col-sm-3 col-md-2 control-label"><i
                                            className="ad-required">*</i>图片</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <input type="file" id="imgFile" name="file" style={{width:"100%"}}
                                                   onChange={this.checkImg}/>
                                            <input type="hidden" id="imgFileDiv"/>
                                            <input className="hidden" id="eventId" name="eventId"/>
                                        </div>
                                        <div className="col-sm-9 col-lg-10 " style={{fontSize:"13px",color:"red",marginTop:"10px"}}>
                                              图片分辨率应为1920*306
                                          </div>
                                    </form>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-xs-12 col-sm-9 col-md-10  col-sm-offset-3 col-md-offset-2">
                                        <button onClick={this.checkForm} className="btn  adminBtn" type="button"
                                                style={{marginBottom:"0px"}}>提交
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            )
        }
    });
});