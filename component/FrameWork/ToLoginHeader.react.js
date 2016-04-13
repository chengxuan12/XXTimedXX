/**
 * Created by Administrator on 2015/7/27.
 */
'use strict';

define([
    'react',
    'jquery'
], function (React,$) {
    return React.createClass({
        render: function() {
            return (
                <div className="header-back">
                    <div className="container header">
                        <div className="row">
                            <div className="col-xs-12 col-md-4  fl logo">
                                <a href="/#/"><img className="small" src="assets/images/logo.jpg"/> </a>
                             </div>
                                <div className="fl nav1 xs-none">
                                    {this.props.title}
                                </div>
                                <span className="clear_f"></span>
                         </div>
                        </div>
                    </div>

            );
        }
    });
});

