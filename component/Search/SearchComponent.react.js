/**
 * Created by Administrator on 2015/7/6.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery',
    'jsx!component/Remark/PopUpComponent.react'
], function (React,Backbone,$,PopUpComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                searchString:'',
                popUps:[{name:"",uid:""}]
            };
        },
        handlechange:function(event){
            var array = [{name:"正在查询请稍候...",uid:""}];
            var searchValue = event.target.value;
            this.setState({"searchString":searchValue});

            if(searchValue.trim()!='') {
                var url = globamParam.url_header+'/api/typeahead/user/'+searchValue;
                this.setState({
                    popUps: array,
                }, function () {
                    $.ajax({
                        url: url,
                        dataType: "json",
                        success: function (data, status) {
                            if (status == "success" && data.items.length > 0) {
                                this.setState({popUps: data.items});
                            } else {
                                array = [{name: "搜索不到你要的数据", uid: ""}];
                                this.setState({popUps: array});
                            }
                        }.bind(this)
                    });
                });
            }else{
                this.props.peiziModel.set("uid","");
                this.props.peiziModel.set("name","");
                array = [{name:"", uid: ""}];
                this.setState({popUps: array});
            }
        },
        submitHandler:function(event){
            event.preventDefault();
        },
        clearSearch:function(){
            var array = [{name:"", uid: ""}];
            this.setState({searchString:"",popUps: array});

        },

        getIsHiden:function(){
            var hide=(this.props.peiziModel.get("uid")!='')?{display:'inline-block', margin:'0px 5px'}:{display:"none"};
            return hide;
        },
        getPopUpStyle:function(){
            var styles =(this.state.popUps[0].name=='')? {border:"0px"}:{border:"1px solid rgb(245, 236, 236)"};
            return styles;
        },
        getLink:function(){
            var title=(this.props.peiziModel.get("title")=='peizi')?'peizi':'capital';
            var peiziModel=this.props.peiziModel;
            var astatus,atype;
            atype=(peiziModel.get('type')==null||peiziModel.get('type')=='')?0:peiziModel.get('type');
            astatus=(peiziModel.get('status')==null||peiziModel.get('status')=='')?0:peiziModel.get('status');
            var link=globamParam.url_header+'/#'+title+'/0/'+atype+'/'+astatus;
            return link;
        },
        render: function() {
            var link=this.getLink();

            var hide=this.getIsHiden();
            var styles=this.getPopUpStyle();
            return (
                    <div>
                        <div className="search-head-input">
                            <input type = "text" id="search"  value={this.state.searchString} onChange={this.handlechange} placeholder="按姓名,手机号查询"/>
                            <span style={hide}>&nbsp;<a href={link}><button onClick ={this.clearSearch} className="btn btn-info btn-sm">清空</button></a></span>
                        </div>
                        <div id="popups" className="popUpSearch" style={styles}><PopUpComponent model={this.state.popUps} peiziModel={this.props.peiziModel} /></div>
                    </div>
            );
        }
    });
});

