/**
 * Created by Administrator on 2015/7/6.
 */

'use strict';

define([
    'react',
    'jsx!component/PeiZiAndCapital/CapitalRecordComponent.react',
    'jsx!component/User/UserComponent.react',
    'model/CapitalRecordModel',
    'model/UserModel'
], function (React,CapitalRecordComponent,UserComponent,CapitalRecordModel,UserModel) {
    return React.createClass({
        componentDidMount: function () {
            this.props.model.on('change', function () {
                this.forceUpdate();
            }.bind(this));

        },
        componentWillUnmount: function() {
            this.props.model.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },

        getUser: function (uid) {
            var userModel = [];
            var userlist = (this.props.model.get('list').ulist).map(function (useritem) {
                if (useritem!=null && useritem.id == uid) {
                    userModel.id = useritem.id;
                    userModel.name = useritem.name;
                    userModel.mobile = useritem.mobile;
                }
            });
            return userModel;
        },

        getData :function(){
            var clistarray = this.props.model.get('list').clist;
            if(clistarray =='')
            {
                clistarray =[];
            }
            for(var i=0;i< clistarray.length ;i++){
                var uid = clistarray[i].uid;
                var user= this.getUser(uid);
                clistarray[i].user= user;
            }
            var complist = clistarray.map(function(citem){
                var userModel =new UserModel(citem.user.id,citem.user.name,citem.user.mobile);
                var crecordModel=new CapitalRecordModel(citem.type,citem.amount,citem.status,citem.account,citem.source,citem.date_time);

                return (
                    <CapitalRecordComponent user={userModel} model={crecordModel} peiziModel={this.props.peiziModel}></CapitalRecordComponent>);
            }.bind(this));
            return complist;
        },
        render: function () {
            var usertitle = '';
            if(this.props.peiziModel.get('uid')=='') {
                var usercomponent = new UserComponent();
                usertitle = usercomponent.renderTitle(this.props.peiziModel.get('title'));
            }
            var capitalrecordcomponent = new CapitalRecordComponent();
            var recordtitle = capitalrecordcomponent.renderTitle(this.props.peiziModel.get('uid'));
            var componentlist = this.getData();
            return (

                <div className="choose chooseCapital">
                    <div className='header row'><div>{usertitle}</div><div>{recordtitle}</div></div>
                    <div>{componentlist}</div>
                </div>

            );
        }
    });
});
