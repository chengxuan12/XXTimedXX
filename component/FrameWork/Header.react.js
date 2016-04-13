/**
 * Created by Administrator on 2015/7/20.
 */
'use strict';

define([
    'react',
    'backbone',
    'jquery'
], function (React,Backbone,$) {
    return React.createClass({
        componentDidMount: function() {

        },

        render: function() {
            return (
                <nav className="navbar navbar-default top-navbar" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <div className="navbar-brand" >管理后台</div>
                    </div>
                </nav>
            );
        }
    });
});
