/**
 * Created by Administrator on 2015/7/7.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        PropTypes:{
            COLS:["all","wait_review", "wait_approve","in_progress","ended","exploded","rejected","in_review_settlement","in_settlement"],
            CAPCOLS:["all","completed"],
            COLS_MAPPING :{
                "all":"全部",
                "wait_review":"待审核",
                "wait_approve":"待批准",
                "in_progress":"操盘中",
                "ended":"已结算",
                "exploded":"已爆仓",
                "rejected":"已拒绝",
                "in_review_settlement":"结算审批",
                "in_settlement":"结算中"
            },
            CAPCOLS_MAPPING:{
                "all":"全部",
                "completed":"完成"
            }
        },

        statusCheck:function(COLS,status){
            for(var i = 0;i< COLS.length;i++)
            {
                if(COLS[i]==status){
                    return true;
                }
            }
            return false;
        },
        getCOLS:function(){
            var COLS = this.PropTypes.COLS;
            var attributes = this.props.peiziModel;
            if(attributes.get("title")!='' && attributes.get("title")=='capital'){
                COLS = this.PropTypes.CAPCOLS;
            }
            return COLS;
        },
        getCOLS_MAPPING:function(){
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            var attributes = this.props.peiziModel;
            if(attributes.get("title")!='' && attributes.get("title")=='capital'){
                COLS_MAPPING = this.PropTypes.CAPCOLS_MAPPING;
            }
            return COLS_MAPPING;
        },

        getRecord:function(){
            var peiziModel=this.props.peiziModel;
            var auid,atype;
            auid=(peiziModel.get('uid')==null||peiziModel.get('uid')=='')?0:peiziModel.get('uid');
            atype=(peiziModel.get('type')==null||peiziModel.get('type')=='')?0:peiziModel.get('type');

            var record={
                "auid":auid,
                "atype":atype,
            }
            return record;
        },

        render:function() {
            var status = this.props.peiziModel.get("status");
            if(status == null)
            {
                status = '';
            }
            var COLS = this.getCOLS();
            var COLS_MAPPING = this.getCOLS_MAPPING();
            if(!this.statusCheck(COLS,status)){
                status = '';
            };
            var record=this.getRecord();
            var title=(this.props.peiziModel.get("title")=='peizi')?'peizi':'capital';

            return <div className="row search-head">
                {
                    COLS.map(function (col,index) {
                        var astatus=(col=='all')?0:col;

                        var link=globamParam.url_header+'/#'+title+'/'+record.auid+'/'+record.atype+'/'+astatus;
                        if((status == col)||(status =='' &&col=='all')){
                            return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1">
                                         <div className="search-header-a-choose">
                                             <a href={link}>{COLS_MAPPING[col]}</a></div>
                                  </div>;
                        }
                        return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1"><a className="search-header-a" href={link}>{COLS_MAPPING[col]}</a>
                        </div>;
                    }.bind(this))
                }
            </div>
        }
    });

});
