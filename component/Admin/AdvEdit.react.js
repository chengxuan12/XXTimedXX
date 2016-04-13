/**
 * Created by Administrator on 2015/9/22.
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
        PropTypes:{
            type:[
                {
                    id:"web",
                    name:"网页"
                },
                {
                    id:"good",
                    name:"理财产品"
                }
            ]
        },
        getInitialState:function(){
            return{
                title: this.props.title,
                showRich: "",
                data: {
                    type:"web"
                },
                popUps:[{name:""}],
                search:"",
                value:""
            }
        },
        componentDidMount:function(){
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
        },
        setRichValue:function(uuid){
            //提交所有值
            this.submitAll(uuid);
        },
        submitAll:function(uuid){
            var content = $("#content").val(), title = $("#title").val(),value=this.state.value;
            if(uuid){
                content += "["+uuid+"]";
            }
            var reg = new RegExp('\"', "g"); //创建正则RegExp对象
            content = content.replace(reg, "\'");
            title = title.replace(reg, "\'");
            if(uuid==undefined&&value==""){
                if(this.state.data.type=="good"){
                    $.alert({
                        title: '',
                        content: "请输入相关产品"
                    });
                }else{
                    $.alert({
                        title: '',
                        content: "请输入相关链接"
                    });
                }
                return;
            }else if(value==""&&this.state.data.type=="good"){
                $.alert({
                    title: '',
                    content: "请输入相关产品"
                });
                return;
            }else{
                value=(value=="")?"/#/richTextBox/"+uuid:value;
            }
            var url = "/api/admin/ads";
            var data = '{"title":"' + title + '","content":"' + content + '","value":"' + value+ '","cover":"0","type":"' + $('input[name="type"]:checked').val() + '"}';
            $.ajax({
                url:url,
                headers: {
                    'Accept':'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                method:"post",
                data: data,
                success:function(data){
                    if(data.result=="success" && data.items[0]){
                          $("#adpId").val(data.items[0].id);
                          this.submitPic();
                    }else {
                        $.alert({
                            title: '',
                            content: data.message
                        });
                    }
                }.bind(this),
                error: function (data) {
                    $.alert({
                        title: '',
                        content:data.responseJSON.message
                    });
                }.bind(this)
            });
        },
        submitPic:function(){
            var s = this;
            var form = $("form[name=adv_pic_form]");
            var options={
                url:"/api/admin/ads/upload/images",
                method:"post",
                async:false,
                data:form.serialize(),
                success:function(data){
                    if(data.result=="success") {
                        $.alert({
                            title: '',
                            content: "添加成功"
                        });
                        routerReact.navigate("/admin/adv",{trigger:true});
                    }else{
                        $.alert({
                            title: '',
                            content:data.message
                        });
                    }
                }.bind(this),
                error:function(data){
                    alert("error");
                }
            }
            form.ajaxSubmit(options);
        },
        checkForm:function(){
            if($("#title").val()==""){
                this.alertForm("标题不为空");
            }else if($("#content").val()==""){
                this.alertForm("内容不为空");
            }else if($("#imgFile").val()==""){
                this.alertForm("图片未上传");
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
        submit:function(){
            //加入方法，判断每个字段都是必填的，图片也是必须上传的
            if (this.state.showRich == "hidden") {//不提交富文本
                this.submitAll();
            } else {
                //提交富文本框
                $("#rich_btn")[0].click();
            }
        },
        change:function(title,event){
            this.state.data[title] = event.target.value;
            this.setState({data:this.state.data});
        },
        checkImg: function () {
            return window.loadLocalImage("imgFile", "imgFileDiv", 1920, 306);
        },
        handleValue:function(event){
              this.setState({"value":event.target.value});
        },
        handleSearch:function(){
            var array = [{title:"正在查询请稍候..."}];
            var searchValue = event.target.value;
            this.setState({"search":searchValue});
            if(searchValue!='') {
                $(".opinPopUp").css("display","block");
                var url = globamParam.login_url+'/products/like/'+searchValue;
                this.setState({
                    popUps: array,
                }, function () {
                    $.ajax({
                        url: url,
                        dataType: "json",
                        success: function (data, status) {
                            if (status == "success" && data.items.length > 0) {
                                var da=[];
                                var length=(data.items.length>5)?5:data.items.length;
                                for(var i=0;i<length;i++){
                                    da[i]=data.items[i];
                                }
                                this.setState({popUps: da});
                            } else {
                                array = [{title: "搜索不到你要的数据"}];
                                this.setState({popUps: array});
                            }
                        }.bind(this)
                    });
                });
            }else{
                $(".opinPopUp").css("display","none");
                array = [{title:""}];
                this.setState({popUps: array});
            }
        },
        getPopUpStyle:function(){
            var styles =(this.state.popUps[0].name=='')? {border:"0px"}:{border:"1px solid rgb(245, 236, 236)"};
            return styles;
        },
        getPopUp:function(){
            var s=this;
            var styles=this.getPopUpStyle();
            var popUp=<div className="opinPopUp" style={styles}>
                    <ul>
                        {this.state.popUps.map(function (l,index) {
                            if(l.id == undefined || l.id == null) {
                                return <li><a href="javascript:void(0)">{l.title}</a></li>;
                            }else{
                                return <li><a  href="javascript:void(0)" onClick={s.setSearch.bind(null,l)}>{l.title}</a></li>;
                            }
                        }.bind(this))}
                    </ul>
                </div>
            return popUp;
        },
        setSearch:function(l){
            this.setState({"search":l.title,"value":l.id});
            $(".opinPopUp").css("display","none");
        },
        render:function(){
            var s=this;
            var showRich = this.state.showRich;
            var linkInput=(this.state.data.type=="web")?<input type="text" className="form-control inputAStyle" id="value" onChange={this.handleValue}/>
                :<input type="text" className="form-control inputAStyle" id="value"  onChange={this.handleSearch}  value={this.state.search}/>
            var popUp=this.getPopUp();

            return (<div >
                            <div className="col-xs-12 form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="title"><i className="ad-required">*</i>标题</label>
                                    <div className="col-sm-7 col-lg-5">
                                        <input type="text" className="form-control inputAStyle" id="title" name="title"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="content"><i className="ad-required">*</i>内容</label>
                                    <div className="col-sm-9 col-lg-8">
                                        <textarea  className="form-control textAStyle" id="content" name="content" />
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
                                            <RichTextBoxEdit setRichValue={this.setRichValue}/>
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
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 control-label" htmlFor="value">链接</label>
                                    <div className="col-sm-7 col-lg-5">
                                        {linkInput}
                                    </div>
                                    <div className="col-sm-7 col-lg-5 col-sm-offset-3 col-md-offset-2 ">
                                        {popUp}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <form name="adv_pic_form" className="form-inline" encType="multipart/form-data" method="post">
                                        <label className="col-sm-3 col-md-2 control-label" ><i className="ad-required">*</i>图片</label>
                                        <div className="col-sm-9 col-lg-10">
                                            <input type="file" id="imgFile" name="file" style={{width:"100%"}}  onChange={this.checkImg}/>
                                            <input type="hidden" id="imgFileDiv"/>
                                            <input className="hidden" id="adpId" name="adpId" />
                                        </div>
                                        <div className="col-sm-9 col-lg-10 " style={{fontSize:"13px",color:"red",marginTop:"10px"}}>
                                            图片分辨率应为1920*306
                                        </div>
                                    </form>
                                </div>
                                <div className="form-group clearfix">
                                    <div className="col-xs-12 col-sm-9 col-md-10  col-sm-offset-3 col-md-offset-2">
                                        <button onClick={this.checkForm} className="btn  adminBtn" type="button" >提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            )
        }
    });
});