/**
 * Created by Administrator on 2015/7/9.
 */
'use strict';
define([
    'react',
    'jquery',
    'Confirm',
    'jsx!component/Remark/RemarkComponent.react'
], function (React,$,Confirm,RemarkComponent) {
    return React.createClass({
        getInitialState:function(){
            return{
                searchString:'',
            };
        },
        componentDidMount: function() {
            this.props.remarkModel.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillUnmount: function() {
            this.props.remarkModel.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        handlechange:function(event){
            var searchValue = event.target.value;
            this.setState({"searchString":searchValue});
        },
        getCookie : function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return decodeURI(c.substring(name.length, c.length));
            }
            return "";
        },
        addRemark : function(){
            if(this.state.searchString.trim()=='')
            {
                $.alert({
                    title: '',
                    content:"请输入备注的内容！"
                });
                return;
            }else if(this.getCookie("operatorName")=='')
            {
                $.alert({
                    title: '',
                    content:"请输入操作员并确认！"
                });
                return;
            }
            var author = this.getCookie("operatorName");
            var data = '{"remark": "'+this.state.searchString+'", "author":"'+author+'","date_time":"'+new Date().getTime()+'"}';
            this.setState({"searchString":""});
            $.ajax({
                url:globamParam.url_header+"/api/user/"+this.props.user.get("id")+"/remark",
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                type:"PUT",
                data: data,
                dataType:"json",
                success:function(data){
                    this.props.remarkModel.set("status","PUT");
                }.bind(this),
                error: function (data) {
                    console.log(data);
                }.bind(this)
            });

        },
        getRemarks : function(){
            var remarks = this.props.remarkModel.get("remarks").map(function(remark){
                return <RemarkComponent user ={this.props.user}  remark = {remark} remarkModel = {this.props.remarkModel}/>
            }.bind(this));
            return remarks;
        },
        render: function() {
            var remarks = this.getRemarks();
            return (
                <div>
                    <div>备注：</div>
                    <div>
                        <input id = "search"  className="input-remark-width" value={this.state.searchString} onChange={this.handlechange}/>
                        &nbsp; &nbsp;<button className="btn btn-info btn-sm" onClick = {this.addRemark}>添加</button>
                    </div>
                    <div className="all-remarks">{remarks}</div>
                </div>
            );
        }
    });

});
