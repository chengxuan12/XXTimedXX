/**
 * Created by Administrator on 2015/8/7.
 */
'use strict';

define([
        'react',
        'jquery',
        'jqueryForm',
        'birth',
        'PCAS',
        'Confirm',
        'ajaxFileUpload',
        'jsx!component/PersonalCenter/InfoAndMenu.react',
    ],
    function(React,$,jqueryForm,birthdate,PCAS,Confirm,ajaxFileUpload,InfoAndMenu){
        return React.createClass({
            PropTypes:{
                educationCOLS:["初中","高中","大专","本科","研究生及以上"],
                educationCOLSMapping:{
                    "初中":0,
                    "高中":1,
                    "大专":2,
                    "本科":3,
                    "研究生及以上":4
                },
                marryCOLS:["已婚","未婚"],
                marryCOLSMapping:{
                    "已婚":0,
                    "未婚":1
                }
            },
            getInitialState:function(){
                return{
                    clearIcon:false,
                    title:this.props.title,
                    user:this.props.user.get("user"),
                    phase:1,
                };
            },
            componentDidMount:function(){
                this.props.user.on("change",function(){
                    this.setState({user:this.props.user.get("user")});
                    $("#birthplace").html("");
                    this.setDefaults();
                    this.forceUpdate();
                }.bind(this));
                $('input.time:text').datepicker();
                if(this.state.phase==1){
                    this.handleDisabled(true);
                }
                this.setDefaults();
            },
            componentDidUpdate:function(nextProps, nextState) {
                if(this.state.phase==1){
                    this.handleDisabled(true);
                }
                if(this.state.phase==2){
                    this.handleDisabled(false);
                }
            },
            handleDisabled:function(disable) {
                $('#nickName').attr("disabled", disable);
                $("input[name='sex']").attr("disabled", disable);
                $("#birthdate").attr("disabled", disable);
                $('.person-address').attr("disabled", disable);
                $('#education').attr("disabled", disable);
                $('#marry').attr("disabled", disable);
                $("#qq").attr("disabled", disable);
                $("#email").attr("disabled", disable);
            },
            setDefaults:function(){
                var user=this.state.user;
                var value = (user.sex == "男"?0:1);
                $("input[type='radio'][value="+value+"]").prop("checked",'checked');
                if(document.getElementById("education")==null){
                    return;
                }
                var all_selects = document.getElementById("education").options;
                value = this.PropTypes.educationCOLSMapping[user.education];
                for (var i=0; i<all_selects.length; i++){
                    if (all_selects[i].value == value) {
                        all_selects[i].selected = true;
                        break;
                    }
                }

                all_selects = document.getElementById("marry").options;
                value = this.PropTypes.marryCOLSMapping[user.marry];
                for (var i=0; i<all_selects.length; i++){
                    if (all_selects[i].value == value) {
                        all_selects[i].selected = true;
                        break;
                    }
                }
                $.getT(user.province,user.city,user.area);
            },
            handleChange:function(key,event){
                this.state.user[key] = event.target.value;
                this.setState({user:this.state.user});
            },

            showClear:function(event){
                var picPath = event.target.value;
                var img = this.state.user['userIcon'];
                this.state.user['userIcon']='';
                this.setState({user:this.state.user});
                this.props.user.set("user",this.state.user);
                $.ajaxFileUpload({
                    async:true,
                    url:"/api/user/upload/usericon",
                    secureuri: false,
                    type:"post",
                    dataType: 'json',
                    fileElementId : 'userIcon',// 上传控件的id
                    data:{userIcon:picPath},
                    success:function(data,status){
                        if(status=="success"){
                            this.state.user['userIcon']=img;
                            this.setState({user:this.state.user});
                            this.props.user.set("user",this.state.user);
                        }
                        this.setState({clearIcon:true});
                    }.bind(this),
                    error:function(status,data){
                    }
                })
            },
            clearIcon:function(){
                $("#userIcon").val('');
                this.setState({clearIcon:false});
            },
            submit:function(){
                var qq=this.state.user['qq'];
                var email=this.state.user['email'];
                var reEmail= /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                var reQQ=/^\d+(\.\d+)?$/;
                if(qq!=""){
                    if(!reQQ.test(qq)){
                        $.alert({
                            title: '',
                            content:"请输入正确的QQ号"
                        });
                        return false;
                    }
                }
                if(email!=""){
                    if(!reEmail.test(email)){
                        $.alert({
                            title: '',
                            content:"邮箱格式错误"
                        });
                        return;
                    }
                }
                this.modifyInfo();
            },
            modifyInfo:function(){
                var s=this;
                var options={
                    url:"/api/user/update",
                    headers: {
                        'Accept': "application/json;charset=utf-8"
                    },
                    method:"post",
                    dataType: "json",
                    data:$("#form").serialize(),
                    success:function(data,status) {
                        if (status == "success") {
                            s.setState({phase:1});
                            $.alert({
                                title: '',
                                content: data.remark
                            });
                        }
                    }.bind(this),
                    error:function(data){
                        $.alert({
                            title: '',
                            content:data.responseJSON.message
                        });
                    }
                }
                var form = $("form[name=form]");
                form.ajaxSubmit(options);
            },
            editIcon:function(){
                $("#userIcon").click();
            },
            menuInfo:function(){
               var menuInfo=<InfoAndMenu title={this.state.title} user={this.props.user} editIcon={this.editIcon} phase={this.state.phase}/>;
                return menuInfo;
            },
            nextPhase:function(){
                this.setState({phase:2});
            },
            backPhase:function(){
                this.setState({phase:1,user:this.props.user.get("user")});
                this.setDefaults();
            },
            getEdit:function(){
              var edit= <div className="col-xs-12 col-sm-10 col-sm-offset-2">
                            <button className="btn  btn-success" type="button" onClick={this.nextPhase} style={{width:"150px"}}>编辑</button>
                        </div>;
               return edit;
            },
            getSubAndCancel:function(){
              var subAndCancel= <div>
                                     <div className="col-xs-5 col-sm-3 col-sm-offset-2">
                                         <button className="btn  btn-success" type="button" onClick={this.submit} style={{width:"90px"}}>提交</button>
                                       </div>
                                     <div className="col-xs-7 col-sm-7">
                                        <button className="btn  btn-danger" type="button" onClick={this.backPhase} style={{width:"90px"}}>取消</button>
                                        </div>
                               </div>;
                return subAndCancel;
            },
            changeDate:function(){
                this.state.user["birthdate"] = $("#tmpDate").val();
                this.setState({user:this.state.user});
            },
            render:function(){
                var user = this.state.user;
                var clearIcon =<button onClick={this.clearIcon} className="btn btn-info"> 清除</button> ;
                if(!this.state.clearIcon){
                    clearIcon = "";
                }
                var menuInfo=this.menuInfo();
                var dataBtn;
                if(this.state.phase==1){
                    dataBtn=this.getEdit();
                }
                if(this.state.phase==2){
                    dataBtn=this.getSubAndCancel();
                }
                if(user.birthdate==0){
                    user.birthdate="";
                }
                return (
                    <div className="container" style={{minHeight:"653px"}}>
                        <div className="row">

                            <div className="visible-xs" style={{marginBottom:"20px"}}>
                                {menuInfo}
                            </div>
                            <input type="hidden" id = "tmpDate" onChange={this.changeDate} onClick={this.changeDate}/>
                            <div className="col-sm-8 person-dataMdy">
                                <div className="person-form">
                                <form name="form" id="form" className="form-inline" encType="multipart/form-data">
                                    <div className="form-group hidden">
                                        <div className="row">
                                            <label htmlFor="userIcon" className="col-xs-12 col-sm-2 control-label peron-align"> 头像：</label>
                                            <div className="col-xs-7 col-sm-4">
                                                <input type="file" className="form-control" id="userIcon"  onChange={this.showClear} style={{display:"inline-block",width:"100%"}}/>
                                            </div>
                                            <div className="col-xs-5 col-sm-6">
                                                {clearIcon}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="nickName" className="col-xs-12 col-sm-2 control-label peron-align">昵称：</label>
                                            <div className="col-xs-11 col-sm-4 bottom20">
                                                <input type="text" className="form-control peron-input" id="nickName" name="nickName" value={user.nickName} onChange={this.handleChange.bind(null,"nickName")}
                                                       placeholder="输入昵称" style={{width:"100%"}}/>
                                            </div>
                                            <label htmlFor="mobileNumber" className="col-xs-12 col-sm-2  control-label peron-align" >手机号：</label>
                                            <div className="col-xs-11 col-sm-4">
                                                <input type="text" className="form-control peron-input" id="mobileNumber"  value={user.mobileNumber} style={{width:"100%"}} disabled  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="realName" className="col-xs-12 col-sm-2 control-label peron-align">姓名：</label>
                                            <div className="col-xs-11 col-sm-4 bottom20">
                                                <input type="text" className="form-control peron-input" id="realName"  value={user.userName} style={{width:"100%"}} disabled />
                                            </div>
                                            <label htmlFor="idNo" className="col-xs-12 col-sm-2  control-label peron-align" > 身份证号：</label>
                                            <div className="col-xs-11 col-sm-4">
                                                <input type="text" className="form-control peron-input p-cardId" id="idNo"  value={user.idNo} style={{width:"100%"}} disabled />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="sex" className="col-xs-12 col-sm-2 control-label peron-align"> 性别：</label>
                                            <div className="col-xs-11 col-sm-4 bottom20">
                                                    <span style={{paddingRight:"40px"}}>
                                                    <input type="radio" name="sex" value="0" />男
                                                     </span>
                                                <input type="radio" name="sex" value="1"/>女
                                            </div>
                                            <div className="timespan" >
                                                <label htmlFor="birthdate" className="col-xs-12 col-sm-2  control-label peron-align" >  出生日期：</label>
                                                <div className="col-xs-11 col-sm-4" style={{position:"relative"}}>
                                                    <input className="time form-control" id="birthdate" name="birthDate" value={user.birthdate} style={{display:"inline-block"}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="birthplace" className="col-xs-12 col-sm-2 control-label peron-align"> 出生地：</label>
                                            <div className="col-xs-12 col-sm-10">
                                                <select name="province" className="person-input person-address" id="birthplace"/>
                                                <select name="city" className="person-input person-address"/>
                                                <select name="area" className="person-input person-address pAddress3"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="education" className="col-xs-12 col-sm-2 control-label peron-align">  学历：</label>
                                            <div className="col-xs-11 col-sm-4 bottom20" >
                                                <select id="education" name="education" className="person-input">
                                                    <option value="-1">请选择</option>
                                                    {
                                                        this.PropTypes.educationCOLS.map(function(edu,index){
                                                            return(<option value={index}>{edu}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <label htmlFor="marry" className="col-xs-12 col-sm-2  control-label peron-align" > 婚姻状况：</label>
                                            <div className="col-xs-11 col-sm-4">
                                                <select className="marry person-input" name="marry" id="marry">
                                                    <option value="-1">请选择</option>
                                                    {
                                                        this.PropTypes.marryCOLS.map(function(mar,index){
                                                            return(<option value={index}>{mar}</option>);
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <label htmlFor="qq" className="col-xs-12 col-sm-2 control-label peron-align"> QQ：</label>
                                            <div className="col-xs-11 col-sm-4 bottom20">
                                                <input type="text" className="form-control peron-input" id="qq"  name="qq" value={user.qq}  onBlur={this.varifyQQ} onChange={this.handleChange.bind(null,"qq")} style={{width:"100%"}}/>
                                            </div>
                                            <label htmlFor="email" className="col-xs-12 col-sm-2  control-label peron-align" >  E-mail：</label>
                                            <div className="col-xs-11 col-sm-4">
                                                <input type="text" className="form-control peron-input" id="email" name="email" value={user.email} onBlur={this.varifyEmail} onChange={this.handleChange.bind(null,"email")} style={{width:"100%"}} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {dataBtn}
                                    </div>
                                </form>
                              </div>
                            </div>

                            <div className="hidden-xs">
                                {menuInfo}
                            </div>

                        </div>
                    </div>
                );
            }
        });
    });