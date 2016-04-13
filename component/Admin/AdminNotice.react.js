 /**
 * Created by Administrator on 2015/9/21.
 */

'use strict';
define([
    'react',
    'jquery',
], function (React,$) {

    return React.createClass({
        PropTypes: {
            RE_TYPE: [
                {
                    id: "1",
                    title:"单人"
                },
                {
                    id: "2",
                    title:"在线"
                },
                {
                    id: "3",
                    title:"所有"
                }
            ]
        },
        getInitialState:function() {
            return {
                mobileNumber:"",
                uid:this.props.userId,
                heading:"",
                reType:"1",
                popUps:[{name:""}],
                search:""
            }
        },
        componentDidMount:function(){
            if(window.location.href.indexOf("?")>-1){
                this.redirectUrl()
            }
        },
        redirectUrl:function(){
            var search="",array=[];
            var aQuery = window.location.href.split("?");//取得Get参数
            if (aQuery.length > 1) {
                var aBuf = aQuery[1].split("&");
                for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                    var aTmp = aBuf[i].split("=");//分离key与Value
                    array.push(aTmp[1]);
                }
            }
            var name=(array[0]==0)?0:decodeURI(array[0]);
            search=(array[0]==0)?array[1]:array[1]+" ("+name+")"
            this.setState({"search":search});
        },
        checkForm:function(){
            var reg = /^\d{11}$/;
            if(this.props.title=="appNotice"){
                if (this.state.uid == "" || this.state.heading == "") {
                    if(this.state.reType!="1"){
                        this.submit();
                    }else{
                        $.alert({
                            title: '',
                            content:"发送信息不完整"
                        });
                    }
                }else{
                    this.submit();
                }
            }else{
                if (this.state.mobileNumber == "" || !reg.test(this.state.mobileNumber)) {
                    $.alert({
                        title: '',
                        content:"发送信息不完整"
                    });
                }else{
                    this.submit();
                }
            }
        },
        submit:function(){
            var data,url;
            var heading = this.state.heading, content = $("#noticeContent").val();
            var reg = new RegExp('\"', "g"); //创建正则RegExp对象
            heading = heading.replace(reg, "\'");
            content = content.replace(reg, "\'");
            if(this.props.title=="appNotice"){
                data = '{"title":"' + heading + '","message":"' + content + '"}';
                if(this.state.reType=="1"){
                    url= globamParam.login_url + "/admin/notify/user/"+this.state.uid;
                }else if(this.state.reType=="2"){
                    url= globamParam.login_url + "/admin/notify/tag/user_status_logged";
                }else{
                    url= globamParam.login_url + "/admin/notify/all";
                }
                $.ajax({
                    url: url,
                    method: "post",
                    data: data,
                    headers:{
                        'Accept':"application/json",
                        'Content-Type':"application/json",
                    },
                    success: function (info) {
                        $.alert({
                            title: '',
                            content:"发送成功"
                        });
                    }.bind(this),
                    error: function (info) {
                        $.alert({
                            title: '',
                            content:"发送失败"
                        });
                    }
                })
            }else{
                data = {content: content};
                url=globamParam.login_url+"/admin/sms/"+this.state.mobileNumber;
                $.ajax({
                    url: url,
                    method: "post",
                    data: data,
                    success: function (info) {
                        if (info.result == "1") {
                            $.alert({
                                title: '',
                                content:"发送成功"
                            });
                        } else {
                            $.alert({
                                title: '',
                                content:"发送失败"
                            });
                        }
                    }.bind(this),
                    error: function (info) {
                        $.alert({
                            title: '',
                            content:info.responseJSON.remark
                        });
                    }
                })
            }
        },
        handleSearch:function(val,event){
            var array = [{name:"正在查询请稍候..."}];
            var searchValue = event.target.value;
            this.setState({"search":searchValue});
            if(searchValue!='') {
                $(".noticePopUp").css("display","block");
                var url = globamParam.login_url+'/typeahead/user/'+searchValue;
                this.setState({
                    popUps: array,
                }, function () {
                    $.ajax({
                        url: url,
                        dataType: "json",
                        success: function (data, status) {
                            if (status == "success" && data.items.length > 0) {
                                var da=[];
                                var length=(data.items.length>12)?12:data.items.length;
                                for(var i=0;i<length;i++){
                                     da[i]=data.items[i];
                                }
                                this.setState({popUps: da});
                            } else {
                                array = [{name: "搜索不到你要的数据"}];
                                this.setState({popUps: array});
                            }
                        }.bind(this)
                    });
                });
            }else{
                $(".noticePopUp").css("display","none");
                array = [{name:""}];
                this.setState({popUps: array});
            }
        },
        getPopUpStyle:function(){
            var styles =(this.state.popUps[0].name=='')? {border:"0px"}:{border:"1px solid rgb(245, 236, 236)"};
            return styles;
        },
        setSearch:function(l){
            var searchValue=(l.name == undefined || l.name == null || l.name == '')?l.mobile:l.mobile+" ("+l.name+")";
            if(this.props.title=="appNotice"){
                this.setState({"search":searchValue,"uid":l.id});
            }else{
                this.setState({"search":searchValue,"mobileNumber":l.mobile});
            }
            $(".noticePopUp").css("display","none");
        },
        closeSearch:function(){
            this.setState({"mobileNumber":this.state.search});
            $(".noticePopUp").css("display","none");
        },
        getPopUp:function(){
            var s=this;
            var styles=this.getPopUpStyle();
            var close="";
            if(this.props.title=="messNotice"){
                close=<li><a  href="javascript:void(0)" onClick={s.closeSearch}>关闭</a></li>
            }
            var popUp=<div id="popups" className="col-xs-12 col-sm-10 col-md-11 col-sm-offset-2 col-md-offset-1" >
                         <div className="noticePopUp" style={styles}>
                            <ul>
                                {this.state.popUps.map(function (l,index) {
                                    if(l.name == undefined || l.name == null || l.name == '') {
                                        return <li><a  href="javascript:void(0)" onClick={s.setSearch.bind(null,l)} >{l.mobile}</a></li>;
                                    }else if(l.mobile == undefined || l.mobile == null) {
                                        return <li><a href="javascript:void(0)">{l.name}</a></li>;
                                    }else
                                        return <li><a  href="javascript:void(0)" onClick={s.setSearch.bind(null,l)}>{l.mobile} ({l.name})</a></li>;
                                }.bind(this))}
                                {close}
                            </ul>
                         </div>
                     </div>
            return popUp;
        },
        handleHeading:function(event){
        this.setState({heading:event.target.value});
        },
        setReType:function(value){
            this.setState({reType:value});
        },
        SendItem:function(){
            var s=this;
            var sendItem=[];
            if(this.props.title=="appNotice"){
                    if(this.state.reType==1){
                        sendItem[0]=<input className="noticeInput" name="uid" onChange={this.handleSearch.bind(null,1)} value={this.state.search} /> ;
                    }else if(this.state.reType==2){
                        sendItem[0]=<div className="referInput" >在线人员</div> ;
                    }else{
                        sendItem[0]=<div className="referInput" >所有人员</div> ;
                    }
                    sendItem[1]=<div className="col-xs-12 col-sm-10 col-md-11 col-sm-offset-2 col-md-offset-1" style={{marginTop:"-30px",marginBottom:"20px"}}>
                        {
                            this.PropTypes.RE_TYPE.map(function(t,index){
                                if(t.id==s.state.reType){
                                    if(index!=2){
                                        return  <span><a href="javascript:void(0);" style={{color:"#FF6D55"}} onClick={s.setReType.bind(null,t.id)}>{t.title}</a>-</span>
                                    }else{
                                        return  <span><a href="javascript:void(0);" style={{color:"#FF6D55"}} onClick={s.setReType.bind(null,t.id)}>{t.title}</a></span>
                                    }
                                }else{
                                    if(index!=2){
                                        return  <span><a href="javascript:void(0);" style={{color:"#666"}} onClick={s.setReType.bind(null,t.id)}>{t.title}</a>-</span>
                                    }else{
                                        return  <span><a href="javascript:void(0);" style={{color:"#666"}} onClick={s.setReType.bind(null,t.id)}>{t.title}</a></span>
                                    }
                                }
                            })
                        }
                    </div> ;
                    sendItem[2]=<div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-12 col-sm-2 col-md-1 wRiMLe">主题</div>
                            <div className="col-xs-12 col-sm-10 col-md-11"><input className="noticeInput" name="heading" onChange={this.handleHeading} placeholder="主题..."/></div>
                        </div>
                    </div>
            }else{
                sendItem[0]=<input className="noticeInput" name="mobileNumber" onChange={this.handleSearch.bind(null,2)} value={this.state.search} /> ;
                sendItem[1]="";
                sendItem[2]="";
            }
            sendItem[3]=this.getPopUp();
            return sendItem;
        },
        render: function () {
            var sendItem=this.SendItem();
            return (<div>
                          <div className="col-xs-12 col-sm-2 col-md-1 wRiMLe"> 收信人</div>
                          <div className="col-xs-12 col-sm-10 col-md-11">{sendItem[0]}</div>
                                    {sendItem[3]}
                                    {sendItem[1]}
                                    {sendItem[2]}
                         <div className="col-xs-12 col-sm-2 col-md-1 wRiMLe">正文</div>
                         <div className="col-xs-12 col-sm-10 col-md-11"><textarea className="noticeTextArea" placeholder="正文内容..." id="noticeContent"/></div>
                         <div className="col-xs-12 col-sm-10 col-md-11 col-sm-offset-2 col-md-offset-1">
                             <button onClick={this.checkForm} className="btn registerBtn resetBtn" type="button" style={{marginBottom:"0px"}}>发送</button>
                         </div>
                    </div>
            );
        }
    });
});
