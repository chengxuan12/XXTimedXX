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
    'jsx!component/Admin/RichTextBoxEdit.react'
], function (React, backbone, $, jqueryForm, Confirm, RichTextBoxEdit) {
    return React.createClass({
        PropTypes: {
            type: [{
                id: 1,
                name: "注册"
            }, {
                id: 2,
                name: "投资"
            }, {
                id: 3,
                name: "支付"
            },
                {
                    id: 4,
                    name: "变现"
                },
                {
                    id: 5,
                    name: "融资"
                }],
        },
        getInitialState: function () {
            return {
                id: this.props.id,
                title: this.props.title,
                showRich: "",
                data: {
                    title: "",
                    type: "1",
                    content: ""
                }
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
            if (this.state.id != 0) {//查询
                this.fetchData();
            }
        },
        fetchData: function () {
            var url = "/api/public/help/question/" + this.state.id;
            $.Ajax.request(url, {
                success: function (xhr) {
                    if (xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText).items[0];
                        var reg = new RegExp("\\[(.| )+?\\]", "igm");
                        var content = data["content"];
                        var t = content.match(reg);
                        if (t != null) {
                            var rich = t[t.length - 1];
                            data["content"] = content.substring(0, content.length - rich.length);
                            data["richId"] = rich.substring(1, rich.length - 1);
                            $('#chooseRich').click();
                        }
                        this.setState({data: data});

                    }
                }.bind(this),
                failure: function (data) {

                }.bind(this)
            });
        },
        setRichValue: function (uuid) {
            //提交所有值
            this.submitAll(uuid);
        },
        submitAll: function (uuid) {
            var content = $("#content").val();
            var title = $("#title").val();
            if (uuid) {
                content += "[" + uuid + "]";
            }
            var reg = new RegExp('\"', "g"); //创建正则RegExp对象
            content = content.replace(reg, "\'");
            title = title.replace(reg, "\'");
            var url = "/api/admin/help/question/";
            var data = '{"title":"' + title + '","content":"' + content + '","type":"' + $('input[name="type"]:checked').val() + '"}';
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
                        $.alert({
                            title: '',
                            content: '新增/修改成功'
                        });
                        routerReact.navigate("/admin/help",{trigger:true});
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
        checkForm:function(){
            if($("#title").val()==""){
                this.alertForm("问题不为空");
            }else if($("#content").val()==""){
                this.alertForm("答案不为空");
            }else{
                this.submit();
            }
        },
        alertForm:function(mess){
            $.alert({
                title: '',
                content:mess
            });
            return;
        },
        deleteHelp: function (id) {
            $.ajax({
                url: "/api/admin/help/question/" + id,
                method: "DELETE"
            })
        },
        submit: function () {
            if (this.state.id) {//删除后添加 编辑
                this.deleteHelp(this.state.id);
            }
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
        render: function () {
            var showRich = this.state.showRich;
            var s=this;
            var data = this.state.data;
            return (<div>
                        <div className="col-xs-12 form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-3 col-md-2 control-label" htmlFor="title"><i className="ad-required">*</i>问题</label>
                                <div className="col-sm-7 col-lg-5">
                                    <input type="text" className="form-control inputAStyle" id="title" name="title"
                                           onChange={this.change.bind(null,"title")}
                                           value={data.title}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 col-md-2 control-label" htmlFor="content"><i className="ad-required">*</i>答案</label>
                                <div className="col-sm-9 col-lg-8">
                                    <textarea className="form-control textAStyle" id="content" name="content"
                                              onChange={this.change.bind(null,"content")}
                                              value={data.content}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 col-md-2 hidden-xs control-label" htmlFor="chooseRich"></label>
                                <div className="col-sm-7 col-lg-5">
                                    <input type="checkbox" name="chooseRich" id="chooseRich"/>添加富文本内容
                                </div>
                            </div>
                            <div className={"form-group "+showRich}>
                                  <label className="col-sm-3 col-md-2 control-label">富文本内容</label>
                                  <div className="col-sm-9 col-lg-8">
                                      <RichTextBoxEdit setRichValue={this.setRichValue} richId={data.richId}/>
                                  </div>
                             </div>
                            <div className="form-group">
                                <label className="col-sm-3 col-md-2 control-label" style={{paddingTop:"2px"}}><i className="ad-required">*</i>类型</label>
                                <div className="col-sm-7 col-lg-5">
                                    {
                                        this.PropTypes.type.map(function(t){
                                            if(s.state.data.type== t.id){
                                                return (<span><input type="radio" name="type" value={t.id} onClick={this.change.bind(null,"type")} checked/>{t.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
                                            }else{
                                                return (<span><input type="radio" name="type" value={t.id} onClick={this.change.bind(null,"type")}/>{t.name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
                                            }
                                        }.bind(this))
                                    }
                                </div>
                            </div>
                            <div className="form-group clearfix">
                                <div className="col-xs-12 col-sm-9 col-md-10  col-sm-offset-3 col-md-offset-2">
                                    <button onClick={this.checkForm} className="btn  adminBtn" type="button">提交</button>
                                </div>
                            </div>

                        </div>
                    </div>
            );
        }
    });
});