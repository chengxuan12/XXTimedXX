/**
 * Created by Administrator on 2015/7/3.
 */
'use strict';

define([
    'react',
    'jsx!component/PeiZiAndCapital/PeiziRecordComponent.react',
    'jsx!component/User/UserComponent.react',
    'model/PeiziRecordModel',
    'model/UserModel'
], function (React,PeiziRecordComponent,UserComponent,PeiziRecordModel,UserModel) {
    return React.createClass({

        componentDidMount: function() {
            this.props.model.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillUnmount: function() {
            this.props.model.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },

        getUser:function(uid){
            var userModel = [];
            var userlist = (this.props.model.attributes.list.ulist).map(function(useritem){
                if(useritem.id == uid)
                {
                    userModel.id=useritem.id;
                    userModel.name=useritem.name;
                    userModel.mobile =useritem.mobile;
                }
            });
            return userModel;
        },

        getData :function(){
            var plistarray = this.props.model.get('list').plist;
            if(plistarray =='')
            {
                plistarray =[];
            }
            for(var i=0;i< plistarray.length ;i++){
                var uid = plistarray[i].uid;
                var user= this.getUser(uid);
                plistarray[i].user= user;
            }
            var complist = (plistarray).map(function(pitem){
                var userModel;
                if(this.props.peiziModel.get('uid')=='') {
                    userModel =new UserModel(pitem.user.id,pitem.user.name,pitem.user.mobile);
                }else{
                    userModel = new UserModel("","","");
                }
                var precordModel=new PeiziRecordModel(pitem.type,pitem.warn_line,pitem.open_line,pitem.deposit,pitem.lever,pitem.loan,pitem.account,pitem.status,pitem.cycle_count,pitem.open_account_time);
                return (
                    <PeiziRecordComponent  user={userModel} model={precordModel} peiziModel={this.props.peiziModel}></PeiziRecordComponent>);
            }.bind(this));
            return complist;
        },

        render: function () {
            var usertitle = '';
            if(this.props.peiziModel.get('uid')=='') {
                var usercomponent = new UserComponent();
                usertitle = usercomponent.renderTitle(this.props.peiziModel.get('title'));
            }
            var peizirecordcomponent = new PeiziRecordComponent();
            var recordtitle = peizirecordcomponent.renderTitle(this.props.peiziModel.get('uid'));
            var componentlist = this.getData();

            return (

                <div className="choose choosePeizi">
                    <div className='header  row'><div>{usertitle}</div><div>{recordtitle}</div></div>

                    <div>
                        {componentlist}
                    </div>
                </div>

            );
        }
    });
});
