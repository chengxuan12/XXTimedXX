/**
 * Created by Administrator on 2015/7/9.
 */
'use strict';

define([
    'react',
    'jquery',
    'jsx!component/User/UserComponent.react',
    'jsx!component/Remark/RemarksComponent.react'
], function (React,$,UserComponent,RemarksComponent) {
    return React.createClass({
        PropTypes:{
            COLS:["name", "mobile","balance"],
            COLS_MAPPING :{
                "name": "姓名",
                "mobile": "手机号",
                "balance":"资金余额"
            }
        },
        componentDidMount: function() {
            this.props.user.on('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        componentWillUnmount: function() {
            this.props.user.off('change', function() {
                this.forceUpdate();
            }.bind(this));
        },
        getRemarks : function() {
          return <RemarksComponent user = {this.props.user} remarkModel = {this.props.remarkModel} operatorModel = {this.props.operatorModel}/>;
        },
        render: function() {

            var userComponent = new UserComponent();
            var user = userComponent.getUser(this.props.user);
            var remarks = this.getRemarks();
            if(this.props.user.get('id')!='') {
                return (
                    <div className = "row user-detail-top" >
                        <div className = "col-xs-12 col-sm-3">{user}</div>
                        <div className = "col-xs-12 col-sm-8">{remarks}</div>
                    </div>
                );
            }
            else{
                return(<div></div>);
            }
        }
    });

});
