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
            COLS:["peizi","capital"],
            COLS_MAPPING :{
                "peizi":"配资",
                "capital": "资金流水"
            }
        },

        render:function() {
            var COLS = this.PropTypes.COLS;
            var COLS_MAPPING = this.PropTypes.COLS_MAPPING;
            var title = this.props.peiziModel.get("title");
            return <div className="row search-head">
                {
                    COLS.map(function (col,index) {
                        var uid = this.props.peiziModel.get("uid");
                        var status=(col=='peizi')?'in_progress':0;
                        var link = globamParam.url_header+"/#"+col+'/0/0/'+status;
                        if(uid!=undefined && uid!='')
                        {
                            link = globamParam.url_header+"/#"+col+"/"+ uid+'/0/'+status;
                        }
                        if((title == col)){
                            return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1"><div className="search-header-a-choose"><a href={link} >{COLS_MAPPING[col]}</a></div>
                            </div>;
                        }
                        return <div className="col-xs-4 col-sm-3 col-md-2 search-col-lg-1"><a className="search-header-a" href={link} >{COLS_MAPPING[col]}</a>
                        </div>;
                    }.bind(this))
                }
            </div>
        }
    });

});
