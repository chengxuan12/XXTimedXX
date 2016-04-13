/**
 * Created by Administrator on 2015/9/7.
 */
'use strict';
define([
    'react',
    'jquery',
], function (React,$) {
    return React.createClass({
        PropTypes:{
            header:[
                {
                    title:"protocol",
                    name:"产品协议"
                },
                {
                    title:"note",
                    name:"产品须知"
                }
            ]
        },
        render: function () {
            var header = this.PropTypes.header;
            return(
                     <div className="col-xs-12">
                            <div className="clearfix tabs">
                                {
                                    header.map(function(h){
                                        var href="/#/invest/product/"+this.props.id+"/"+h.title;
                                        if(h.title == this.props.title){
                                            return (<a className="active" href={href}>{h.name}</a>)
                                        }else {
                                            return (<a href={href}>{h.name}</a>)
                                        }
                                    }.bind(this))
                                }
                            <div className="other_line">&nbsp;</div>
                            </div>
                        </div>
            );
        }
    });
});