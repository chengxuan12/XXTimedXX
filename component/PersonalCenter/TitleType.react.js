/**
 * Created by Administrator on 2015/9/10.
 */
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
                    title:"charge",
                    href:"/#/personal/charge",
                    name:"在线充值"
                },
                {
                    title:"assetDetail",
                    href:"/#/personal/assetDetails",
                    name:"余额记录"
                }
            ]
        },
        render: function () {
            var header = this.PropTypes.header;
            return(
                <div className="col-xs-12">
                    <div className="clearfix perTabs">
                        {
                            header.map(function(h){
                                if(h.title == this.props.title){
                                    return (<a className="active" href={h.href}>{h.name}</a>)
                                }else {
                                    return (<a href={h.href}>{h.name}</a>)
                                }
                            }.bind(this))
                        }
                        <div className="perTabLine">&nbsp;</div>
                    </div>
                </div>
            );
        }
    });
});