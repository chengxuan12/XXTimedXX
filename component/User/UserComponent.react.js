/**
 * Created by Administrator on 2015/7/3.
 */
'use strict';

define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        PropTypes:{
            COLS:["name", "mobile"],
            COLS_MAPPING :{
                "name": "姓名",
                "mobile": "手机号"
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
        getUclass:function(maintitle){
            var title=(maintitle!=null)?maintitle:this.props.peiziModel.get('title');
            var uclass=(title=='capital')?'col-xs-4 col-sm-3 col-md-2 mouserPointer':'mcol-xs-4 mcol-sm-3 mcol-md-1 mouserPointer';
            return uclass;
        },

        renderTitle :function(maintitle) {
            var uclass=this.getUclass(maintitle);
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            return <div>
                {
                    COLS.map(function (col) {
                        return <div className={uclass}>{COLS_MAPPING[col]}
                        </div>;
                    })
                }
            </div>
        },
        getUser : function(user){
            if(user.get("mobile") !='')
            {
                return(
                    <div class='col-xs-12 col-sm-6'>
                        <div className = "user-margin">{this.PropTypes.COLS_MAPPING['name']}: {user.get('name')} </div>
                        <div className = "user-margin">{this.PropTypes.COLS_MAPPING['mobile']}: {user.get('mobile')} </div>
                    </div>);
            }
            else
            {
                return(
                    <div>
                    </div>);
            }

        },
        getRecord:function(){
            var peiziModel=this.props.peiziModel;
            var atype,astatus

            var uid=this.props.user.get('id');
            atype=(peiziModel.get('type')==null||peiziModel.get('type')=='')?0:peiziModel.get('type');
            astatus=(peiziModel.get('status')==null||peiziModel.get('status')=='')?0:peiziModel.get('status');

            var record={
                "uid":uid,
                "atype":atype,
                "astatus":astatus
            }
            return record;
        },
        render: function() {
            var uclass=this.getUclass();
            var mobileClass=uclass+" user-left"
            var title=(this.props.peiziModel.get("title")=='peizi')?'peizi':'capital';
            var record=this.getRecord();
            return (
                <div>
                    <a href={globamParam.url_header+'/#'+title+'/'+record.uid+'/'+record.atype+'/'+record.astatus}>
                    <div  className={uclass} >{this.props.user.get('name')}</div>
                    <div  className={mobileClass}>{this.props.user.get('mobile')}</div>
                    </a>
                </div>
            );
        },
    });

});
